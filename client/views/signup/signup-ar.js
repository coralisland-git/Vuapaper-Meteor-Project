
import './signup-ar.html';

Template.signupar.onCreated(function helloOnCreated() {
	

});

	Template.signupar.onRendered(function () {
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

Template.signupar.events({
  
  'click .loginbtn': function (event) {
	   event.preventDefault();
	   
	   var email = $("#usermail").val();
	   var pass = $("#password").val();
	   
	   Meteor.loginWithPassword(email, pass ,function (error) {
            if (error){
               alert(error.reason);
             }
            else {
                FlowRouter.go( '/profilear' );
            }


        })
	   
    }
	

 
});
	

