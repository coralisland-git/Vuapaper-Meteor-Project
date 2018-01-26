import './staff.html';
Template.staff.onCreated(function helloOnCreated() {
});
Template.staff.onRendered(function () {
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

Template.staff.helpers({
  getUser() {
    if (Meteor.user()) {
      return Meteor.user().username;
    }
    return false;
  }
});

Template.staff.events({
  'click .loginbtn': function (event) {
    event.preventDefault();
    var email = $('#useremail').val();
    var pass = $('#password').val();
    Meteor.loginWithPassword(email, pass ,function (error) {
      if (error){
        notifyErr(err);
      } else {
        notify('Welcome to your Vuapaper account');
        FlowRouter.go('/staffmessages');
      }
    });
  },
});
