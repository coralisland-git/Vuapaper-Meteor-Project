
import './order-ar.html';

Template.orderar.onCreated(function helloOnCreated() {
	
	this.selectedAcademic = new ReactiveVar(false);
	this.selectedCount = new ReactiveVar(false);
	this.selectedDeadline = new ReactiveVar(false);
	this.selectedType= new ReactiveVar(false);
	this.selectedSubject= new ReactiveVar(false);
	this.selectedTopic= new ReactiveVar(false);
	this.selectedInstructions= new ReactiveVar(false);
	this.selectedSource= new ReactiveVar(false);
	this.selectedFormat= new ReactiveVar(false);
	this.selectedPages= new ReactiveVar(false);
	this.selectedSpaced= new ReactiveVar(false);
	this.selectedCategory= new ReactiveVar(false);
	this.selectedSlides= new ReactiveVar(false);
	this.selectedVIP= new ReactiveVar(false);
	this.selectedBest= new ReactiveVar(false);
	this.selectedPrint= new ReactiveVar(false);
	this.selectedPrice= new ReactiveVar(false);
	Template.instance().selectedAcademic.set("0");
	Template.instance().selectedCount.set("1");
	Template.instance().selectedType.set("Article");
	Template.instance().selectedSubject.set("Accounting");
	Template.instance().selectedSource.set("1");
	Template.instance().selectedFormat.set("Chicago/Turabian");
	Template.instance().selectedSlides.set("1");
	Template.instance().selectedSpaced.set("Double Spaced");
	Template.instance().selectedCategory.set("Best Available");
	Template.instance().selectedPrice.set(0);
	Template.instance().selectedInstructions.set("");
});

	Template.orderar.onRendered(function () {
		
		
        $('html, body').animate({ scrollTop: 0}, 1000);
		
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
    // Bootstrap Select
    // ------------------------------------------------------- //
    $('.bs-select').selectpicker();

    // ------------------------------------------------------- //
    // Tooltips
    // ------------------------------------------------------- //
    $('[data-toggle="tooltip"]').tooltip();
		
				  // ------------------------------------------------------- //
    // Order Form Step Functionality
    // ------------------------------------------------------- //
    /*$('.steps-header .step').click(function () {
        var stepHeaderId = $(this).attr('id');
		

        $(this).addClass('active');
        $('.step-body').hide();

        $('#' + stepHeaderId + '-content').show();

        if ($('#price-calculation-step').hasClass('active')) {
            $(this).next('.step').removeClass('active');
        }

        if (!$('#price-calculation-step').hasClass('active')) {
            $('#personal-information-step').removeClass('active');
            $('#personal-information-step-content').hide();
            $('#paper-details-step-content').show();
        }
    });*/
	
	
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

    $('#price-calculation-step-content .step-nav a.prev').click( function () {
        $('#price-calculation-step-content').hide();
        $('#paper-details-step-content').show();
        $('#price-calculation-step').removeClass('active');
    });
    $('#personal-information-step-content .step-nav a.prev').click( function () {
        $('#personal-information-step-content').hide();
        $('#price-calculation-step-content').show();
        $('#personal-information-step').removeClass('active');
    });


    $('.step-nav a').click( function (e) {
        e.preventDefault();
    });


		
             'use strict';

             ;( function ( document, window, index )
             {
              var inputs = document.querySelectorAll( '.input-file' );
              Array.prototype.forEach.call( inputs, function( input )
              {
                  var label	 = input.nextElementSibling,
                      labelVal = label.innerHTML;

                  input.addEventListener( 'change', function( e )
                  {
                      var fileName = '';
                      if( this.files && this.files.length > 1 )
                          fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
                      else
                          fileName = e.target.value.split( '\\' ).pop();

                      if( fileName )
                          label.querySelector( 'span' ).innerHTML = fileName;
                      else
                          label.innerHTML = labelVal;
                  });

                  // Firefox bug fix
                  input.addEventListener( 'focus', function(){ input.classList.add( 'has-focus' ); });
                  input.addEventListener( 'blur', function(){ input.classList.remove( 'has-focus' ); });
              });
             }( document, window, 0 ));
	});




	Template.orderar.helpers({

	getItems()
	{
		return Items.find({"academic" :Template.instance().selectedAcademic.get()},{multi:true});
	},
	getItem()
	{
		return Items.findOne({"_id" :Template.instance().selectedDeadline.get()});
	},
	getUser()
	{
		return Meteor.user();
	}
	,
	getDetails()
	{
		var ac = Template.instance().selectedAcademic.get() == "0" ? "Diploma" : (Template.instance().selectedAcademic.get() == "1" ? "Bachelor" : (Template.instance().selectedAcademic.get() == "2" ? "Master	" : "PhD" )); 
		
	var details = {
		"academic":ac,
		"pages": Template.instance().selectedCount.get(),
		"type":Template.instance().selectedType.get(),
		"spaced":Template.instance().selectedSpaced.get(),
		"subject":Template.instance().selectedSubject.get(),
		"deadline":Template.instance().selectedDeadline.get(),
		"category":Template.instance().selectedCategory.get(),
		"topic":Template.instance().selectedTopic.get(),
		"slides":Template.instance().selectedSlides.get(),
		"source":Template.instance().selectedSource.get(),
		"format":Template.instance().selectedFormat.get()};
		
		return details;
	},
	
	getPrice()
	{
		var item = Items.findOne({"_id" :Template.instance().selectedDeadline.get()});
		var price = 0;
		var addprice = 0;
		
		if(item == null)
			return 0;
				
		if(Template.instance().selectedVIP.get())
			addprice += 9.9;
		
		if(Template.instance().selectedBest.get())
			addprice += 9.9;
		
		if(Template.instance().selectedPrint.get())
			addprice += 49.9;
		
			price = item.price * Template.instance().selectedCount.get() + addprice;
			
			Template.instance().selectedPrice.set(price);
		
		return price;
	}
});

Template.orderar.events({
	
    "change input[name='academic-level']:checked": function(evt) {
		
		var academic = $("input[name='academic-level']:checked").attr('id');
			
		Template.instance().selectedAcademic.set(academic);
		
  
  },
  'click a[target=_blank]': function (event) {
    event.preventDefault();
    window.open(event.target.href, '_blank');
  }
  ,
	"input #order-pages-quantity": function(evt) {
		
		var count = $("#order-pages-quantity").val();
			
		Template.instance().selectedCount.set(count);
		
  
  },
	"click .pbtn": function(evt) {
		
		var count = $("#order-pages-quantity").val();
			
		Template.instance().selectedCount.set(count);
		
  
  },
   "change #order-paper-type": function(evt) {
		
		var orderType = $("#order-paper-type").val();
			
		Template.instance().selectedType.set(orderType);
  
  },
   "change #order-subject": function(evt) {
		
		var value = $("#order-subject").val();
			
		Template.instance().selectedSubject.set(value);
  
  },
	"input #topic": function(evt) {
		
		var value = $("#topic").val();
			
		Template.instance().selectedTopic.set(value);
		
  
  },
  
	"input #instructions": function(evt) {
		
		var value = $("#instructions").val();
			
		Template.instance().selectedInstructions.set(value);
		
  
  },"input #order-source-quantity": function(evt) {
		
		var value = $("#order-source-quantity").val();
			
		Template.instance().selectedSource.set(value);

  },
	"click .ssbtn": function(evt) {
		
		var count = $("#order-source-quantity").val();
		Template.instance().selectedSource.set(count);
  },
   "change input[name='page-format']:checked": function(evt) {
		
		var value = $("input[name='page-format']:checked").attr('id');
			
		Template.instance().selectedFormat.set(value);
		
  
  },
  
   "change input[name='spaced-type']:checked": function(evt) {
		
		var value = $("input[name='spaced-type']:checked").attr('id');
			
		Template.instance().selectedSpaced.set(value);
		
  
  },

  "change input[name='final-deadline']:checked": function(evt) {
		
		var value = $("input[name='final-deadline']:checked").attr('id');
			
		Template.instance().selectedDeadline.set(value);
		
  
  },
  "change input[name='writer-category']:checked": function(evt) {
		
		var value = $("input[name='writer-category']:checked").attr('id');
			
		Template.instance().selectedCategory.set(value);
		
  
  },
  "input #order-powerpoint-slidesy": function(evt) {
		
		var value = $("#order-powerpoint-slides").val();
			
		Template.instance().selectedSlides.set(value);

  },
	"click .slbtn": function(evt) {
		
		var count = $("#order-powerpoint-slides").val();
			
		Template.instance().selectedSlides.set(count);
  },
  
  "change input[name='vip-support']": function(evt) {
		
		Template.instance().selectedVIP.set(evt.target.checked);
		
  
  },
  "change input[name='best-writer']": function(evt) {
		
		Template.instance().selectedBest.set(evt.target.checked);
		
  
  },
  "change input[name='print-quest']": function(evt) {
		
		Template.instance().selectedPrint.set(evt.target.checked);
		
  
  },
  "click #paper-details-step-content .step-nav a.next": function(evt) {
	  
	  if($("#topic").val()!= "")
	  {
		$('#paper-details-step-content').hide();
        $('#price-calculation-step-content').show();
        $('#price-calculation-step').addClass('active');
	  }
	  else
		  notifyErr("برجاء كتابة الموضوع");
  },
  
  "click #price-calculation-step-content .step-nav a.next": function(evt) {
	  
	  if(Template.instance().selectedDeadline.get() == "" || Template.instance().selectedDeadline.get() == null)
		{
			notifyErr("برجاء اختيار ميعاد التسليم");
			return;
		}
		
		if(Template.instance().selectedCategory.get() == "" || Template.instance().selectedCategory.get() == null)
		{
			notifyErr("يرجاء اختيار نوع الكتابة");
			return;
		}
	  
        $('#price-calculation-step-content').hide();
        $('#personal-information-step-content').show();
        $('#personal-information-step').addClass('active');
  },
  
  
  
  
	"click #save": function(evt) {
		
		var payment = $("input[name='payment-system']:checked").attr('id');
		
		if(Template.instance().selectedDeadline.get() == "" || Template.instance().selectedDeadline.get() == null)
		{
			notifyErr("Please choose deadline");
			return;
		}
		
		if(Template.instance().selectedTopic.get() == "" || Template.instance().selectedTopic.get() == null)
		{
			notifyErr("Please select topic");
			return;
		}
		
		if(Template.instance().selectedCategory.get() == "" || Template.instance().selectedCategory.get() == null)
		{
			notifyErr("Please choose category of writer");
			return;
		}
			
		 Meteor.call("insertOrder",Template.instance().selectedAcademic.get(),Template.instance().selectedType.get(),Template.instance().selectedSubject.get(),
					 Template.instance().selectedTopic.get(),Template.instance().selectedInstructions.get(),Template.instance().selectedSource.get(),
					 Template.instance().selectedFormat.get(),Template.instance().selectedCount.get(),Template.instance().selectedSpaced.get(),
					 Template.instance().selectedDeadline.get(),Template.instance().selectedCategory.get(),Template.instance().selectedSlides.get(),
					 Template.instance().selectedVIP.get(),Template.instance().selectedBest.get(),Template.instance().selectedPrice.get(),payment,
		function(err,res){
        if (!err) {		
			notify("Order placed successfully");
			FlowRouter.go("/profile");
			
        } else {
            notifyErr(err);
        }});
  
  },
  

 
});
	


