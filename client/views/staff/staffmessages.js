
import './staffmessages.html';

Template.staffmessages.onCreated(function helloOnCreated() {
	
	Meteor.subscribe('users');
	this.selectedClients= new ReactiveVar(false);
	Template.instance().selectedClients.set("");

});

	Template.staffmessages.onRendered(function () {
		
		 // ------------------------------------------------------- //
		// Transition Placeholders
		// ------------------------------------------------------ //
		$('.input-material').on('focus', function () {
			$(this).siblings('label').addClass('active');
		});

		$('.input-material').on('blur', function () {
			$(this).siblings('label').removeClass('active');

			if ($(this).val() !== '') {
				$(this).siblings('label').addClass('active');
			} else {
				$(this).siblings('label').removeClass('active');
			}
		});
	
	});


	Template.staffmessages.helpers({

	getUser()
	{
		return Meteor.user().username;
	},
	getClients()
	{
		return Meteor.users.find({"profile.name" : {$regex : ".*" +Template.instance().selectedClients.get()+ ".*"}},{multi:true});
	},
});

Template.staffmessages.events({

	"input #searchbtn": function(evt) {
		
		var selval = $(evt.target).val();
		
		Template.instance().selectedClients.set(selval);
		
  
  },
  "click #send": function(evt) {
		
	   var title = $("#msgtitle").val();
	   var msg = $("#msgtext").val();
	   var client = $("#clients").val();
	   
	   if(title == "")
	   {
		   notifyErr("Please Write Message's Headtitle");
		   return;
	   }
	   
	   if(msg == "")
	   {
		   notifyErr("Please Write Message's Body");
		   return;
	   }
	   
	   if(client[0] == null)
	   {
		   notifyErr("Please Select Recipient");
		   return;
	   }
	   
	   Meteor.call("insertMessage",title,msg,client[0],function(err,res){
        if (!err) {		
			notify("Message Sent Successfully");
			
        } else {
            notifyErr(err);
        }});
		
		
  
  },
    "click #sendall": function(evt) {
		
		var title = $("#msgtitle").val();
	   var msg = $("#msgtext").val();
	   
	   Meteor.call("insertMessage",title,msg,"all",function(err,res){
        if (!err) {		
			notify("Message Sent Successfully");
			
        } else {
            notifyErr(err);
        }});
		
  
  },
	

 
});
	
