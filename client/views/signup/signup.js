
import './signup.html';

	Template.signup.onCreated(function helloOnCreated() {
		

	});

	Template.signup.onRendered(function () {
		
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


	Template.signup.helpers({

	getUser()
	{
		return Meteor.user().username;
	}
});

Template.signup.events({
  
  'click .signupbtn': function (event) {
	   event.preventDefault();
	   
	   var name = $("#fullname").val();
	   var user = $("#username").val();
	   var email = $("#useremail").val();
	   var pass = $("#password").val();
	   var pass2 = $("#confirmPassword").val();
	   
	     Meteor.call('registerUser',name, user,email,pass, function(error,data) {
                if (error) {
                    alert(error.reason);
                } else {
                    FlowRouter.go( '/profile' );
                }
            });
	   
    }
	

 
});
	
