﻿(function($) {
    'use strict';
    var mobileDevice = false;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $('html').addClass('mobile');
        mobileDevice = true;
    } else {
        $('html').addClass('no-mobile');
        mobileDevice = false;
    }
    $(window).load(function() {
        $('.loader').fadeOut();
        var wow = new WOW({
            offset: 100,
            mobile: false
        });
        wow.init();
    });
    var navbar = $('.js-navbar-affix');
    var navbarAffixHeight = 68
    $('.js-target-scroll, .navbar-nav li a').on('click', function() {
        var target = $(this.hash);
        if (target.length) {
            $('html,body').animate({
                scrollTop: (target.offset().top - navbarAffixHeight + 1)
            }, 1000);
            return false;
        }
    });
    navbar.affix({
        offset: {
            top: 12
        }
    });
    navbar.on('affix.bs.affix', function() {
        if (!navbar.hasClass('affix')) {
            navbar.addClass('animated slideInDown');
        }
    });
    navbar.on('affix-top.bs.affix', function() {
        navbar.removeClass('animated slideInDown');
        $('.navbar-collapse').collapse('hide');
    });
    $('.collapse').on('show.bs.collapse', function() {
        navbar.addClass('affix');
    });
    $('.collapse').on('hidden.bs.collapse', function() {
        if (navbar.hasClass('affix-top')) {
            navbar.removeClass('affix');
        }
    });
    navbar.on('affixed-top.bs.affix', function() {
        if ($('.collapse').hasClass('in')) {
            navbar.addClass('affix');
        }
    });
    $(window).on('resize', function() {
        $('.collapse').removeClass('in');
        if (navbar.hasClass('affix-top')) {
            navbar.removeClass('affix');
        }
    });
    $('body').scrollspy({
        offset: navbarAffixHeight + 1
    });
 
    $(".partners-carousel").owlCarousel({
        itemsMobile: [479, 1],
        itemsTablet: [768, 2],
        itemsDesktopSmall: [979, 3],
        items: 4,
        responsiveRefreshRate: 0,
        autoHeight: true
    });
    $(".review-carousel").owlCarousel({
        itemsTablet: [768, 1],
        itemsDesktopSmall: [979, 1],
        itemsDesktop: [1199, 1],
        items: 1,
        responsiveRefreshRate: 0,
        autoHeight: true
    });
    $('.js-gallery').each(function() {
        $(this).magnificPopup({
            delegate: 'a:not(.link)',
            type: 'image',
            removalDelay: 300,
            tLoading: 'Loading image #%curr%...',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 1]
            },
            image: {
                tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                titleSrc: function(item) {
                    return item.el.attr('title') + '<small></small>';
                }
            }
        });
    });
    $('.js-play').magnificPopup({
        type: 'iframe',
        removalDelay: 300
    });
    $('#mc-form').ajaxChimp({
        url: 'http://blahblah.us1.list-manage.com/subscribe/post?u=5afsdhfuhdsiufdba6f8802&id=4djhfdsh9'
    });
    $.ajaxChimp.translations.cm = {
        'submit': 'Submitting...',
        0: '<i class="fa fa-envelope"></i> Awesome! We have sent you a confirmation email',
        1: '<i class="fa fa-exclamation-triangle"></i> Please enter a value',
        2: '<i class="fa fa-exclamation-triangle"></i> An email address must contain a single @',
        3: '<i class="fa fa-exclamation-triangle"></i> The domain portion of the email address is invalid (the portion after the @: )',
        4: '<i class="fa fa-exclamation-triangle"></i> The username portion of the email address is invalid (the portion before the @: )',
        5: '<i class="fa fa-exclamation-triangle"></i> This email address looks fake or invalid. Please enter a real email address'
    };
    if ($('.js-ajax-form').length) {
        $('.js-ajax-form').each(function() {
            $(this).validate({
                errorClass: 'error wobble-error',
                submitHandler: function(form) {
                    $.ajax({
                        type: "POST",
                        url: "mail.php",
                        data: $(form).serialize(),
                        success: function() {
                            $('.modal').modal('hide');
                            $('#success').modal('show');
                        },
                        error: function() {
                            $('.modal').modal('hide');
                            $('#error').modal('show');
                        }
                    });
                }
            });
        });
    }
})(jQuery);