import { $, jQuery } from 'meteor/jquery';
import '/imports/js/bootstrap.min.js';
import '/imports/js/owl.carousel.min.js';
import '/imports/js/easyscroll.min.js';
import '/imports/js/wow.min.js';
import '/imports/js/animsition.min.js';
import '/imports/js/bootstrap-select.min.js';
import '/imports/js/intlTelInput.min.js';
import '/imports/js/jquery.validate.min.js';
import '/imports/js/YouTubePopUp.jquery.js';

export function getItems() {
  let res = Items.find({
    'academic': Template.instance().selectedAcademic.get(),
  },{
    multi:true
  }).fetch();
  if (!Template.instance().selectedAcademic.get()) {
    Template.instance().selectedAcademic.set('0');
  }
  if (res && res.length && !Template.instance().selectedDeadline.get()) {
    Template.instance().selectedDeadline.set(res[0].deadline);
  }
  console.log("ITEMS", res);
  return res;
}

export function getItem() {
  var item = Items.findOne({
    'deadline': Template.instance().selectedDeadline.get(),
    'academic': Template.instance().selectedAcademic.get(),
  });
  return item;
}

export function getPrice() {
  let item = getItem();
  let currency = Template.instance().selectedCurrency.get() || 'usd';
  let postfix = (currency === 'usd'? '' : currency).toUpperCase();
  let price = item && item['price' + postfix] || 0;
  let count = Template.instance().selectedCount.get() || 0;
  return parseFloat(price * count).toFixed(2) + ' ' + currency.toUpperCase();
}

export const events = {
  'change #academic': function(evt) {
    var academic = $('#academic').val();
    Template.instance().selectedAcademic.set(academic);
  },
  'input #pages-quantity': function(evt) {
    var count = $('#pages-quantity').val();
    Template.instance().selectedCount.set(count);
  },
  'click .pbtn': function(evt) {
    var count = $('#pages-quantity').val();
    Template.instance().selectedCount.set(count);
  },
  'change #deadline': function(evt) {
    var deadline = $('#deadline').val();
    Template.instance().selectedDeadline.set(deadline);
  },
  'change .currency': function(evt) {
    var cur = $('input[name=\'currency\']:checked').attr('id');
    Template.instance().selectedCurrency.set(cur);
  },
};

export function onRendered() {
  Meteor.setTimeout(()=> {
    $('html, body').animate({ scrollTop: 0}, 1000);
    // ------------------------------------------------------- //
    // Increase/Reduce product amount
    // ------------------------------------------------------ //
    $('.minus-btn').click(function () {
      var siblings = $(this).siblings('input.quantity');
      if (parseInt(siblings.val(), 10) >= 1) {
        siblings.val(parseInt(siblings.val(), 10) - 1);
      }
    });
    $('.plus-btn').click(function () {
      var siblings = $(this).siblings('input.quantity');
      siblings.val(parseInt(siblings.val(), 10) + 1);
    });
    // ------------------------------------------------------- //
    // Free Feature Section Hover Effect
    // ------------------------------------------------------- //
    $('.free-features .item').on('mouseenter', function () {
      $(this).css('z-index', '999');
      $(this).siblings().css('z-index', '99');
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
    jQuery(function(){
      jQuery('a.bla-1').YouTubePopUp({
        autoplay: 1
      });
    });
    setTimeout(function () {
      $('.preloader-inner').fadeOut(300, function () {
        $('.preloader').remove();
      });
    }, 3000);
  }, 1000);
}
