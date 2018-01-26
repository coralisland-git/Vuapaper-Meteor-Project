import './profile.html';

Template.profile.onCreated(function helloOnCreated() {
	
});

	Template.profile.onRendered(function () {
		
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
		
			  $(function () {
                // ---------------------------------------------- //
                // Date picker initialization
                // ---------------------------------------------- //
                $('#date').datepicker({
                    todayButton: new Date()
                });
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


Template.profile.helpers({

	getUserName()
	{
		if(Meteor.user() != null)
		{
				
				if(Meteor.user().profile.address == null)
					notifyErr("Please complete your profile info");
			
			return Meteor.user().profile.name;
		}
		
		return "";
	},
	getUserJob()
	{
		if(Meteor.user() != null)
		{
			return Meteor.user().profile.job;
		}
		
		return "";
		
	}
	,
	getOrders()
	{
		return Orders.find({"cid":Meteor.userId()});
	}
	,
	messages() {
			
			return Messages.find({$or:[{cid:Meteor.userId()},{cid:"all"}]},{sort: {timestamp: -1}});		
	}
	,
	mescount(){
		
		return Messages.find({cid:Meteor.userId(),seen:false}).count();

	},
	allmescount(){
		
		return Messages.find({cid:Meteor.userId()}).count();

	}
});

Template.profile.events({
  
  'click #logout': function (event) {
	   event.preventDefault();
	   
	   Meteor.logout();
	   FlowRouter.go("/");
	   notify("See You Soon!!");
	   
    }
	,'click #editprofile': function (event) {
	   event.preventDefault();
	     
	   var name = $("#profile-name").val();
	   var job = $("#profile-title").val();
	   var email = $("#profile-email").val();
	   var phone = $("#profile-number").val();
	   var birthday = $("#profile-birthday").val();
	   var country = $("#profile-country").val();
	   var address = $("#profile-address").val();
	   
	   Meteor.call("updateProfile",name,job,email,phone,birthday,country,address,function(err,res){
        if (!err) {		
					
			notify("Profile updated successfully");
			FlowRouter.go("/profile");
				
        } else {
            alert(err);
        }});
	   
    },'click #changepassword': function (event) {
	   event.preventDefault();
	     
	   var opass = $("#current-pass").val();
	   var npass = $("#new-pass").val();
	   var npass2 = $("#confirm-new-pass").val();
	   
	   if(npass != npass2)
	   {
		   notifyErr("Passwords don't match, please check again");
		   return;
	   }
	   
	     Accounts.changePassword(opass, npass, function(err){
             if(err){
                 notifyErr(err.reason);
             } else {
                 notify("Password updated successfully");
				 FlowRouter.go("/profile");
             }
         });
	},
	'click #clearnotify': function (event) {
		
	  Meteor.call("clearNotify",Meteor.userId());
	   
	   
	},
	'click .dbtn': function (event) {
		
		var id = $(event.target).attr("id");
		
		sessionStorage.setItem("oid",id);
		
		FlowRouter.go("/orderdetails");
	}

  
 
});
	

