
import './paypal.html';

Template.paypal.onCreated(function helloOnCreated() {


});

	Template.paypal.onRendered(function () {
		

	
	});




	Template.paypal.helpers({

	
});

Template.paypalCreditCardForm.events({
	
 'submit #paypal-payment-form': function(evt, tmp){
      evt.preventDefault();

      var card_data = Template.paypalCreditCardForm.card_data();
      
      //Probably a good idea to disable the submit button here to prevent multiple submissions.
      
      Meteor.Paypal.purchase(card_data, {total: '100.50', currency: 'USD'}, function(err, results){
        if (err)
		{		
			console.error(err);
            notifyErr(err);
		}
        else 
		{
			console.log(results);
			if(results.error == null)
			{
				notify("Thank you for using Vuapaper");
				FlowRouter.go("/pending");
			}
			else
			{
				alert(results.error.response.name);
			}
		}
      });
    }
});
	
