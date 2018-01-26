
import './stafforders.html';

Template.stafforders.onCreated(function helloOnCreated() {
	
	this.selectedCount = new ReactiveVar(false);
	Template.instance().selectedCount.set(10);


});

	Template.stafforders.onRendered(function () {
		

	
	});


	Template.stafforders.helpers({

	getOrders()
	{
		return Orders.find({},{
			limit: Template.instance().selectedCount.get(),
			sort: {timestamp: -1}
			
			});
	}
});

Template.stafforders.events({
	
   
  'click #more'(event,instance){
	   event.preventDefault();
	   
	   var count = Template.instance().selectedCount.get() + 10;
	   
	   Template.instance().selectedCount.set(count);

  },
   'change .status'(event,instance){
	   event.preventDefault();
	   
	   var status =  $('.status').val();
	   var id =  $(event.target).attr('id');
	   
	   Meteor.call("updateStatus",id,status,function(err,res){
			if (err) {
				notifyErr(err);
		  }});

  },
  

 
});
	
