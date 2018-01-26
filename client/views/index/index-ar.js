import './index-ar.html';
import {getItems, onRendered, getPrice, events} from './common';
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

Template.indexar.onCreated(function helloOnCreated() {
  this.selectedAcademic = new ReactiveVar(false);
  this.selectedCount = new ReactiveVar(false);
  this.selectedDeadline = new ReactiveVar(false);
  this.selectedCurrency = new ReactiveVar(false);
  Template.instance().selectedAcademic.set('0');
  Template.instance().selectedCount.set('1');
  Template.instance().selectedCurrency.set('usd');
  $(document).prop('title', 'Vuapaper | نحن رواد الابتكار');
});

Template.indexar.onRendered(onRendered);

Template.indexar.helpers({
  getItems() {
    return getItems();
  },
  getPrice() {
    return getPrice();
  }
});

Template.indexar.events(events);
