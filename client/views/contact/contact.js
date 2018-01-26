import './contact.html';
import { $, jQuery } from 'meteor/jquery';

Template.contact.onCreated(function helloOnCreated() {
  $('html, body').animate({ scrollTop: 0}, 1000);
});

function onSubmitForm(event) {
  event.preventDefault();
  let name = $(event.target).find('#name').val();
  let email = $(event.target).find('#email').val();
  let subject = $(event.target).find('#subject').val();
  let message = $(event.target).find('#message').val();
  function callback(err, res) {
    if (err) {
      console.error(err);
      return notifyErr(err);
    }
    
    notify('Email sent successfully, We will contact you as soon as possible');
    //FlowRouter.go('/paypal');
  }
  Meteor.call('sendContactUsEmail',
    name,
    email,
    subject,
    message,
    callback);
}
Template.contact.events({
  'submit #contact-form': onSubmitForm
});
