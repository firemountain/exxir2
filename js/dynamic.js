(function ($) {

    $.fn.unveil = function (threshold, callback) {

        var $w = $(window),
            th = threshold || 0,
            retina = window.devicePixelRatio > 1,
            attrib = retina ? "data-src-retina" : "data-src",
            images = this,
            loaded;

        this.one("unveil", function () {
            var source = this.getAttribute(attrib);
            source = source || this.getAttribute("data-src");
            if (source) {
                this.setAttribute("src", source);
                if (typeof callback === "function") callback.call(this);
            }
        });

        function unveil() {
            var inview = images.filter(function () {
                var $e = $(this);
                if ($e.is(":hidden")) return;

                var wt = $w.scrollTop(),
                    wb = wt + $w.height(),
                    et = $e.offset().top,
                    eb = et + $e.height();

                return eb >= wt - th && et <= wb + th;
            });

            loaded = inview.trigger("unveil");
            images = images.not(loaded);
        }

        $w.on("scroll.unveil resize.unveil lookup.unveil", unveil);

        unveil();

        return this;

    };

})(window.jQuery || window.Zepto);


$(window).on("load", function () {
    window.linkfilter = false;
    $("img,video").unveil(200, function () {
        $(this).load(function () {
            //            myShuffle.layout();
            $(document).trigger("relayGrid");
        });
    });
    var cookieValue = parseInt($.cookie("intro"));
    //    console.log(cookieValue);
    if (isNaN(cookieValue)) {

        $.cookie("intro", 1, {
            expires: 30,
            path: '/'
        });
        $(".ctn-intro").css("opacity", 1);
        $(".ctn-intro").css("display", "block");
    } else if (cookieValue > 2) {
        //        $(".grid").css("margin-top", "100px")
        $(".ctn-intro").css("display", "none");
        $(".ctn-intro").html("");

    } else {
        $.removeCookie('intro');

        $.cookie("intro", (cookieValue + 1), {
            expires: 30,
            path: '/'
        });
        $(".ctn-intro").css("opacity", 1);
    }

    var videos = document.getElementsByTagName("video");
    for (var i = 0, len = videos.length; i < len; i++) {

        videos[i].addEventListener("loadeddata", function (e, a) {
            //            console.log(e.target);
            e.target.play();
            $(document).trigger("relayGrid");
        })
    }

    $('.main-navigation').hover(
        function () {
            $(this).addClass("hover");
            //            $(this).height("200px");
        },
        function () {
            $(this).removeClass("hover");
            //        $(this).height("auto");
            //            alert();

        }
    );

    $("ul.menu").hover(function () {
        //        alert();
        $('ul.menu').removeClass("transition-closed");
    }, function () {

    });
    $(window).scroll(function () {

        //        console.log($(".home-scroll-down").position().top + "  " + $('html').scrollTop());

        if ($('html').scrollTop() > 300) {
            //            $(".projects-ctn .icon").animate({opacity:1},500);
            if (!$(".projects-ctn .icon").hasClass("ishow")) {
                $(".projects-ctn .icon").addClass("ishow").removeClass("ihide");
            }

        } else {
            //            $(".projects-ctn .icon").animate({opacity:0},500);
            if (!$(".projects-ctn .icon").hasClass("ihide")) {
                $(".projects-ctn .icon").addClass("ihide").removeClass("ishow");
            }
        }

        if ($('html').scrollTop() < 50) {
            $('ul.menu').removeClass("transition-closed");
        } else {
            if (!$('.main-navigation').hasClass("hover")) {
                if (!$('ul.menu').hasClass("transition-closed")) {
                    $('ul.menu').addClass("transition-closed");
                }
            }
        }
    });

    $(".js-anim").addClass("grow");

    // Handle Dynamic page load

    $(".projects-ctn .icon").click(function (e) {

        e.preventDefault();
        window.linkClick = false;

        var anchor = $(this).attr("href");

        var $d = $("<div>");

        var dpage = $d.load($(this).attr("href") + " #dpage-wrap", function (html) {

            $("#dpage-wrap .js-anim").addClass("shrink");

            $("#dpage-wrap").html($d.html());

            setTimeout(function () {
                $("#dpage-wrap .js-anim").addClass("grow");
                //alert()
                //document.getElementsByTagName('title')[0].innerHTML = 'bar';
                window.history.pushState({}, $(html).filter('title').text(), anchor);
                salvattoreInit();
                $('html, body').animate({
                    scrollTop: 0
                }, 300);


            }, 200);



        });


    });
    $(".project-link").click(function (e) {

        e.preventDefault();
        window.linkClick = false;
        var anchor = $(this).attr("href");

        var $d = $("<div>");

        var dpage = $d.load($(this).attr("href") + " #dpage-wrap", function (html) {

            $("#dpage-wrap .js-anim").addClass("shrink");

            $("#dpage-wrap").html($d.html());
            salvattoreInit();
            setTimeout(function () {
                $("#dpage-wrap .js-anim").addClass("grow");
                //alert()
                //document.getElementsByTagName('title')[0].innerHTML = 'bar';
                window.history.pushState({}, $(html).filter('title').text(), anchor);


                $('html, body').animate({
                    scrollTop: 0
                }, 300);



            }, 200);



        });


    });
    $(".main-navigation .menu a").click(function (e) {

        if ($(this).data("anchor")) {
            e.preventDefault();
            window.linkClick = false;
            //            var fileName = location.pathname;
            var anchor = $(this).attr("href");
            var aId = $(this).data("anchor");

            var str = location.pathname;
            var n = str.lastIndexOf('/');
            var result = str.substring(n + 1);
            var fileName = result;

            if (fileName.replace("/", "") == anchor.replace("#" + $(this).data("anchor"), "")) {

                $('html, body').animate({
                    scrollTop: $("#" + aId).offset().top
                }, 300);
                return;
            }

            var $d = $("<div>");

            var dpage = $d.load($(this).attr("href") + " #dpage-wrap", function (html) {

                $("#dpage-wrap .js-anim").addClass("shrink");

                $("#dpage-wrap").html($d.html());

                setTimeout(function () {
                    $("#dpage-wrap .js-anim").addClass("grow");
                    //alert()
                    //document.getElementsByTagName('title')[0].innerHTML = 'bar';
                    window.history.pushState({}, $(html).filter('title').text(), anchor);

                    if (aId != "#") {
                        var a = $("#" + aId).offset().top;

                        var str = location.pathname;
                        var n = str.lastIndexOf('/');
                        var result = str.substring(n + 1);
                        var fileName = result;
                        if (fileName.replace("/", "") == "contact.html") {
                            a = (a - 215);

                        }

                        $('html, body').animate({
                            scrollTop: a
                        }, 300);
                    }
                }, 200);



            });

        } 
        else if ($(this).data("main")) {

            var anchor = $(this).attr("href");
            if (anchor.replace("/", "") == "index.html") {
                return;
            }

            e.preventDefault();
            window.linkClick = false;
            var $d = $("<div>");
            var dpage = $d.load(anchor + " #dpage-wrap", function (html, status) {

                $("#dpage-wrap .js-anim").addClass("shrink");
                $("#dpage-wrap").html($d.html());

                setTimeout(function () {
                    $("#dpage-wrap .js-anim").addClass("grow");

                    window.history.pushState({}, $(html).filter('title').text(), anchor);
                    var str = location.pathname;
                    var n = str.lastIndexOf('/');
                    var result = str.substring(n + 1);
                    var fileName = result;
                    //                    var fileName = location.pathname;

                }, 200);

            });
        } 
        else if ($(this).data("filter")) {
            //                        alert();

            var $d = $("<div>");
            var filter = $(this).data("filter");

            var anchor = $(this).attr("href");

            //            var fileName = location.pathname;


            var str = location.pathname;
            var n = str.lastIndexOf('/');
            var result = str.substring(n + 1);
            var fileName = result;

            if (fileName.replace("/", "") == "index.html") {
                //                alert(fileName);
                return;

            } else {
                //                e.preventDefault();
                //                alert();
                return;
            }




            var dpage = $d.load("index.html #dpage-wrap", function (html) {

                $("#dpage-wrap .js-anim").addClass("shrink");

                $("#dpage-wrap").html($d.html());

                //                var grid = document.querySelector('.grid');
                //                var iso = new Isotope(grid, {
                //                    isResizeBound: true,
                //                    itemSelector: '.grid__item',
                //                    percentPosition: true,
                //                    masonry: {
                //                        columnWidth: '.grid__sizer',
                //                    },
                //                    transitionDuration: '0.4s'
                //                });
                classie.remove(grid, 'grid--loading');

                myShuffle = new Shuffle(document.querySelector('.grid'), {
                    itemSelector: '.grid__item',
                    sizer: '.grid__sizer',
                    buffer: 1,
                });
                $(document).on("relayGrid", function () {

                    myShuffle.layout();
                });

                setTimeout(function () {
                    $("#dpage-wrap .js-anim").addClass("grow");

                    window.history.pushState({}, $(html).filter('title').text(), anchor);

                    if (filter == "all") {
                        myShuffle.filter();
                    } else {
                        myShuffle.filter(filter);
                    }

                }, 600);



            });
        }
    });
    $(window).on("popstate", function (e) {
        if (window.linkClick == true) {

            console.log("heee");
            window.linkClick = false;
        } else {
            changeState();
            window.linkClick = false;
            console.log("sss");
        }
    });

    function changeState() {

        var str = location.pathname;
        var n = str.lastIndexOf('/');
        var result = str.substring(n + 1);
        var fileName = result;

        var $d = $("<div>");
        
        if (fileName.replace("/", "") == "index.html") {



            var dpage = $d.load("index.html #dpage-wrap", function (html) {

                $("#dpage-wrap .js-anim").addClass("shrink");

                $("#dpage-wrap").html($d.html());

                var grid = document.querySelector('.grid');
                var Shuffle = window.Shuffle;
                var myShuffle = window.myShuffle;
                
                myShuffle = new Shuffle(document.querySelector('.grid'), {
                    itemSelector: '.grid__item',
                    sizer: '.grid__sizer',
                    buffer: 1,
                });
                $(".grid").removeClass('grid--loading');

                $(document).on("relayGrid", function () {
                    myShuffle.layout();

                });


                window.linkfilter = true;


                $(".work-grid a").on("click", function (e) {

                    //            var fileName = location.pathname;
                    var filter = $(this).data('filter');
                    if (filter == "all") {
                        myShuffle.filter();
                    } else {
                        myShuffle.filter(filter);
                    }

                    //
                    //                    if (filter == "all") {
                    //                        iso.arrange({
                    //                            filter: "*"
                    //                        });
                    //                    } else {
                    //                        iso.arrange({
                    //                            filter: "." + filter
                    //                        });
                    //                    }
                    //                    //                recalcFlickities();
                    //                    iso.layout();
                });



                setTimeout(function () {
                    $("#dpage-wrap .js-anim").addClass("grow");

                    $("#dpage-wrap").find("img").unveil(0, function () {

                        $(this).load(function () {
                            $(document).trigger("relayGrid");

                        });
                    });
                    $("#dpage-wrap").find("video").unveil(0, function () {
                        $(this).load(function () {
                            $(document).trigger("relayGrid");

                        });
                    });

                    var filter;
                    if (window.location.hash.substr(1) != "") {
                        filter = window.location.hash.substr(1);
                        //                        if (filter == "all") {
                        //                            iso.arrange({
                        //                                filter: "*"
                        //                            });
                        //                        } else {
                        //
                        //
                        //                            iso.arrange({
                        //                                filter: "." + filter
                        //                            });
                        //                        }
                        //                        iso.layout();

                        if (filter == "all") {
                            myShuffle.filter();
                        } else {
                            myShuffle.filter(filter);
                        }

                    }


                    var videos = document.getElementsByTagName("video");
                    for (var i = 0, len = videos.length; i < len; i++) {

                        videos[i].addEventListener("loadeddata", function (e, a) {
                            //            console.log(e.target);
                            e.target.play();
                            $(document).trigger("relayGrid");
                        })
                    }


                }, 600);



            });



        } 
        else {


            var dpage = $d.load(fileName + " #dpage-wrap", function (html) {

                $("#dpage-wrap .js-anim").addClass("shrink");

                $("#dpage-wrap").html($d.html());




                setTimeout(function () {
                    $("#dpage-wrap .js-anim").addClass("grow");
                    var aId = location.hash;
                    if (aId != "") {
                        $('html, body').animate({
                            scrollTop: $(aId).offset().top
                        }, 300);
                    }

                }, 600);



            });

        }




    }

});
