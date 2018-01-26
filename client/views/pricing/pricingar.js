
import './pricing-ar.html';

Template.pricingar.onCreated(function helloOnCreated() {
	
	Meteor.subscribe('users');
	this.selectedClients= new ReactiveVar(false);
	Template.instance().selectedClients.set("");

});

	Template.pricingar.onRendered(function () {
		
	
        $('html, body').animate({ scrollTop: 0}, 1000);
	
	});


	Template.pricingar.helpers({

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

Template.pricingar.events({
	
   

 
});
	
