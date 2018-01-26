

FlowRouter.route('/',{

			name:'index',
			action(){		
				BlazeLayout.render('layout',{ main:'index'});
			}
	   
});

FlowRouter.route('/about',{
	
	name:'about',
	action(){		
		BlazeLayout.render('layout',{ main:'about'});
	}
});

FlowRouter.route('/contact',{
	
	name:'contact',
	action(){		
		BlazeLayout.render('layout',{ main:'contact'});
	}
});

FlowRouter.route('/paypal',{
	name:'paypal',
	action(){	
		BlazeLayout.render('layout',{ main:'paypal'});
	}
	});

FlowRouter.route('/staff',{
	name:'staff',
	action(){	
		BlazeLayout.render('stafflayout',{ main:'staff'});
	}
	});

FlowRouter.route('/staffsignup',{
	name:'staffsignup',
	action(){	
	
		var user=Meteor.users.find({_id:Meteor.userId(),"profile.type":1}).count();
		
		if(user >0)	
			BlazeLayout.render('stafflayout',{ main:'staffsignup'});
		
	}
});

FlowRouter.route('/stafforders',{
	name:'stafforders',
	action(){	
	
		var user=Meteor.users.find({_id:Meteor.userId(),"profile.type":1}).count();
		
		if(user >0)	
			BlazeLayout.render('stafflayout',{ main:'stafforders'});
		
	}
});

FlowRouter.route('/items',{
	name:'items',
	action(){	
	
		var user=Meteor.users.find({_id:Meteor.userId(),"profile.type":1}).count();
		
		if(user >0)	
			BlazeLayout.render('stafflayout',{ main:'items'});
		
	}
});

FlowRouter.route('/staffmessages',{	
	name:'staffmessages',
	action(){	
	
	var user=Meteor.users.find({_id:Meteor.userId(),"profile.type":1}).count();
	
	if(user >0)
		BlazeLayout.render('stafflayout',{ main:'staffmessages'});
	}
});
FlowRouter.route('/privchat',{
	name:'privchat',
	action(){
		
		
	var user=Meteor.users.find({_id:Meteor.userId(),"profile.type":1}).count();
	
	if(user >0)
		BlazeLayout.render('stafflayout',{ main:'privchat'});
	}
});
FlowRouter.route('/pubchat',{
	name:'pubchat',
	action(){		
	
		var user=Meteor.users.find({_id:Meteor.userId(),"profile.type":1}).count();
	
	if(user >0)
		BlazeLayout.render('stafflayout',{ main:'pubchat'});
	}
});FlowRouter.route('/sorders',{
	name:'sorders',
	action(){	
	
		var user=Meteor.users.find({_id:Meteor.userId(),"profile.type":1}).count();
	
	if(user >0)
		BlazeLayout.render('stafflayout',{ main:'sorders'});
	}
});




FlowRouter.route('/enquiry',{
	
	name:'enquiry',
	action(){		
		BlazeLayout.render('layout',{ main:'enquiry'});
	}
});

FlowRouter.route('/faq',{
	
	name:'faq',
	action(){		
		BlazeLayout.render('layout',{ main:'faq'});
	}
});

FlowRouter.route('/how',{
	
	name:'how',
	action(){		
		BlazeLayout.render('layout',{ main:'how'});
	}
});

FlowRouter.route('/login',{
	
	name:'login',
	action(){		
		BlazeLayout.render('layout',{ main:'login'});
	}
});

FlowRouter.route('/order',{
	
	name:'order',
	action(){		
		BlazeLayout.render('layout',{ main:'order'});
	}
});

FlowRouter.route('/orderdetails',{
	
	name:'orderdetails',
	action(){		
		BlazeLayout.render('layout',{ main:'orderdetails'});
	}
});

FlowRouter.route('/pending',{
	
	name:'pending',
	action(){		
		BlazeLayout.render('layout',{ main:'pending'});
	}
});

FlowRouter.route('/pricing',{
	
	name:'pricing',
	action(){		
		BlazeLayout.render('layout',{ main:'pricing'});
	}
});

FlowRouter.route('/profile',{
	
	name:'profile',
	action(){		
		BlazeLayout.render('layout',{ main:'profile'});
	}
});

FlowRouter.route('/report',{
	
	name:'report',
	action(){		
		BlazeLayout.render('layout',{ main:'report'});
	}
});

FlowRouter.route('/samples',{
	
	name:'samples',
	action(){		
		BlazeLayout.render('layout',{ main:'samples'});
	}
});

FlowRouter.route('/services',{
	
	name:'services',
	action(){		
		BlazeLayout.render('layout',{ main:'services'});
	}
});

FlowRouter.route('/signup',{
	
	name:'signup',
	action(){		
		BlazeLayout.render('layout',{ main:'signup'});
	}
});



FlowRouter.route('/ar',{

			name:'indexar',
			action(){		
				BlazeLayout.render('layoutar',{ main:'indexar'});
			}
	   
});

FlowRouter.route('/aboutar',{
	
	name:'aboutar',
	action(){		
		BlazeLayout.render('layoutar',{ main:'aboutar'});
	}
});

FlowRouter.route('/contactar',{
	
	name:'contactar',
	action(){		
		BlazeLayout.render('layoutar',{ main:'contactar'});
	}
});


FlowRouter.route('/enquiryar',{
	
	name:'enquiryar',
	action(){		
		BlazeLayout.render('layoutar',{ main:'enquiryar'});
	}
});

FlowRouter.route('/faqar',{
	
	name:'faqar',
	action(){		
		BlazeLayout.render('layoutar',{ main:'faqar'});
	}
});

FlowRouter.route('/howar',{
	
	name:'howar',
	action(){		
		BlazeLayout.render('layoutar',{ main:'howar'});
	}
});

FlowRouter.route('/loginar',{
	
	name:'loginar',
	action(){		
		BlazeLayout.render('layoutar',{ main:'loginar'});
	}
});

FlowRouter.route('/orderar',{
	
	name:'orderar',
	action(){		
		BlazeLayout.render('layoutar',{ main:'orderar'});
	}
});

FlowRouter.route('/orderdetailsar',{
	
	name:'orderdetailsar',
	action(){		
		BlazeLayout.render('layoutar',{ main:'orderdetailsar'});
	}
});

FlowRouter.route('/pendingar',{
	
	name:'pendingar',
	action(){		
		BlazeLayout.render('layoutar',{ main:'pendingar'});
	}
});

FlowRouter.route('/pricingar',{
	
	name:'pricingar',
	action(){		
		BlazeLayout.render('layoutar',{ main:'pricingar'});
	}
});

FlowRouter.route('/profilear',{
	
	name:'profilear',
	action(){		
		BlazeLayout.render('layoutar',{ main:'profilear'});
	}
});

FlowRouter.route('/reportar',{
	
	name:'reportar',
	action(){		
		BlazeLayout.render('layoutar',{ main:'reportar'});
	}
});

FlowRouter.route('/samplesar',{
	
	name:'samplesar',
	action(){		
		BlazeLayout.render('layoutar',{ main:'samplesar'});
	}
});

FlowRouter.route('/servicesar',{
	
	name:'servicesar',
	action(){		
		BlazeLayout.render('layoutar',{ main:'servicesar'});
	}
});

FlowRouter.route('/signupar',{
	
	name:'signupar',
	action(){		
		BlazeLayout.render('layoutar',{ main:'signupar'});
	}
});
