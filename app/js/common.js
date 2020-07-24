$(function() {

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
            $('.header-search').removeClass('show');
            $('.search-mask').removeClass('show');
            $('.header-basket').removeClass('show');
            $('.basket-mask').removeClass('show');
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


    // Search toggle
    $('.search-toggle').on('click', function () {
        $('.header-search').addClass('show');
        $('.search-mask').addClass('show');
    });
    $('.close-search').on('click', function () {
        $('.header-search').removeClass('show');
        $('.search-mask').removeClass('show');
    });
    $('.search-mask').on('click', function () {
        $('.header-search').removeClass('show');
        $('.search-mask').removeClass('show');
    });


    // Basket toggle
    $('.basket-toggle').on('click', function () {
        $('.header-basket').addClass('show');
        $('.basket-mask').addClass('show');
    });
    $('.close-basket').on('click', function () {
        $('.header-basket').removeClass('show');
        $('.basket-mask').removeClass('show');
    });
    $('.basket-mask').on('click', function () {
        $(this).removeClass('show');
        $('.header-basket').removeClass('show');
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
});
