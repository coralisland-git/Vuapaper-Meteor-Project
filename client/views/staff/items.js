
import './items.html';

Template.items.onCreated(function helloOnCreated() {
	
	Meteor.subscribe('users');
	this.selectedClients= new ReactiveVar(false);
	Template.instance().selectedClients.set("");

});

	Template.items.onRendered(function () {
		
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
		
		var curr;
		$.getJSON('https://openexchangerates.org/api/latest.json?app_id=ab656c05251d48e9a3d3ac598fab7085', function(data) {
			curr = data;
			//alert(curr.rates.KWD);
			Meteor.call("updateCurrency",curr);
		});
	
	});


	Template.items.helpers({

	getDiplomas()
	{
		return Items.find({"academic" :"0"},{multi:true});
	},
	getPhDs()
	{
		return Items.find({"academic" :"3"},{multi:true});
	}
	,
	getMasters()
	{
		return Items.find({"academic" :"2"},{multi:true});
	}
	,
	getBachelors()
	{
		return Items.find({"academic" :"1"},{multi:true});
		
	},
});

Template.items.events({
	
    "click #save": function(evt) {
		
		var academic = $("#academic").val();
	    var deadline = $("#deadline").val();
		var deadlineunit = $("#deadlineunit").val();
	    var price = $("#price").val();
		var type = $("#type").val();
		
		
		if(academic == null || academic == "")
		{
            notifyErr("Please choose academic level");
			return;
		}
		
		if(deadlineunit ==null || deadlineunit == "")
		{
            notifyErr("Please choose deadline unit");
			return;
		}
		
		if(deadline == "" || deadline == null)
		{
            notifyErr("Please choose deadline ");
			return;
		}
		
		if(price == "" || price == null)
		{
            notifyErr("Please choose price");
			return;
		}
		
		if(type == "")
		{
            notifyErr("Please choose paper type");
			return;
		}
	   
	   Meteor.call("insertItem",academic[0],deadline,deadlineunit[0],price,type,function(err,res){
        if (!err) {		
			notify("Item added successfully");
			
        } else {
            notifyErr(err);
        }});
		
  
  },"click .remitem": function(evt) {
		
		var id = $(evt.target).attr('id');
		alert(id);
		
		
	   
	   Meteor.call("removeItem",id,function(err,res){
        if (!err) {		
			notify("Item removed successfully");
			
        } else {
            notifyErr(err);
        }});
		
  
  },
	

 
});
	
