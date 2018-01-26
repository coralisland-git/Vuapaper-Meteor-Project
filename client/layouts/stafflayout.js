import './stafflayout.html';
import { Session } from 'meteor/session'
Template.stafflayout.onCreated(function() {
    import '/imports/stylesheets/css/animate.css';
    import '/imports/stylesheets/css/animsition.min.css';
    import '/imports/stylesheets/css/bootstrap.css';
    import '/imports/stylesheets/css/bootstrap-select.min.css';
    import '/imports/stylesheets/css/dashboard.css';
    import '/imports/stylesheets/css/datepicker.css';
    import '/imports/stylesheets/css/intlTelInput.css';
    import '/imports/stylesheets/css/owl.carousel.min.css';
    import '/imports/stylesheets/css/YouTubePopUp.css';
    import '/imports/stylesheets/css/style.css';
    import { $ } from 'meteor/jquery';
    import '/imports/js/bootstrap.min.js';
    import '/imports/js/owl.carousel.min.js';
    import '/imports/js/easyscroll.min.js';
    import '/imports/js/wow.min.js';
    import '/imports/js/animsition.min.js';
    import '/imports/js/bootstrap-select.min.js';
    import '/imports/js/intlTelInput.min.js';
    import '/imports/js/jquery.validate.min.js';
    import '/imports/js/YouTubePopUp.jquery.js';
    import '/imports/js/datepicker.js';
    let isSubscribed = Session.get('isSubscribed') || false;
    if (!isSubscribed) {
        Meteor.subscribe('myUser', Meteor.userId());
        Meteor.subscribe('messages',20);
        Meteor.subscribe('privmessages',20);
        Meteor.subscribe('items');
        Meteor.subscribe('orders');
        Meteor.subscribe('chats',20);
        Messages = new Mongo.Collection('messages');
        PrivMessages = new Mongo.Collection('privmessages');
        Items = new Mongo.Collection('items');
        Orders = new Mongo.Collection('orders');
        Chats = new Mongo.Collection('chats');
        var phototmp;
        Meteor.subscribe('files.images.all');
        const Images = new FilesCollection({
            storagePath: process && process.env && process.env.FILES_LOC || '/home/vuapaper/public_html/files/',
            collectionName: 'Images',
            allowClientCode: false, // Disallow remove files from Client
            onBeforeUpload(file) {
                // Allow upload files under 10MB, and only in png/jpg/jpeg formats
                if (file.size <= 10485760) {
                    return true;
                } else {
                    return 'Please upload image, with size equal or less than 10MB';
                }
            }
        });
        Session.set('isSubscribed', true);
    }
});
Template.stafflayout.onRendered(function () {
});
Template.stafflayout.helpers({
    getUserPhoto() {
        if (Meteor.user() != null) {
            if(Meteor.user().profile.picture != null) {
                return Meteor.user().profile.picture;
            }
        }
        return "img/avatar-1.png";
    }
    ,getUser() {
        var user = Meteor.users.find({_id:Meteor.userId(),"profile.type":1}).count();
        return user > 0;
    }
});
Template.stafflayout.events({
    'click #logout': function (event) {
        event.preventDefault();
        Meteor.logout();
        FlowRouter.go("/");
        notify("See You Soon!!");
    }
});
