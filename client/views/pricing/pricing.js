
import './pricing-guide.html';

Template.pricing.onCreated(function helloOnCreated() {
	
	Meteor.subscribe('users');
	this.selectedClients= new ReactiveVar(false);
	Template.instance().selectedClients.set("");

});

	Template.pricing.onRendered(function () {
		
	
        $('html, body').animate({ scrollTop: 0}, 1000);
	
	});


	Template.pricing.helpers({

	getDiplomas()
	{
		return Items.find({"academic" :"0"},{multi:true});
	},
	getPhDs()
	{
		return Items.find({"academic" :"3"},{multi:true});
	}
	,
	getMasters()
	{
		return Items.find({"academic" :"2"},{multi:true});
	}
	,
	getBachelors()
	{
		return Items.find({"academic" :"1"},{multi:true});
		
	},
});

Template.pricing.events({
	
   

 
});
	
