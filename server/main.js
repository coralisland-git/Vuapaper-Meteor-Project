import { Meteor } from 'meteor/meteor';
import { AccountsCommon } from 'meteor/accounts-base';
import { Email } from 'meteor/email';
import { FilesCollection } from 'meteor/ostrio:files';
import { readFile } from 'fs';
var q;
Meteor.startup(() => {
  /* Email.configSES({
    AWSAccessKeyID: 'AKIAIXNHSWRI5TF6JY4A',
    AWSSecretKey: 'AhNu5DJVlUztArn89YgcaAKy+WqLjSUEolfxHf+wx1rd'
  });*/
  Accounts.emailTemplates.from = 'Vuapaper <donotreply@vuapaper.com>';
  // SMTP Username: AKIAIXNHSWRI5TF6JY4A
  // SMTP Password: AhNu5DJVlUztArn89YgcaAKy+WqLjSUEolfxHf+wx1rd
  process.env.MAIL_URL = 'smtps://AKIAIXNHSWRI5TF6JY4A:AhNu5DJVlUztArn89YgcaAKy+WqLjSUEolfxHf+wx1rd@email-smtp.eu-west-1.amazonaws.com:465';
  // code to run on server at startup
  /*SSLProxy({
       port: 6000, //or 443 (normal port/requires sudo)
       ssl : {
            key: Assets.getText("key.pem"),
            cert: Assets.getText("cert.pem"),
  //Optional CA
  //Assets.getText("ca.pem")
       }
    });*/
  //process.env.MAIL_URL="smtps://mariamzakimohamed%40gmail.com:mariam123@smtp.gmail.com:465/";
  Messages = new Mongo.Collection('messages');
  PrivMessages = new Mongo.Collection('privmessages');
  Items = new Mongo.Collection('items');
  Orders = new Mongo.Collection('orders');
  Chats = new Mongo.Collection('chats');
  //  Meteor.absoluteUrl.defaultOptions.rootUrl = 'https://vuapaper.com';
  // first, remove configuration entry in case service is already configured
  ServiceConfiguration.configurations.remove({
    service: 'facebook'
  });
  ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '406473956451527',
    loginStyle: 'popup',
    secret: '6d07f1b3c8e223ee1ccb277eaf1a0652'
  });
  Accounts.loginServiceConfiguration.remove({
    service: 'google'
  });
  Accounts.loginServiceConfiguration.insert({
    service: 'google',
    loginStyle: 'popup',
    clientId: '903557168332-8fijk2pkemljq8rlms25olc1sq7mvq1p.apps.googleusercontent.com',
    secret: 'UvEnI53yGCaFoV8ARKssld0O'
  });
  ServiceConfiguration.configurations.remove({
    service: 'twitter'
  });
  ServiceConfiguration.configurations.insert({
    service: 'twitter',
    loginStyle: 'popup',
    consumerKey: 'm8yBZJ35kcvkANJyrmIWciWDD',
    secret: '0z0tTH1SzcFcjBzwcjorc478oZ3nx1dMvtsKRBkdR1NT0KcMz7'
  });
});
Meteor.methods({
  insertMessage: function(title,mes,cid) {
    if (!this.userId) {
      throw new Meteor.Error('logged out','the user must be logged in');
    }
    form = {
      text: mes,
      title:title,
      timestamp: Date.now(),
      uid: this.userId,
      cid: cid,
      seen:false
    };
    return Messages.insert(form);
  },
  updateCurrency: function(curr) {
    console.log(curr.rates.KWD);
    Items.find({}).forEach(function(item){ Items.update({_id:item._id},{$set: {'priceKWD':Math.round( 100* item.price * curr.rates.KWD)/100,'priceOMR':Math.round( 100* item.price * curr.rates.OMR)/100,'priceSAR':Math.round( 100* item.price * curr.rates.SAR)/100,'priceQAR':Math.round( 100* item.price * curr.rates.QAR)/100,'priceAED':Math.round( 100* item.price * curr.rates.AED)/100,'priceBHD':Math.round( 100* item.price * curr.rates.BHD)/100}}, {multi: true});});
  },
  insertItem: function(academic,deadline,deadlineunit,price,type) {
    if(!this.userId) {
      throw new Meteor.Error('logged out','the user must be logged in');
    }
    form = {
      academic: academic,
      deadline:deadline,
      deadlineunit: deadlineunit,
      uid: this.userId,
      price: price,
      type:type
    };
    console.log('Inserting Item');
    Meteor.call('sendEmail',
      'me@diaa.me',
      'Test Sending An Email',
      'under-review',
      {}
    );
    return Items.insert(form);
  },
  removeItem: function(id) {
    if(!this.userId) {
      throw new Meteor.Error('logged out','the user must be logged in');
    }
    Items.remove({_id:id});
  },
  insertOrder: function(academic,type,subject,topic,instructions,source,format,pages,spaced,deadline,writercategory,slides,vip,best,price,payment) {
    if(!this.userId) {
      throw new Meteor.Error('logged out','the user must be logged in');
    }
    form = {
      academic: academic,
      type:type,
      subject:subject,
      topic:topic,
      instructions:instructions,
      source:source,
      format:format,
      spaced:spaced,
      pages:pages,
      deadline:deadline,
      category:writercategory,
      slides:slides,
      vip:vip,
      best:best,
      cid: this.userId,
      price: price,
      status:'pending',
      cdate:new Date(),
      timestamp: Date.now(),
      payment:payment
    };
    return Orders.insert(form);
  },
  clearNotify: function(cid) {
    Messages.update({cid:cid,seen:false}, {$set: {seen:true}}, {multi: true});
  },
  updateStatus: function(id,status){
    Orders.update({_id:id}, {$set: {status:status}});
  },
  //type=0 for agent and 1 for client
  insertChatMessage: function(mes,cid,type,ctype) {
    /*if(!this.userId)
    {
      throw new Meteor.Error("logged out","the user must be logged in");
    }*/
    if(Chats.find({cid:cid}).count() == 0) {
      Chats.insert({cid:cid,timestamp:Date.now(),ctype:ctype,notify:1,createdAt:Date.now()});//ctype=0 for pub and 1 for priv
    } else {
      Chats.update({cid:cid}, {$set: {notify:1,timestamp:Date.now()}});
    }
    if (type == 0) {
      Chats.update({cid:cid}, {$set: {notify:0}});
    }
    form = {
      text: mes,
      type:type,
      timestamp: Date.now(),
      cid: cid,
      seen:false
    };
    return PrivMessages.insert(form);
  },
  registerUser: function(name, username, email, pass) {
    try {
      user = Accounts.createUser({
        username: username,
        email: email,
        password: pass,
        profile: {
          name: name,
          email: email,
          type:0,//client
          createdOn: new Date()
        }
      });
      return {
        'userId': user
      };
    } catch (e) {
      throw e;
    }
  },
  registerStaff: function(name, username, email, pass) {
    try {
      user = Accounts.createUser({
        username: username,
        email: email,
        password: pass,
        profile: {
          name: name,
          email: email,
          type:1,//staff
          createdOn: new Date()
        }
      });
      return {
        'userId': user
      };
    } catch (e) {
      throw e;
    }
  },
  changePass: function(opass, npass) {
    try {
      Accounts.changePassword(opass,npass);
    } catch (e) {
      throw e;
    }
  },
  updateProfile: function(name,job,email,phone,birthday,country,address) {
    if(!this.userId) {
      throw new Meteor.Error('logged out','the user must be logged in');
    }
    var pdata = {'name':name,'job':job,'email':email,'phone':phone,'birthday':birthday,'country':country,'address':address};
    Meteor.users.update({_id:this.userId}, {$set: {profile:pdata}});
  },
  sendEmail: function(to, subject, template, data) {
    console.log('SENDING EMAIL');
    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();
    let from = 'donotreply@vuapaper.com';
    subject = 'Vuapaper: ' + subject;
    readFile('./emails/' + template + '.html', (err, data)=> {
      let html = data;
      // AWS SES
      console.log(html);
      // TODO: update the HTML with data
      Email.send({ to, from, subject, html });
    });
  },
  sendContactUsEmail: function(name, email, subject, message) {
    let template = Assets.getText('additional-attachments.html');
    console.log(template);
    SSR.compileTemplate('htmlEmail', template);
    // AWS SES
    Email.send({
      //to: 'vuapaper@gmail.com',
      to: 'me@diaa.me',
      from: 'donotreply@vuapaper.com',
      subject: 'Vuapaper Contact US Email',
      html: SSR.render('htmlEmail', {}),
    });
  }
  /*
  ,
  testClient: function()
  {
    return Chats.find();
  }
  ,
  insertRequest: function(itemId,startdate,enddate,lenderid,lendername,itemname)
  {
    if(!this.userId)
    {
      throw new Meteor.Error("logged out","the user must be logged in");
    }
    form = {
      itemId: itemId,
      timestamp: Date.now(),
      startdate:startdate,
      enddate:enddate,
      uid:this.userId,
      lenderid:lenderid,
      lendername:lendername,
      itemname:itemname,
      status:"pending"};
    return Requests.insert(form);
  }
  ,
  updateClientCid: function(domain,cid)
  {
    if(!this.userId)
    {
      throw new Meteor.Error("logged out","the user must be logged in");
    }
    Clients.update({domain:domain}, {$set: {"cid": cid}});
  }
  */
}
);
/*
Accounts.onCreateUser(function(options, user) {
// Use provided profile in options, or create an empty object
   user.profile = options.profile || {};
// Assigns first and last names to the newly created user object
   user.profile.role = -1;
// Returns the user object
   return user;
});
UserStatus.events.on("connectionLogin", function(fields) {
    var user = Meteor.users.findOne(fields.userId);
    if(user.profile.role == 0)
    {
      if(!q.contains(fields.userId))
      {
        updateStatus(user,1);
        q.enqueue(fields.userId);
        console.log("user Logged in" + fields.userId  + " - " + fields.loginTime);
        console.log(q.display());
      }
    }
 });
 UserStatus.events.on("connectionLogout", function(fields) {
    var user = Meteor.users.findOne(fields.userId);
    if(user.profile.role == 0)
    {
      if(q.contains(fields.userId))
      {
        q.remove(fields.userId);
        console.log("user Logged out" + fields.userId);
        updateStatus(user,-1);
        console.log(q.display());
        var userChats = Chats.find({aid:fields.userId});
        userChats.forEach( function (ch)
        {
          console.log(ch._id);
          Chats.update({_id:ch._id},{$set:{agent: "", aid : ""}}); //don't forget to update all
          ch.agent = "";
          ch.aid = "";
          distributeChat(ch,ch.cid,ch.cfp,1);
        });
      }
    }
 });
 */
