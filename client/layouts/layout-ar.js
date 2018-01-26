import './layout-ar.html';
import { Session } from 'meteor/session'
//var curr;
/*$.getJSON('http://www.apilayer.net/api/live?access_key=2fa4a150be8074547a20036a40295388', function(data) {
    curr = data;
    alert(curr.quotes.USDKWD);
    Meteor.call("updateCurrency",curr);
});*/
Template.layoutar.onCreated(function helloOnCreated() {
    import '/imports/stylesheets/css-ar/animate.css';
    import '/imports/stylesheets/css-ar/animsition.min.css';
    import '/imports/stylesheets/css-ar/bootstrap.css';
    import '/imports/stylesheets/css-ar/bootstrap-select.min.css';
    import '/imports/stylesheets/css-ar/dashboard.css';
    import '/imports/stylesheets/css-ar/datepicker.css';
    import '/imports/stylesheets/css-ar/intlTelInput.css';
    import '/imports/stylesheets/css-ar/owl.carousel.min.css';
    import '/imports/stylesheets/css-ar/YouTubePopUp.css';
    import '/imports/stylesheets/css-ar/style.css';
    import '/imports/stylesheets/css-ar/arabic.css';
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
    import '/imports/js/jquery-counter.min.js';
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

  phototmp = '';
  try {
    if (localStorage.getItem('cfp') == null)
      localStorage.setItem('cfp',fingerprint());
  }
  catch(err) {
  }
});
Template.layoutar.onRendered(function () {
  setTimeout(function(){
    addChatBox();
    if (Meteor.userId()) {
      var cursor = PrivMessages.find({cid:Meteor.userId()},{sort: {timestamp: -1}});
    } else {
      var cursor = PrivMessages.find({cid:localStorage.getItem('cfp')},{sort: {timestamp: -1}});
    }
    var handle = cursor.observe({
						  added:function(fields){
							  var alignment = fields.type == 0 ? '<div class="rvrtx-talk-bubble rvrtx-tri-left rvrtx-chat-round rvrtx-bubble-right rvrtx-btm-right-in">' :
																			 '<div class="rvrtx-talk-bubble rvrtx-tri-right  rvrtx-chat-round rvrtx-btm-left-in">';
        var color = fields.type == 0 ? 'black' : 'white';
        var aname = fields.type == 0 ? '<p class="rvrtx-name" style="color:red;float:right;">زينب</p>' : '';
        document.getElementById('rvrtx-msg-container').insertAdjacentHTML('beforeend', '<br/>'+
																						   alignment        +
																					aname +
																					'<div class="rvrtx-talktext">'+
																					'<p style="color:'+color +';word-wrap: break-word; ">'+ fields.text+'</p>'+
																					'</div></div>');
        Tracker.afterFlush(function () {
          $('.rvrtx-msg_container_base').animate({ scrollTop: $('.rvrtx-msg_container_base').prop('scrollHeight') }, 0);
							  });
						  }
    });
  }, 5000);
  $(document).on('click', '.rvrtx-click', function (e) {
    if ( screen.width <= 480 ) {
      $('#rvrtx-msg-container').toggle(0);
      $('#rvrtx-chat-input-group').toggle(0);
      $('#rvrtx-chat-close').val('--');
      $('#rvrtx-icon').show();
      $('#rvrtx-headline').toggle(0);
      $('#rvrtx-topbar').toggle(0);
      $('#rvrtx-chatbox').toggle(0);
      $('#rvrtx-welcome').hide();
      $('#rvrtx-btmbar').toggle();
      if (boxstatus == 0) {
        boxstatus = 1;
        $('#rvrtx-chat-input-group').css('margin','0px 0px 0px 0px');
        $('#rvrtx-btn-email').css('margin','0px 0px 0px 0px');
        $('body').addClass('disable-scroll');$('html').addClass('disable-scroll');
      } else {
        boxstatus = 0;
        $('#rvrtx-chat-input-group').css('margin','0px 0px 20px 0px');
        $('#rvrtx-btn-email').css('margin','0px 0px 20px 0px');
        $('body').removeClass('disable-scroll');$('html').removeClass('disable-scroll');
      }
    } else {
      $('#rvrtx-msg-container').fadeToggle(200);
      $('#rvrtx-chat-input-group').fadeToggle(200);
      $('#rvrtx-chat-close').val('--');
      //$("#rvrtx-icon").toggle();
      $('#rvrtx-headline').fadeToggle(200);
      $('#rvrtx-topbar').fadeToggle(200);
      if (boxstatus == 0) {
        boxstatus = 1;
        $('#rvrtx-icon').css('opacity', '1');
      } else {
        boxstatus = 0;
        $('#rvrtx-icon').css('opacity', '0.5');
      }
    }
    $('.rvrtx-msg_container_base').animate({ scrollTop: $('.rvrtx-msg_container_base').prop('scrollHeight') }, 0);
  });
  // ------------------------------------------------------- //
  // Bootstrap Select
  // ------------------------------------------------------- //
  $('.bs-select').selectpicker();
  // ------------------------------------------------------- //
  // Adding fade effect to dropdowns
  // ------------------------------------------------------ //
  $('.dropdown').on('show.bs.dropdown', function () {
    $(this).find('.dropdown-menu').first().stop(true, true).fadeIn(150).addClass('active');
  });
  $('.dropdown').on('hide.bs.dropdown', function () {
    $(this).find('.dropdown-menu').first().stop(true, true).fadeOut(150).removeClass('active');
  });
  // ------------------------------------------------------- //
  // Add Text Background from HTML [data-text] attribute
  // ------------------------------------------------------- //
  $('.has-background-text').each(function () {
    $('<span class="text-bg"></span>').prependTo(this);
    var textBackground = $(this).attr('data-text');
    $(this).find('.text-bg').text(textBackground);
  });
  $('.has-background-text-gray').each(function () {
    $('<span class="text-bg-gray"></span>').prependTo(this);
    var textBackground = $(this).attr('data-text');
    $(this).find('.text-bg-gray').text(textBackground);
  });
  $('.with-bg-text').each(function () {
    $('<span class="heading-bg-text"></span>').prependTo(this);
    var textBackground = $(this).attr('data-text');
    $(this).find('.heading-bg-text').text(textBackground);
  });
  // ------------------------------------------------------- //
  // Phone Country Picker
  // ------------------------------------------------------- //
  $('#phone').intlTelInput();
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
  // ------------------------------------------------------- //
  // Testimonials Slider
  // ------------------------------------------------------ //
  $('.testimonials-slider').owlCarousel({
    loop: true,
    margin: 20,
    dots: false,
    nav: true,
    smartSpeed: 700,
    navText: [
      '<i class=\'fa fa-long-arrow-left\'></i>',
      '<i class=\'fa fa-long-arrow-right\'></i>'
    ],
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: false,
        dots: true
      },
      600: {
        items: 1,
        nav: true
      },
      1000: {
        items: 1,
        nav: true,
        loop: false
      }
    }
  });
  // ------------------------------------------------------- //
  // Team Slider
  // ------------------------------------------------------ //
  $('.team-slider').owlCarousel({
    loop: true,
    margin: 20,
    dots: true,
    nav: false,
    smartSpeed: 400,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: false
      },
      600: {
        items: 2,
        nav: false
      },
      1000: {
        items: 3,
        nav: true,
        loop: false
      }
    }
  });
  // ------------------------------------------------------- //
  // Navbar Toggler Button
  // ------------------------------------------------------- //
  $('.navbar .navbar-toggler').on('click', function () {
    $(this).toggleClass('active');
  });
  // ------------------------------------------------------- //
  // Scroll Top Button
  // ------------------------------------------------------- //
  $('#scrollTop').on('click', function () {
    $('html, body').animate({ scrollTop: 0}, 1000);
  });
  var c, currentScrollTop = 0,
    navbar = $('.navbar');
  $(window).on('scroll', function () {
    // Navbar functionality
    var a = $(window).scrollTop(), b = navbar.height();
    currentScrollTop = a;
    if (c < currentScrollTop && a > b + b) {
      navbar.addClass('scrollUp');
    } else if (c > currentScrollTop && !(a <= b)) {
      navbar.removeClass('scrollUp');
    }
    c = currentScrollTop;
    if ($(window).scrollTop() >= 2000) {
      $('#scrollTop').addClass('active');
    } else {
      $('#scrollTop').removeClass('active');
    }
  });
});
Template.layoutar.helpers({
  getUserPhoto()
  {
    if (Meteor.user() != null)
    {
      if (Meteor.user().profile.picture != null)
        return Meteor.user().profile.picture;
    }
    return 'img/avatar-1.png';
  }
});
Template.layoutar.events({
  'click #logout': function (event) {
	   event.preventDefault();
	   Meteor.logout();
	   FlowRouter.go('/ar');
  }
});
Template.uploadForm.onCreated(function () {
    this.currentUpload = new ReactiveVar(false);
});
Template.uploadForm.helpers({
    currentUpload() {
        return Template.instance().currentUpload.get();
    }
});
Template.uploadForm.events({
    'change #fileInput'(e, template) {
        if (e.currentTarget.files && e.currentTarget.files[0]) {
            // We upload only one file, in case
            // multiple files were selected
            const upload = Images.insert({
                file: e.currentTarget.files[0],
                streams: 'dynamic',
                chunkSize: 'dynamic'
            }, false);
            upload.on('start', function () {
                template.currentUpload.set(this);
            });
            upload.on('end', function (error, fileObj) {
                if (error) {
                    alert('Error during upload: ' + error);
                } else {
                    phototmp = upload.config.fileId + upload.file.extensionWithDot;
                    if (Meteor.userId())
                    {
                        if ( phototmp.indexOf('.jpg') >= 0 || phototmp.indexOf('.png') >= 0 || phototmp.indexOf('.bmp') >= 0){
                            Meteor.call('insertChatMessage','<a target=\'_blank\' href=\'http://files.vuapaper.com/' + phototmp+'\' ><img src=\'http://files.vuapaper.com/' + phototmp+'\'/ style=\'width:10vw;height:10vh;\'/></a>',Meteor.userId(),1,1);
                        }
                        else
                        {
                            Meteor.call('insertChatMessage','<a target=\'_blank\' href=\'http://files.vuapaper.com/' + phototmp+'\' >'+upload.file.name+'</a>',Meteor.userId(),1,1);
                        }
                    }
                    else
                    {
                        if ( phototmp.indexOf('.jpg') >= 0 || phototmp.indexOf('.png') >= 0 || phototmp.indexOf('.bmp') >= 0){
                            Meteor.call('insertChatMessage','<a target=\'_blank\' href=\'http://files.vuapaper.com/' + phototmp+'\' ><img src=\'http://files.vuapaper.com/' + phototmp+'\'/ style=\'width:10vw;height:10vh;\'/></a>',localStorage.getItem('cfp'),1,0);
                        }
                        else
                        {
                            Meteor.call('insertChatMessage','<a target=\'_blank\' href=\'http://files.vuapaper.com/\'' + phototmp+' >'+upload.file.name+'</a>',localStorage.getItem('cfp'),1,0);
                        }
                    }
                }
                template.currentUpload.set(false);
            });
            upload.start();
        }
    }
});
Template.emojiForm.helpers({
    getEmojis(){
        return [':kissing_closed_eyes:',':smile:',':laughing:',':blush:',':smiley:',':relaxed:',':smirk:',':heart_eyes:',':kissing_heart:',':kissing_closed_eyes:',':flushed:',':relieved:',':satisfied:',':grin:',':wink:',':eyes:',':stuck_out_tongue_winking_eye:',':stuck_out_tongue_closed_eyes:',':grinning:',':kissing:',':anguished:',':open_mouth:',':grimacing:',':confused:',':hushed:',':expressionless:',':unamused:',':sweat_smile:',':sweat:',':disappointed_relieved:',':cold_sweat:',':persevere:',':cry:',':sob:',':joy:',':astonished:',':scream:',':rage:',':triumph:',':sleepy:',':sunglasses:',':innocent:',':heart:',':broken_heart:',':alien:',':neutral_face:',':thumbsup:',':-1:',':ok_hand:',':straight_ruler:',':triangular_ruler:',':white_check_mark:',':zzz:',':handbag:','',':pencil2:',':briefcase:',':date:',':book:',':books:',':rose:',':cherry_blossom:',':hibiscus:',':telephone_receiver:',':computer:'];
    }
});
Template.emojiForm.events({
    'click .emojis'(event,instance){
        event.preventDefault();
        var em = $(event.target).attr('title');
        $('#rvrtx-chat-input').val($('#rvrtx-chat-input').val() + em);
        $('.emojidiv').toggle('500');
        $('#rvrtx-chat-input').focus();
    },
    'click .emojicontroler'(event,instance){
        event.preventDefault();
        $('.emojidiv').toggle('500');
        $('#rvrtx-chat-input').focus();
    },
});
var boxstatus = 0;
function addChatBox(startLine,headLine) {
  boxstatus = 0;
  headLine = headLine == null ? 'خدمة العملاء' : headLine;
  startLine = startLine == null ? 'مرحبا! معك زينب، سوف نكون سعيدين بمساعدتك في حل مشكلتك وتقديم الحلول المناسبة لك  ' : startLine;
  var element = document.getElementById('rvrtx-chatbox');
  if (element != null) {
    element.outerHTML = '';
    //delete element;
  }
  var celement = document.getElementById('rvrtx-chatcontrols');
  if (celement != null) {
    celement.outerHTML = '';
    //delete celement;
  }
  var idiv = document.createElement('div');
  idiv.id = 'rvrtx-chatbox';
  document.body.appendChild(idiv);
  document.getElementById('rvrtx-chatbox').innerHTML =
														'<div class="rvrtx-chat-window"><div class="rvrtx-click rvrtx-chat-top-bar" id="rvrtx-topbar">'+
														'<span id="rvrtx-headline">' + headLine+ '</span><i style="position: absolute;bottom: 0;'+
														'right:0;padding:20px;" class="fa fa-times" aria-hidden="true"></i></div>'+
														'<div class="rvrtx-msg_container_base has-pattern-stripes" id="rvrtx-msg-container">'+
														'<div class="rvrtx-talk-bubble rvrtx-tri-left rvrtx-chat-round rvrtx-bubble-right rvrtx-btm-right-in">' +
														'<p class="rvrtx-name" style="color:red;float:right;">زينب</p>'+
														'<div class="rvrtx-talktext">'+
														'<p style="color:white;word-wrap: break-word;line-height:1.5; ">'+startLine+'</p>'+
														'</div></div>'+
														'</div><div id="rvrtx-chat-input-group" class="rvrtx-chat-top-bar">'+
														'<input id="rvrtx-chat-input" placeholder="Write your message here..." class="rvrtx-chat_input" />'+
														'<button class="" id="rvrtx-btn-chat"><i style="" class="fa fa-paper-plane fa-3x" aria-hidden="true"></i></button>'+
														'<div id="attachdiv" style="overflow:scroll;"></div>'+
														'</div></div>';
  Blaze.render( Template.uploadForm, $('#attachdiv')[0] );
  Blaze.render( Template.emojiForm, $('#attachdiv')[0] );
    if ( screen.width <= 480 ) {
        var cdiv = document.createElement('div');
        cdiv.id = 'rvrtx-chatcontrols';
        document.body.appendChild(cdiv);
        document.getElementById('rvrtx-chatcontrols').innerHTML =
            '<div class="rvrtx-click" id="rvrtx-btmbar"><div id="rvrtx-welcome" style="display:none;float:none;width:50vw;margin:none;"  class="rvrtx-talk-bubble rvrtx-tri-left rvrtx-chat-round rvrtx-bubble-right rvrtx-btm-right-in">' +
            '<div class="rvrtx-talktext">'+
            '<p class="rvrtx-name" style="color:red;float:right;">زينب</p>'+
            '<p style="color:white;word-wrap: break-word;line-height:1.5;">'+startLine+'</p>'+
            '</div></div>'+
            '<img style="float:right;" id="rvrtx-icon" src="/img/chat.png"/></div>';
    } else {
      $('.rvrtx-chat-window').append('<div class="rvrtx-click" id="rvrtx-btmbar"><div id="rvrtx-welcome" style="display:none;float:none;width:50vw;margin:none;"  class="rvrtx-talk-bubble rvrtx-tri-left rvrtx-chat-round rvrtx-bubble-right rvrtx-btm-right-in">' +
          '<div class="rvrtx-talktext">'+
          '<p class="rvrtx-name" style="color:red;float:right;">زينب</p>'+
          '<p style="color:white;word-wrap: break-word;line-height:1.5;">'+startLine+'</p>'+
          '</div></div>'+
          '<img style="float:right;" id="rvrtx-icon" src="/img/chat.png"/></div>');
  }
    var istyle = document.createElement('style');
    istyle.id = 'rvrtx-chatstyle';
    document.head.appendChild(istyle);
    if ( screen.width <= 480 ) {
        $('#rvrtx-msg-container').toggle();
        $('#rvrtx-chat-input-group').toggle();
        $('#rvrtx-chat-close').val('--');
        //$("#rvrtx-icon").toggle();
        $('#rvrtx-headline').toggle();
        $('#rvrtx-topbar').toggle();
        $('#rvrtx-welcome').show();
        $('#rvrtx-chatbox').hide();
        document.getElementById('rvrtx-chatstyle').innerHTML = `
        @import url(https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css);
            .disable-scroll {
                margin: 0; height: 100%; overflow: hidden
                }
            #rvrtx-topbar {
                background: #ec3a43 !important;
                i {
                    padding: 27px 20px !important;
                    font-size: 0.9rem !important;
                }
            }
            .rvrtx-msg_container_base {
                background: #fff !important;
            }
            input#rvrtx-chat-input {
                font-size: 0.9rem !important;
                font-weight: 300 !important;
                color: #555 !important;
            }
            .rvrtx-talk-bubble {
                border-radius: 5px !important;
                max-width: 250px !important;
            }
            .rvrtx-talktext {
                line-height: 1.5em !important;
                text-align: left !important;
            }
            .rvrtx-bubble-right {
                background-color: #f5f5f5 !important;
            }
            .rvrtx-bubble-right p {
                color: #777 !important;
                font-weight: 400 !important;
                font-size: 0.9rem !important;
            }
            .rvrtx-tri-left.rvrtx-btm-right-in:after {
                border-color: #f5f5f5 #f5f5f5 transparent transparent !important;
            }
            .rvrtx-talk-bubble.rvrtx-tri-right.rvrtx-chat-round.rvrtx-btm-left-in {
                background: #ec3a43 !important;
            }
            .rvrtx-tri-right.rvrtx-btm-left-in:after {
                border-color: #ec3a43 transparent transparent #ec3a43 !important;
            }
            .rvrtx-tri-right.rvrtx-btm-left-in:after p {
                color: #fff !important;
            }
            .rvrtx-bubble-right .rvrtx-name{
                color: red !important;
                opacity:0.4;
                font-size:12px !important;
            }
            #rvrtx-chatbox{
                position: fixed;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                overflow: hidden;
                display:none;
                z-index: 10000000000000000000000000000000000000000000000000001;
                }
            #rvrtx-chatcontrols{
                position: fixed;
                z-index: 100000000000000000000000000000000000000000000000000000001;
                }
            #rvrtx-icon{
                opacity:1;width:80px;height:80px;cursor:pointer;display:block;
                }
            #rvrtx-topbar{
                //border-radius: 15px 15px 0px 0px;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                //height:20vh;
                }
            #rvrtx-headline
            {
                position: absolute;
                bottom: 0;
                right: 0;
                left:0;
                padding:20px;
                }
            .rvrtx-chat-window{
                /* bottom: 0px; */
                /* position: fixed; */
                /* width: 100%; */
                /* margin-left: 0%; */
                /* overflow: hidden; */
                }
            .rvrtx-chat-window > div > .chat-panel{
                border-radius: 5px 5px 0 0;
                }
            #rvrtx-btmbar
            {
                background: transparent;
                color: white;
                position:fixed;
                bottom: 0;
                right:0;
                padding: 20px;
                overflow: hidden;
                font-size:25px;
                cursor:pointer;
                text-align:right;
                }
            .rvrtx-msg_container_base {
                position: absolute;
                left: 0;
                right: 0;
                /* bottom: 0; */
                bottom: 80px;
                top: 80px;
                /* overflow-y: scroll; */
                background: rgb(250,250,250);
                margin: 0;
                /* padding: 0 10px 10px; */
                /* height: 55px; */
                /* overflow-x: hidden; */
                overflow-y: auto;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                }
            .rvrtx-chat-top-bar {
                background-color: rgb(253, 138, 6);
                color: white;
                padding: 20px;
                position: absolute;
                height: 80px;
                width: 100%;
                overflow: hidden;
                font-size: 25px;
                cursor: pointer;
                text-align: center;
                box-sizing: border-box;
                }
            .rvrtx-msg_container {
                padding: 10px;
                overflow: hidden;
                display: flex;
                }
            .rvrtx-msg_container_base::-webkit-scrollbar-track
            {
                -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
                background: rgb(250,250,250);
                }
            .rvrtx-msg_container_base::-webkit-scrollbar
            {
                width: 12px;
                background: rgb(250,250,250);
                }
            .rvrtx-msg_container_base::-webkit-scrollbar-thumb
            {
                -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
                background-color: silver;
                }
            /* CSS talk bubble */
            .rvrtx-talk-bubble {
                margin: 20px;
                position: relative;
                display:inline-block;
                width: auto;
                font-size:20px;
                height: auto;
                background-color: white;
                max-width:60vw;
                float:left;
                clear:both;
                min-width:80px;
                }
            .rvrtx-chat-border{
                border: 8px solid white;
                }
            .rvrtx-chat-round{
                border-radius: 30px;
                -webkit-border-radius: 30px;
                -moz-border-radius: 30px;
                }
            .rvrtx-bubble-right {
                //margin-left:auto; margin-right:3%;
                float:right;
                background-color:rgb(253, 138, 6);
                color:white;
                }
            /*Right triangle, placed bottom left side slightly in*/
            .rvrtx-tri-right.rvrtx-border.rvrtx-btm-left-in:before {
                content: ' ';
                position: absolute;
                width: 0;
                height: 0;
                left: 30px;
                right: auto;
                top: auto;
                bottom: -40px;
                border: 20px solid;
                border-color: white transparent transparent white;
                }
            .rvrtx-tri-right.rvrtx-btm-left-in:after{
                content: ' ';
                position: absolute;
                width: 0;
                height: 0;
                left: 38px;
                right: auto;
                top: auto;
                bottom: -20px;
                border: 12px solid;
                border-color: white transparent transparent white;
                }
            /*Right triangle, placed bottom left side slightly in*/
            .rvrtx-tri-left.rvrtx-border.rvrtx-btm-right-in:before {
                content: ' ';
                position: absolute;
                width: 0;
                height: 0;
                left: auto;
                right: 30px;
                top: auto;
                bottom: -40px;
                border: 20px solid;
                border-color: rgb(253, 138, 6) rgb(253, 138, 6) transparent  transparent ;
                }
            .rvrtx-tri-left.rvrtx-btm-right-in:after{
                content: ' ';
                position: absolute;
                width: 0;
                height: 0;
                left: auto;
                right: 38px;
                top: auto;
                bottom: -20px;
                border: 12px solid;
                border-color: rgb(253, 138, 6) rgb(253, 138, 6) transparent transparent  ;
                }
            /* talk bubble contents */
            .rvrtx-talktext{
                padding: 1em;
                text-align: center;
                line-height: 1em;
                }
            .rvrtx-talktext p{
                /* remove webkit p margins */
                -webkit-margin-before: 0em;
                -webkit-margin-after: 0em;
                }
            /* button */
            #rvrtx-btn-chat {
                position:absolute;
                top:0;
                bottom:0;
                right:0;
                //margin-right:10px;
                background-color: rgb(253, 138, 6);
                color: white;
                width:20%;
                display:none;
                height:100%;
                border:none;
                //border-radius:15px;
                cursor:pointer;
                }
            #rvrtx-btn-chat:hover {background-color: ##1284e8}
            #rvrtx-btn-chat:active {
                background-color: #1284e8;
                box-shadow: 0 5px white;
                transform: translateY(4px);
                outline:none;
                }
            #rvrtx-chat-input-group
            {
                //border-radius: 0px 0px 15px 15px;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                margin: 0px 0px 20px 0px;
                cursor: default;
                background-color: white;
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 80px;
                }
            #rvrtx-chat-input:focus{
                outline: none;
                }
            /*#rvrtx-chat-input-group:hover{
                                                    opacity:1;
                                                }*/
            #rvrtx-chat-input
            {
                padding: 5px 0px;
                display: inline-block;
                resize: none;
                box-sizing: border-box;
                background-color:white;
                width:80%;
                border:none;
                font-size:18px;
                color:black;
                }
            .element {
                display: inline-flex;
                float:right;
            }
            i.fa-lc {
                margin: 10px;
                cursor: pointer;
                font-size: 30px;
                position:absolute;
                right:0;
                top:0;
            }
            i.fa-le {
                margin: 10px;
                cursor: pointer;
                font-size: 30px;
                position:absolute;
                right:0;
                bottom:0;
            }
            i:hover {
                opacity: 0.6;
            }
            input {
                display: none;
            }
            .emojidiv{
                left:0;
                right:0;
                height:60vh;
                background-color:white;
                overflow:scroll;
                position:fixed;
                bottom:18vh;
                opacity:0.9;
                display:none;
            }
            .emoji{
                width:35px;
                height:35px;
            }`;
    } else {
            $('#rvrtx-btn-chat').hide();
            document.getElementById('rvrtx-chatstyle').innerHTML = `
            @import url(https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css);
                #rvrtx-topbar {
                    background: #ec3a43 !important;
                    box-shadow: 0 -4px 15px rgba(0, 0, 0, 0.1) !important;
                    height: auto !important;
                    font-size: 1.2rem !important;
                    border-radius: 5px 5px 0px 0px !important;
                    i {
                        padding: 27px 20px !important;
                        font-size: 0.9rem !important;
                    }
                }
                .rvrtx-msg_container_base {
                    height: 300px !important;
                    box-shadow: 0 0px 15px rgba(0, 0, 0, 0.1) !important;
                    background: #fff !important;
                }
                #rvrtx-chat-input-group {
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1) !important;
                    border-top: 1px solid #eee !important;
                    border-radius: 0px 0px 5px 5px !important;
                }
                input#rvrtx-chat-input {
                    font-size: 0.9rem !important;
                    font-weight: 300 !important;
                    color: #555 !important;
                }
                .rvrtx-talk-bubble {
                    border-radius: 5px !important;
                    max-width: 250px !important;
                }
                .rvrtx-talktext {
                    line-height: 1.5em !important;
                    text-align: left !important;
                }
                .rvrtx-bubble-right {
                    background-color: #f5f5f5 !important;
                }
                .rvrtx-bubble-right p {
                    color: #777 !important;
                    font-weight: 400 !important;
                    font-size: 0.9rem !important;
                }
                /*
                .rvrtx-bubble-right .rvrtx-name{
                    color: red !important;
                    opacity:0.4;
                    font-size:12px !important;
                }
                */
                .rvrtx-tri-left.rvrtx-btm-right-in:after {
                    border-color: #f5f5f5 #f5f5f5 transparent transparent !important;
                }
                .rvrtx-talk-bubble.rvrtx-tri-right.rvrtx-chat-round.rvrtx-btm-left-in {
                    background: #ec3a43 !important;
                }
                .rvrtx-tri-right.rvrtx-btm-left-in:after {
                    border-color: #ec3a43 transparent transparent #ec3a43 !important;
                }
                .rvrtx-tri-right.rvrtx-btm-left-in:after p {
                    color: #fff !important;
                }
                #rvrtx-chatbox{
                    position:relative;
                    z-index:10000000000000000000000000000000000000000000000000001;
                    }
                #rvrtx-chatcontrols{
                    position: relative;
                    z-index: 100000000000000000000000000000000000000000000000000000001;
                    }
                #rvrtx-icon{
                    opacity:0.5;width:60px;height:60px;cursor:pointer;
                    }
                .rvrtx-chat-window{
                    bottom:10px;
                    position:fixed;
                    right:0;
                    left:100% - 2px;
                    width:370px;
                    margin:0px 30px 10px 0px;
                    }
                #rvrtx-topbar{
                    border-radius: 15px 15px 0px 0px;
                    height:10%;
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                    background-image: linear-gradient(to left, rgb(253, 138, 6), rgb(235, 50, 73));
                    }
                .rvrtx-chat-window > div > .chat-panel{
                    border-radius: 5px 5px 0 0;
                    }
                #rvrtx-btmbar
                {
                    border-radius: 150px;
                    float:right;
                    }
                .rvrtx-msg_container_base{
                    background: rgb(250,250,250);
                    margin: 0;
                    padding: 0 10px 10px;
                    height:30vh;
                    overflow-x:hidden;
                    overflow-y:auto;
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                    }
                .rvrtx-chat-top-bar {
                    background: rgb(253, 138, 6);
                    color: white;
                    padding: 20px;
                    position: relative;
                    overflow: hidden;
                    font-size:25px;
                    cursor:pointer;
                    text-align:center;
                    }
                .rvrtx-msg_container {
                    padding: 10px;
                    overflow: hidden;
                    display: flex;
                    }
                .rvrtx-msg_container_base::-webkit-scrollbar-track
                {
                    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
                    background: rgb(250,250,250);
                    }
                .rvrtx-msg_container_base::-webkit-scrollbar
                {
                    width: 12px;
                    background: rgb(250,250,250);
                    }
                .rvrtx-msg_container_base::-webkit-scrollbar-thumb
                {
                    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
                    background-color: silver;
                    }
                /* CSS talk bubble */
                .rvrtx-talk-bubble {
                    margin: 20px;
                    position: relative;
                    display:inline-block;
                    width: auto;
                    height: auto;
                    font-size:15px;
                    background-color: white;
                    max-width:200px;
                    float:left;
                    clear:both;
                    min-width:80px;
                    }
                .rvrtx-chat-border{
                    border: 8px solid white;
                    }
                .rvrtx-chat-round{
                    border-radius: 30px;
                    -webkit-border-radius: 30px;
                    -moz-border-radius: 30px;
                    }
                .rvrtx-bubble-right {
                    //margin-left:auto; margin-right:3%;
                    float:right;
                    background-color:rgb(253, 138, 6);
                    color:white;
                    }
                /*Right triangle, placed bottom left side slightly in*/
                .rvrtx-tri-right.rvrtx-border.rvrtx-btm-left-in:before {
                    content: ' ';
                    position: absolute;
                    width: 0;
                    height: 0;
                    left: 30px;
                    right: auto;
                    top: auto;
                    bottom: -40px;
                    border: 20px solid;
                    border-color: white transparent transparent white;
                    }
                .rvrtx-tri-right.rvrtx-btm-left-in:after{
                    content: ' ';
                    position: absolute;
                    width: 0;
                    height: 0;
                    left: 38px;
                    right: auto;
                    top: auto;
                    bottom: -20px;
                    border: 12px solid;
                    border-color: white transparent transparent white;
                    }
                /*Right triangle, placed bottom left side slightly in*/
                .rvrtx-tri-left.rvrtx-border.rvrtx-btm-right-in:before {
                    content: ' ';
                    position: absolute;
                    width: 0;
                    height: 0;
                    left: auto;
                    right: 30px;
                    top: auto;
                    bottom: -40px;
                    border: 20px solid;
                    border-color:  rgb(253, 138, 6) rgb(253, 138, 6) transparent  transparent ;
                    }
                .rvrtx-tri-left.rvrtx-btm-right-in:after{
                    content: ' ';
                    position: absolute;
                    width: 0;
                    height: 0;
                    left: auto;
                    right: 38px;
                    top: auto;
                    bottom: -20px;
                    border: 12px solid;
                    border-color: rgb(253, 138, 6) rgb(253, 138, 6) transparent transparent  ;
                    }
                /* talk bubble contents */
                .rvrtx-talktext{
                    padding: 1em;
                    text-align: center;
                    line-height: 1em;
                    }
                .rvrtx-talktext p{
                    /* remove webkit p margins */
                    -webkit-margin-before: 0em;
                    -webkit-margin-after: 0em;
                    }
                /* button */
                #rvrtx-btn-chat {
                    display:none;
                    }
                #rvrtx-btn-chat:hover {background-color: ##1284e8}
                #rvrtx-btn-chat:active {
                    background-color: #1284e8;
                    box-shadow: 0 5px white;
                    transform: translateY(4px);
                    outline:none;
                    }
                #rvrtx-chat-input-group
                {
                    border-radius: 0px 0px 15px 15px;
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                    margin: 0px 0px 20px 0px;
                    cursor:default;
                    background-color:white;
                    //opacity:0.5;
                    }
                #rvrtx-chat-input:focus{
                    outline: none;
                    }
                /*#rvrtx-chat-input-group:hover{
                                                    opacity:1;
                                                }*/
                input#rvrtx-chat-input
                {
                    //padding: 5px 0px;
                    //display: inline-block;
                    //border: 1px solid #ccc;
                    //border-radius: 4px;
                    box-sizing: border-box;
                    background-color:transparent;
                    width:100%;
                    height:100%;
                    border:none;
                    resize:none;
                    font-size:12px;
                    color:black;
                    }
                .element {
                    display: inline-flex;
                    float:right;
                }
                i.fa-lc {
                    margin: 10px;
                    cursor: pointer;
                    font-size: 30px;
                }
                i.fa-le{
                    margin: 10px;
                    cursor: pointer;
                    font-size: 30px;
                }
                i:hover {
                    opacity: 0.6;
                }
                .emojidiv{
                    position:fixed;
                    right:0;
                    left:100% - 2px;
                    width:370px;
                    margin:0px 30px 10px 0px;
                    height:50vh;
                    background-color:white;
                    overflow:scroll;
                    position:fixed;
                    bottom:23vh;
                    opacity:0.9;
                    display:none;
                }
                .emoji{
                    width:35px;
                    height:35px;
                }
                .attach {
                    display: none;
                }`;
        }
            $(document).on('click', '#rvrtx-btn-chat', function (e) {
                var msg = $('#rvrtx-chat-input').val();
                if (msg!='' && msg != '\n')
                {
                    if (Meteor.userId())
                    {
                        Meteor.call('insertChatMessage',Emoji.convert(msg),Meteor.userId(),1,1);
                    }
                    else
                    {
                        Meteor.call('insertChatMessage',Emoji.convert(msg),localStorage.getItem('cfp'),1,0);
                    }
                    $('#rvrtx-chat-input').val('');
                    $('#rvrtx-btn-chat').hide();
                }
                else
                    $('#rvrtx-chat-input').val('');
                $('#rvrtx-chat-input').focus();
            });
            $('#rvrtx-chat-input').on('keyup', function(e) {
                var msg = $('#rvrtx-chat-input').val();
                if (e.keyCode == 13) {
                    if (msg!='' && msg != '\n') {
                        if (Meteor.userId()) {
                            Meteor.call('insertChatMessage',Emoji.convert(msg),Meteor.userId(),1,1);
                        } else {
                            Meteor.call('insertChatMessage',Emoji.convert(msg),localStorage.getItem('cfp'),1,0);
                        }
                        $('#rvrtx-chat-input').val('');
                        $('#rvrtx-btn-chat').hide();
                        return false; // prevent the button click from happening
                    } else {
                        $('#rvrtx-chat-input').val('');
                    }
                }
                if (screen.width <= 480 ) {
                    if (msg.length == 0 && e.keyCode == 8) {
                        $('#rvrtx-btn-chat').hide(500);
                    } else {
                        $('#rvrtx-btn-chat').show(500);
                    }
                }
            });
            $('.fa-paperclip').click(function () {
                $('input[type=\'file\']').trigger('click');
            });
            $('input[type="file"]').on('change', function() {
                var val = $(this).val();
                $(this).siblings('span').text(val);
            });
            $('.navbar a.nav-link').on('click', function () {
                $('.navbar-collapse.collapse').toggleClass('show');
                $('.navbar .navbar-toggler').toggleClass('active');
            });
}
//Fingerprint
function fingerprint() {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i=0; i < 20; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
