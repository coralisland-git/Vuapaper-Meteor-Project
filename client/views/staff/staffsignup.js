
import './staffsignup.html';

	Template.staffsignup.onCreated(function helloOnCreated() {
		

	});

	Template.staffsignup.onRendered(function () {
		
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


	Template.staffsignup.helpers({

	getUser()
	{
		return Meteor.user().username;
	}
});

Template.staffsignup.events({
  
  'click .signupbtn': function (event) {
	   event.preventDefault();
	   
	   var name = $("#fullname").val();
	   var user = $("#username").val();
	   var email = $("#useremail").val();
	   var pass = $("#password").val();
	   var pass2 = $("#confirmPassword").val();
	   
	     Meteor.call('registerStaff',name, user,email,pass, function(error,data) {
                if (error) {
                    alert(error.reason);
                } else {
                    FlowRouter.go( '/staffmessages' );
                }
            });
	   
    }
	

 
});
	
