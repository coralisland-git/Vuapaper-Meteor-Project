
import './login-ar.html';

Template.loginar.onCreated(function helloOnCreated() {
	

});

	Template.loginar.onRendered(function () {
		
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

Template.loginar.events({
  
  'click .loginbtn': function (event) {
	   event.preventDefault();
	   
	   var email = $("#useremail").val();
	   var pass = $("#password").val();
	   
	   Meteor.loginWithPassword(email, pass ,function (error) {
            if (error){
               alert(error.reason);
             }
            else {
                FlowRouter.go( '/profilear' );
            }


        })
	   
    },
	'click #facebook-login': function(event) {
    Meteor.loginWithFacebook({ requestPermissions: ['email', 'public_profile', 'user_friends', 'user_likes']}, function(err){
        if (err) {
            throw new Meteor.Error("فشل في الاتصال");
        }
		
		/*
        console.log(Meteor.user().services.facebook.name);
        console.log(Meteor.user().services.facebook.id);
        console.log(Meteor.user().services.facebook.email);
        console.log(Meteor.user().services.facebook.gender);  */   

        FlowRouter.go( '/profilear' );		
    });
	},
	'click #google-login': function(event) {
    Meteor.loginWithGoogle({ requestPermissions: ['email']}, function(err){
        if (err) {
            throw new Meteor.Error("فشل في الاتصال");
        }
		

        FlowRouter.go( '/profilear' );		
		});
	},
	'click #twitter-login': function(event) {
    Meteor.loginWithTwitter({ requestPermissions: ['email']}, function(err){
        if (err) {
			notifyErr(err);
            throw new Meteor.Error("فشل في الاتصال");
        }
		

        FlowRouter.go( '/profilear' );		
		});
	},


 
});
	

