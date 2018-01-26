import './about.html';

				
		Template.about.onCreated(function helloOnCreated() {
        $('html, body').animate({ scrollTop: 0}, 1000);
	

});

	Template.about.onRendered(function () {
		
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
            "<i class='fa fa-long-arrow-left'></i>",
            "<i class='fa fa-long-arrow-right'></i>"
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
	
	});




	