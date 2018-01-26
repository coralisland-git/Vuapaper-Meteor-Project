import './login.html';
Template.login.onCreated(function helloOnCreated() {
});
Template.login.onRendered(function () {
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
Template.login.helpers({
  getUser() {
    return Meteor.user().username;
  }
});
Template.login.events({
  'click .loginbtn': function (event) {
    event.preventDefault();
    var email = $('#useremail').val();
    var pass = $('#password').val();
    Meteor.loginWithPassword(email, pass ,function (error) {
      if (error){
        notifyErr(err);
      } else {
        notify('Welcome to your Vuapaper account');
        FlowRouter.go( '/profile' );
      }
    });
  },
  'click #facebook-login': function(event) {
    Meteor.loginWithFacebook({ requestPermissions: ['email', 'public_profile', 'user_friends', 'user_likes']}, function(err){
      if (err) {
        notifyErr(error.reason);
        throw new Meteor.Error('Facebook login failed');
      }
      /*
        console.log(Meteor.user().services.facebook.name);
        console.log(Meteor.user().services.facebook.id);
        console.log(Meteor.user().services.facebook.email);
        console.log(Meteor.user().services.facebook.gender);  */
      FlowRouter.go( '/profile' );
    });
  },
  'click #google-login': function(event) {
    Meteor.loginWithGoogle({ requestPermissions: ['email']}, function(err){
      if (err) {
        notifyErr(err);
        throw new Meteor.Error('Google login failed');
      }
      FlowRouter.go( '/profile' );
    });
  },
  'click #twitter-login': function(event) {
    Meteor.loginWithTwitter({ requestPermissions: ['email']}, function(err){
      if (err) {
        notifyErr(err);
        throw new Meteor.Error('Twitter login failed');
      }
      FlowRouter.go( '/profile' );
    });
  },
});
