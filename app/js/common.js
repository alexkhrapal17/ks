$(function () {

    // Fixed header
    let mainHeader = $('.main-header'),
        secondaryNavigation = $('.cd-secondary-nav'),
        belowNavHeroContent = $('.sub-nav-hero'),
        headerHeight = mainHeader.height();

    let scrolling = false,
        previousTop = 0,
        currentTop = 0,
        scrollDelta = 10,
        scrollOffset = 150;

    mainHeader.on('click', '.nav-trigger', function (event) {
        // open primary navigation on mobile
        event.preventDefault();
        mainHeader.toggleClass('nav-open');
    });

    $(window).on('scroll', function () {
        if (!scrolling) {
            scrolling = true;
            (!window.requestAnimationFrame)
                ? setTimeout(autoHideHeader, 250)
                : requestAnimationFrame(autoHideHeader);
        }
    });

    $(window).on('resize', function () {
        headerHeight = mainHeader.height();
    });

    function autoHideHeader() {
        let currentTop = $(window).scrollTop();

        (belowNavHeroContent.length > 0)
            ? checkStickyNavigation(currentTop) // secondary navigation below intro
            : checkSimpleNavigation(currentTop);

        previousTop = currentTop;
        scrolling = false;
    }

    function checkSimpleNavigation(currentTop) {
        //there's no secondary nav or secondary nav is below primary nav
        if (previousTop - currentTop > scrollDelta) {
            //if scrolling up...
            mainHeader.removeClass('is-hidden');
        } else if (currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
            //if scrolling down...
            mainHeader.addClass('is-hidden');
            /*$('.header-search').removeClass('show');
            $('.search-mask').removeClass('show');
            $('.header-basket').removeClass('show');
            $('.basket-mask').removeClass('show');
            $('body').removeClass('o-hidden');*/
        }
    }

    function checkStickyNavigation(currentTop) {
        //secondary nav below intro section - sticky secondary nav
        let secondaryNavOffsetTop = belowNavHeroContent.offset().top - secondaryNavigation.height() - mainHeader.height();

        if (previousTop >= currentTop) {
            //if scrolling up...
            if (currentTop < secondaryNavOffsetTop) {
                //secondary nav is not fixed
                mainHeader.removeClass('is-hidden');
                secondaryNavigation.removeClass('fixed slide-up');
                belowNavHeroContent.removeClass('secondary-nav-fixed');
            } else if (previousTop - currentTop > scrollDelta) {
                //secondary nav is fixed
                mainHeader.removeClass('is-hidden');
                secondaryNavigation.removeClass('slide-up').addClass('fixed');
                belowNavHeroContent.addClass('secondary-nav-fixed');
            }

        } else {
            //if scrolling down...
            if (currentTop > secondaryNavOffsetTop + scrollOffset) {
                //hide primary nav
                mainHeader.addClass('is-hidden');
                secondaryNavigation.addClass('fixed slide-up');
                belowNavHeroContent.addClass('secondary-nav-fixed');
            } else if (currentTop > secondaryNavOffsetTop) {
                //once the secondary nav is fixed, do not hide primary nav if you haven't scrolled more than scrollOffset
                mainHeader.removeClass('is-hidden');
                secondaryNavigation.addClass('fixed').removeClass('slide-up');
                belowNavHeroContent.addClass('secondary-nav-fixed');
            }

        }
    }


    // Selects
    $('.select-lang').selectric();
    $('.select-currency').selectric();
    $('.select-category').selectric();
    $('.sort-by-select').selectric();
    $('.for-show').selectric();

    $(".js-range-slider").ionRangeSlider({
        type: "double",
        min: 0,
        max: 1000,
        from: 200,
        to: 500,
        hide_min_max: true
    });


    // Search toggle
    $('.search-toggle').on('click', function () {
        $(this).toggleClass('active');
        $('.header-search').toggleClass('show');
        $('.search-mask').toggleClass('show');
        $('.main-header').removeClass('is-hidden');

        $('.search-settings-mobile').removeClass('show');
        $('.mobile-search-options-toggle').removeClass('active');

        $('body').toggleClass('o-hidden');

        // hide basket if open
        $('.header-basket').removeClass('show');
        $('.basket-mask').removeClass('show');
        $('.basket-toggle').removeClass('active');

        // hide menu if open
        $('.main-nav').removeClass('show');
        $('.mobile-nav-toggle').removeClass('active');

        // hide categories if open
        $('.categories-toggle').removeClass('active');
        $('.header-mobile-categories').removeClass('show');
    });
    $('.close-search').on('click', function () {
        $('.header-search').removeClass('show');
        $('.search-mask').removeClass('show');
        $('.search-toggle').removeClass('active');
        $('.search-settings-mobile').removeClass('show');
        $('.mobile-search-options-toggle').removeClass('active');
        $('body').removeClass('o-hidden');
    });
    $('.search-mask').on('click', function () {
        $('.header-search').removeClass('show');
        $('.search-mask').removeClass('show');
        $('.search-toggle').removeClass('active');
        $('.search-settings-mobile').removeClass('show');
        $('.mobile-search-options-toggle').removeClass('active');
        $('body').removeClass('o-hidden');
    });
    $('.mobile-close-search').on('click', function () {
        $('.header-search').removeClass('show');
        $('.search-mask').removeClass('show');
        $('.search-toggle').removeClass('active');
        $('.search-settings-mobile ').removeClass('show');
        $('body').removeClass('o-hidden');
    });


    // Basket toggle
    $('.basket-toggle').on('click', function () {
        $(this).toggleClass('active');
        $('.header-basket').toggleClass('show');
        $('.basket-mask').toggleClass('show');
        $('body').toggleClass('o-hidden');
        $('.main-header').removeClass('is-hidden');

        // hide menu if open
        $('.main-nav').removeClass('show');
        $('.mobile-nav-toggle').removeClass('active');

        // hide categories if open
        $('.categories-toggle').removeClass('active');
        $('.header-mobile-categories').removeClass('show');

        // hide search if open
        $('.header-search').removeClass('show');
        $('.search-mask').removeClass('show');
        $('.search-toggle').removeClass('active');
    });
    $('.close-basket').on('click', function () {
        $('.header-basket').removeClass('show');
        $('.basket-mask').removeClass('show');
        $('.basket-toggle').removeClass('active');
        $('body').removeClass('o-hidden');
    });
    $('.basket-mask').on('click', function () {
        $(this).removeClass('show');
        $('.header-basket').removeClass('show');
        $('.basket-toggle').removeClass('active');
        $('body').removeClass('o-hidden');
    });


    // Search mobile
    $('.mobile-search-options-toggle').on('click', function () {
        $('.mobile-search-options-toggle').toggleClass('active');
        $('.search-settings-mobile').toggleClass('show');
    });


    // Input counter
    $('.quantity-arrow-minus').click(function () {
        let $input = $(this).parent().find('input');
        let count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
        return false;
    });
    $('.quantity-arrow-plus').click(function () {
        let $input = $(this).parent().find('input');
        $input.val(parseInt($input.val()) + 1);
        $input.change();
        return false;
    });

    // Sliders
    let heroSlider = new Swiper('.hero-slider', {
        loop: true,
        speed: 700,
        fadeEffect: {crossFade: true},
        autoplay: {
            delay: 3000,
            disableOnInteraction: true,
        },
        slidersPerView: 1,
        effect: "fade",
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

    $('.product-slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.product-slider-nav'
    });
    $('.product-slider-nav').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.product-slider-for',
        dots: false,
        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
            },
        ]
    });


    // Mobile main nav toggle
    $('.mobile-nav-toggle').on('click', function () {
        $(this).toggleClass('active');
        $('.main-nav').toggleClass('show');
        $('body').toggleClass('o-hidden');
        $('.main-header').removeClass('is-hidden');

        // hide categories if open
        $('.categories-toggle').removeClass('active');
        $('.header-mobile-categories').removeClass('show');

        // hide search if open
        $('.header-search').removeClass('show');
        $('.search-mask').removeClass('show');
        $('.search-toggle').removeClass('active');

        // hide basket if open
        $('.header-basket').removeClass('show');
        $('.basket-mask').removeClass('show');
        $('.basket-toggle').removeClass('active');
    });


    // Mobile menu show submenu
    $('.nav-item').on('click', function () {
        $(this).closest('li').find('.dropdown').addClass('show');
        $('.main-nav').addClass('o-hidden');
    });
    $('.mobile-back').on('click', function () {
        $(this).closest('li').find('.dropdown').removeClass('show');
        $('.main-nav').removeClass('o-hidden');
    });


    // Categories toggle
    $('.categories-toggle').on('click', function () {
        $(this).toggleClass('active');
        $('.header-mobile-categories').toggleClass('show');
        $('body').toggleClass('o-hidden');
        $('.main-header').removeClass('is-hidden');

        // hide search if open
        $('.header-search').removeClass('show');
        $('.search-mask').removeClass('show');
        $('.search-toggle').removeClass('active');

        // hide basket if open
        $('.header-basket').removeClass('show');
        $('.basket-mask').removeClass('show');
        $('.basket-toggle').removeClass('active');

        // hide menu if open
        $('.main-nav').removeClass('show');
        $('.mobile-nav-toggle').removeClass('active');
    });


    // Filter mobile toggle
    $('.filter-toggle').on('click', function () {
        $(this).toggleClass('active');
        $('body').toggleClass('o-hidden');
        $('.filters-wrapper').toggleClass('show');
    });


    // Toast call
    $('.call-toast').on('click', function (e) {
        e.preventDefault();
        $('.toast-message').addClass('show');
        setTimeout(function(){
            $('.toast-message').removeClass('show');
        }, 3500);
    });
});
