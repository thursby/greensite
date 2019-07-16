$(window).load(function () {
	/* ------------------------------------------------------------------
	 ISOTOPE
	 ------------------------------------------------------------------ */
	//Define your containers and option sets
	var $container = [$('#gallery-masonry')], $optionSets = [$('#options-gallery .option-set')];

	//Initialize isotope on each container
	jQuery.each($container, function (j) {
		this.isotope({
			itemSelector: '.masonry-item'
		});
	});

	//Initialize filter links for each option set
	jQuery.each($optionSets, function (index, object) {

		var $optionLinks = object.find('a');

		$optionLinks.click(function () {
			var $this = $(this), $optionSet = $this.parents('.option-set'), options = {},
				key = $optionSet.attr('data-option-key'),
				value = $this.attr('data-option-value');
			// don't proceed if already selected
			if ($this.hasClass('selected')) {
				return false;
			}

			$optionSet.find('.selected').removeClass('selected');
			$this.addClass('selected');

			// make option object dynamically, i.e. { filter: '.my-filter-class' }

			// parse 'false' as false boolean
			value = value === 'false' ? false : value;
			options[key] = value;
			if (key === 'layoutMode' && typeof changeLayoutMode === 'function') {
				// changes in layout modes need extra logic
				changeLayoutMode($this, options);
			} else {
				// otherwise, apply new options

				$container[index].isotope(options);
			}

			return false;
		});
	});

});

$(function () {
	/* ------------------------------------------------------------------
	 SMOOTH SCROLL
	 ------------------------------------------------------------------ */
	$('a[href*="#"]:not([href="#"])').click(function() {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			console.log(this.hash);

			classie.remove(document.getElementById('st-container'), 'st-menu-open');

			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length && location.hash != this.hash) {
				history.pushState({}, '', $(this).attr("href"));
//				$('html,body').animate({
				$('.st-content').animate({
					scrollTop: target.offset().top
// 					scrollTop: scrollTo
				}, 1000);
				return false;
			}
		}
	});

	/* ------------------------------------------------------------------
	 BXSLIDER
	 ------------------------------------------------------------------ */
	$('#slider-events').bxSlider({
		controls: true,
		pager: false,
		prevText: '&larr; Prev',
		nextText: 'Next &rarr;'
	});

	$('#slider-testimonials').bxSlider({
		controls: false
	});

	$('#slider-partners').bxSlider({
		controls: false,
		minSlides: 1,
		maxSlides: 3,
		slideWidth: 200,
		slideMargin: 10
	});

});

$(document).ready(function () {

	/* ------------------------------------------------------------------
	 COLIO jQuery Plugin
	 ------------------------------------------------------------------ */

	// "scrollTop" plugin
	$.scrollUp();

	// "colio" plugin
	$('#services').colio({
		id: 'colio_1',
		theme: 'white',
		placement: 'before',
		scrollOffset: -740,
		onContent: function (content) {
			// init "flexslider" plugin
			$('.flexslider', content).flexslider({slideshow: false, animationSpeed: 300});
		}
	});
	$('#gallery').colio({
		id: 'colio_2',
		theme: 'white',
		placement: '#colio-gallery-wrapper',
		expandLink: '.colio-link-gallery',
		scrollOffset: -2990,
		onContent: function (content) {
			// init "flexslider" plugin
			$('.flexslider', content).flexslider({slideshow: false, animationSpeed: 300});
		}
	});

	// flexslider
	$('#services > ul').colio({
		id: 'colio_1',
		onContent: function (content) {
			$('.flexslider', content).flexslider();
		}
	});
	$('#gallery > ul').colio({
		id: 'colio_2',
		onContent: function (content) {
			$('.flexslider', content).flexslider();
		}
	});


	/* ------------------------------------------------------------------
	 CONTACT FORM
	 ------------------------------------------------------------------ */
	$("#ajax-contact-form").submit(function () {
		var str = $(this).serialize();
		$.ajax({
			type: "post",
			url: "contact-form/contact.php",
			data: str,
			success: function (msg) {
				// Message Sent
				if (msg == 'OK') {
					result = '<div class="alert alert-success">Your message has been sent. Thank you!</div>';
					//option to hide the form fields after sending
					$("#fields").hide();
				} else {
					result = msg;
				}
				$('#note').html(result);
			}
		});
		return false;
	});

	/* ------------------------------------------------------------------
	 GOOGLE MAPS
	 ------------------------------------------------------------------ */
	GMaps.geocode({
		address: $('#address').html(),
		callback: function (results, status) {
			if (status == 'OK') {
				map = new GMaps({
					div: '#map',
					lat: -12.043333,
					lng: -77.028333
				});
				var latlng = results[0].geometry.location;
				map.setCenter(latlng.lat(), latlng.lng());
				map.addMarker({
					lat: latlng.lat(),
					lng: latlng.lng()
				});
			}
		}
	});

});