
Meteor.publish('messages', function (limit) {
  if (this.userId) {
    return Messages.find({},{
      limit: limit|| 5 ,
      sort: {timestamp: -1}
    });
  }
});

Meteor.publish('chats', function (limit) {
  if (this.userId) {
    return Chats.find({},{
      limit: limit|| 5 ,
      sort: {timestamp: -1}
    });
  }
});

Meteor.publish('privmessages', function (limit) {
  return PrivMessages.find({},{
    limit: limit|| 5 ,
    sort: {timestamp: -1}
  });
});

Meteor.publish('items', function () {
  return Items.find({});
});

Meteor.publish('orders', function () {
  return Orders.find({});
});

Meteor.publish('users', function () {
  return;
  Meteor.users.find({}
  );
});

Meteor.publish('myUser', function (uid) {
  return Meteor.users.find({_id:uid});
});

Meteor.publish('requests', function (limit,uid) {
  return Requests.find({uid:uid},{
    limit:  limit|| 10
  });
});
const Images = new FilesCollection({
  storagePath: process.env.FILES_LOC || '/home/vuapaper/public_html/files/',
  collectionName: 'Images',
  allowClientCode: false, // Disallow remove files from Client
  onBeforeUpload(file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 10485760) {
      return true;
    } else {
      return 'Please upload image, with size equal or less than 10MB';
    }
  }
});
export default Images; // To be imported in other files

Meteor.publish('files.images.all', function () {
  return Images.find().cursor;
});
