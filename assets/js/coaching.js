$(document).ready(function () {
    // Fix background cover jump on mobile (see http://stackoverflow.com/a/30200804)
    $('.coaching-cover').css('height', window.innerHeight + 20);

    var nb = $('#nav');
    var st = $(this).scrollTop();
    if (st > 50)
        nb.hide();
    else
        nb.show();
    $(window).scroll(function () {
        var st = $(this).scrollTop();
        if (st > 50)
            nb.fadeOut();
        else
            nb.fadeIn();
    });

    // Get language
    var vals = window.location.href.split('/');
    var lang = (vals.length > 3) ? vals[3] : 'en';
    var applyPage = {de: 'bewerben', en: 'apply'};

    $('#start').on('submit', function (e) {
        if (e.isDefaultPrevented()) return;
        var av = $('#availability').val();
        var tv = $('#time').val();
        var ev = $('#experience').val();
        e.preventDefault();
        window.location = window.location.href.split('?')[0] + applyPage[lang] + '/?e=' + ev + '&t=' + tv + '&a=' + av;
    });

    // Init the testimonial slider
    $('#testimonial-slides').slick({
        autoplay: true,
        autoplaySpeed: 12000,
        dots: true,
        appendArrows: null,
        pauseOnDotsHover: true,
        fade: true,
        speed: 1000,
        initialSlide: Math.floor(Math.random() * 3)
    });
});