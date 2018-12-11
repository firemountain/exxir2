window.linkClick = false;
$(window).on('load', function () {

    $("a").on("click", function () {
        window.linkClick = true;

    });

    //'use strict';

//    var support = {
         //            animations: Modernizr.cssanimations
         //        },
         //        animEndEventNames = {
         //            'WebkitAnimation': 'webkitAnimationEnd',
         //            'OAnimation': 'oAnimationEnd',
         //            'msAnimation': 'MSAnimationEnd',
         //            'animation': 'animationend'
         //        },
         //        animEndEventName = animEndEventNames[Modernizr.prefixed('animation')],
         //        onEndAnimation = function (el, callback) {
         //            var onEndCallbackFn = function (ev) {
         //                if (support.animations) {
         //                    if (ev.target != this) return;
         //                    this.removeEventListener(animEndEventName, onEndCallbackFn);
         //                }
         //                if (callback && typeof callback === 'function') {
         //                    callback.call();
         //                }
         //            };
         //            if (support.animations) {
         //                el.addEventListener(animEndEventName, onEndCallbackFn);
         //            } else {
         //                onEndCallbackFn();
         //            }
         //        };

    // from http://www.sberry.me/articles/javascript-event-throttling-debouncing
    function throttle(fn, delay) {
        var allowSample = true;

        return function (e) {
            if (allowSample) {
                allowSample = false;
                setTimeout(function () {
                    allowSample = true;
                }, delay);
                fn(e);
            }
        };
    }

    // sliders - flickity
    var sliders = [].slice.call(document.querySelectorAll('.slider')),
        // array where the flickity instances are going to be stored
        flkties = [],
        // grid element
        grid = document.querySelector('.grid'),
        // isotope instance
        iso,
        // filter ctrls
        filterCtrls = [].slice.call(document.querySelectorAll('.filter > button')),
        // cart
        cart = $('.cart'),
        cartItems = cart.find('.cart__count');
   
    var Shuffle = window.Shuffle;
    var myShuffle = window.myShuffle;


    function init() {
        // preload images

      

        //        imagesLoaded(grid, function () {
        //            //            initFlickity();
                    initIsotope();
                    initEvents();
                    $(".grid").removeClass('grid--loading');
        //            iso.layout();
        //            
                    $(document).on("relayGrid",function(){
                    myShuffle.layout();
                        
                    });
        //        });
    }


    function initIsotope() {
        myShuffle = new Shuffle(document.querySelector('.grid'), {
            itemSelector: '.grid__item',
            sizer: '.grid__sizer',
            buffer: 1,
        });

        var filter;
        if (window.location.hash.substr(1) != "") {
            filter = window.location.hash.substr(1);
            if (filter == "all") {
              myShuffle.filter();
            } else {
                myShuffle.filter(filter);
            }
            
        }

    }

    function initEvents() {

        $(".work-grid a").on("click", function (e) {

            var filter = $(this).data('filter');

            var str = location.pathname;
            var n = str.lastIndexOf('/');
            var result = str.substring(n + 1);
            var fileName = result;

            if (fileName.replace("/", "") != "index.html") {
                return;
            }

            if (filter == "all") {
                myShuffle.filter();
            } else {

                myShuffle.filter(filter);
            }
//            alert();
//            e.preventDefault();
        });

        $(window).resize(function() {
            myShuffle.layout();
        });
        window.addEventListener('orientationchange', function() {
            setTimeout(function() {
                myShuffle.layout();

            }, 1000)
        });
    }



    try {
        init();

    } catch (ex) {
        console.log(ex);
    }
    //    recalcFlickities();


    
    $(".mobile-menu-c li:first-child a").click(function(e){
        window.location.href = $(this).attr("href");
//        $("#st-container").removeClass("st-menu-open")
        window.location.reload();
        e.preventDefault();
    });
});
