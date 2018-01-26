
import './pubchat.html';

Template.pubchat.onCreated(function helloOnCreated() {
	
	Meteor.subscribe('chats',10);

	this.selectedChatId = new ReactiveVar(false);

});

	Template.pubchat.onRendered(function () {
		
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


	Template.pubchat.helpers({

	selectedcId(){
		return Template.instance().selectedChatId.get();
	}
	,
	activeChats(){
		
			return Chats.find({ctype:0},{limit: 10 ,sort: {timestamp: -1}});
	}, 
	messages() {
			
			var cursor = PrivMessages.find({cid:Template.instance().selectedChatId.get()},{sort: {timestamp: 1}});
			
			var handle = cursor.observe({
			  added:function(fields){
				Tracker.afterFlush(function () {
				  if(fields.type == 0)
				  {
						$("#msg-cont").animate({ scrollTop: $('#msg-cont').prop("scrollHeight") }, 0);
				  }
				  });
			  }
			});

		
		return cursor;
  },
	
});

Template.pubchat.events({

	  'submit .chat-form'(event, instance) {
	  event.preventDefault();
	  
	  var mes = event.target.message.value;
	  
		Meteor.call("insertChatMessage",mes,Template.instance().selectedChatId.get(),0,0,function(err,res){
        if (!err) {
			Tracker.afterFlush(function () {
				$("#msg-cont").animate({ scrollTop: $('#msg-cont').prop("scrollHeight") }, "fast");
			});
        } else {
            alert(err);
        }});
		
	  event.target.message.value = '';
  },
  'click .active-chat-btn'(event,instance){
	   event.preventDefault();
	   
	   var chatid = event.target.id;
	   instance.selectedChatId.set(chatid);

  },
  'keyup #text-input': function(event) {
	  event.preventDefault();
	   if (event.which === 13) {
		   
	  var mes = $('#text-input').val();
	  
	  if(mes != "")
	  {
			Meteor.call("insertChatMessage",mes,Template.instance().selectedChatId.get(),0,0,function(err,res){
			if (!err) {
				Tracker.afterFlush(function () {
				$("#msg-cont").animate({ scrollTop: $('#msg-cont').prop("scrollHeight") }, "fast");
			});
			} else {
				alert(err);
		  }});
		  
	  }
		
		$('#text-input').val('');
	   }
  }
  ,

 
});
	
