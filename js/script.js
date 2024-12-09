$(document).ready(function () {
    /* меню ***********************************/

    $(".menu_btn").click(function () {
        $(this).toggleClass("show");
        $(".menu_nav").toggleClass("show");
    });

    /* баннер ***********************************/

    var helpers = {
        addZeros: function (n) {
            return (n < 10) ? '' + n : '' + n;
        }
    };

    function sliderInit() {
        var $slider = $('.banner_slider');
        $slider.each(function () {
            var $sliderParent = $(this).parent();
            $(this).slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false,
                arrows: true,
                appendArrows: '.slider_wrap',
                prevArrow: '<span class="btn_prev"></span>',
                nextArrow: '<span class="btn_next"></span>',
                infinite: false,
                responsive: [
                    {
                        breakpoint: 767,
                        settings: {
                            adaptiveHeight: true
                        }
                    }
                ]
            });

            if ($(this).find('.slider_item').length > 1) {
                $(this).siblings('.slides_numbers').show();
            }

            $(this).on('afterChange', function (event, slick, currentSlide) {
                $sliderParent.find('.slides_numbers .active').html(helpers.addZeros(currentSlide + 1));
            });

            var sliderItemsNum = $(this).find('.slick-slide').not('.slick-cloned').length;
            $sliderParent.find('.slides_numbers .total').html(helpers.addZeros(sliderItemsNum));

        });

        $('.menu_list').slick({
            dots: false,
            arrows: true,
            infinite: true,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 4,
            responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });

    };

    sliderInit();

    /* скролл вверх ***********************************/

    const btnUp = {
        el: document.querySelector('.btn_scroll'),
        show() {
            this.el.classList.remove('hide');
        },
        hide() {
            this.el.classList.add('hide');
        },
        addEventListener() {
            window.addEventListener('scroll', () => {
                const scrollY = window.scrollY || document.documentElement.scrollTop;
                scrollY > 400 ? this.show() : this.hide();
            });
            document.querySelector('.btn_scroll').onclick = () => {
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });
            }
        }
    }

    btnUp.addEventListener();

    /* spectakl gallery ***********************************/

    $('.spectakl_gallery').slick({
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 8,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1550,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                    dots: true,
                    arrows: false,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    dots: true,
                    arrows: false,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    dots: true,
                    arrows: false,
                }
            }
        ]
    });

});

function initYandexMap() {
    if ($("#map").length > 0) {
        ymaps.ready(function () {
            var _ball_bg = './img/map.balloon.svg';
            var _ball_Offset = [-45, -70];
            var _ball_Size = [60, 90];

            var myMap = new ymaps.Map('map', {
                center: [64.531906, 40.530593],
                zoom: 16,
                controls: ["zoomControl"]
            }, {
                searchControlProvider: 'yandex#search'
            });

            var myPlacemark = {};


            myPlacemark[0] = new ymaps.Placemark([64.531906, 40.530593], {
                balloonContent: "Россия, г. Архангельск, пр-т. Троицкий, д. 5",
                hintContent: "Россия, г. Архангельск, пр-т. Троицкий, д. 5"
            }, {
                iconLayout: 'default#image',
                // Своё изображение иконки метки.
                iconImageHref: _ball_bg,
                // Размеры метки.
                iconImageSize: _ball_Size,
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                iconImageOffset: _ball_Offset
            });
            myMap.geoObjects.add(myPlacemark[0]);

        })
    }
}

function initYandexMapWaitOnHover() {
    function loadScript(url, callback) {
        var script = document.createElement("script");

        if (script.readyState) {  // IE
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" ||
                    script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {
            script.onload = function () {
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }

    var check_if_load = 0;

    function __load_yandex() {
        if (check_if_load == 0) {
            check_if_load = 1;
            loadScript("https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;loadByRequire=1", function () {
                ymaps.load(initYandexMap);
            });
        }
    }

    $('#map').on("touchstart", function () {
        __load_yandex();
    });
    $('#map').mouseenter(function () {
        __load_yandex();
    });
    $('#map').click(function () {
        __load_yandex();
    });

    $('#map').on("startanim", function () {
        __load_yandex();
    });

}

$(function () {
    initYandexMapWaitOnHover();
});

$(document).ready(function () {
    //$("#map").on("click", function (e) {
    //    $(this).toggleClass("active");
    //});

    $(document).on({
        mouseenter: function () {
            $(this).removeClass("active");
        },
        mouseleave: function () {
            $(this).addClass("active");
        }
    }, "#map");
})

$(document).ready(function () {
    if ($(window).width() < 991) {
        $('.album_teater_page_gallery').slick({
            infinite: false,
            arrows: false,
            dots: true,
            slidesToShow: 4,
            slidesToScroll: 4,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    }
                }
            ]
        });
    }
})

$(document).ready(function () {
    $('[data-fancybox="page1"]').fancybox({
        toolbar: false,
        arrows: false,
        afterLoad: function(instance, current) {
            if (instance.group.length > 1 && current.$content) {
                current.$content.append('<button class="fancybox-button fancybox-button--arrow_right next" data-fancybox-next>' + '→' + '</button>' +
                    '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left prev">' + '←' + '</button>' +
                    '<button data-fancybox-close data-fancybox-close="" class="fancybox-button fancybox-button--close close" title="Close">' + '</button>');
            }
        }

    });
})

$(document).ready(function () {
    if ($(window).width() < 1550) {
        $(".search").click(function () {
            $(this).toggleClass("show");
        });
    }
})
