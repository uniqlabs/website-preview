$(document).ready(function () {
    // Fix background cover jump on mobile (see http://stackoverflow.com/a/30200804)
    $('.full-cover').css('height', window.innerHeight + 20);

    // Get current language
    var vals = window.location.href.split('/');
    var lang = (vals.length > 3) ? vals[3] : 'en';

    // Fade in/out navbar
    var nb = $('#nav');
    var st = $(this).scrollTop();
    if (st > 160)
        nb.hide();
    else
        nb.show();
    $(window).scroll(function () {
        st = $(this).scrollTop();
        if (st > 160)
            nb.fadeOut();
        else
            nb.fadeIn();
    });

    // Close mobile menu when item is clicked
    $('.mobile-menu ul li a').on('click', function (e) {
        $('.mobile-menu input').prop('checked', false);
    });

    // Hook up the video modal
    $('.launch-modal').on('click', function (e) {
        e.preventDefault();
        $('#modal-video').modal();
        startVideo();
    });
    $('#modal-video').on('hidden.bs.modal', function () {
        stopVideo();
    });

    // Hook up the image testimonials
    const first = Math.floor(Math.random() * 4);
    $('#testimonial-images').slick({
        arrows: false,
        asNavFor: '#testimonial-statements',
        autoplay: true,
        autoplaySpeed: 12000,
        centerMode: true,
        centerPadding: '40px',
        dots: false,
        focusOnSelect: true,
        initialSlide: first,
        responsive: [
            {
                breakpoint: 512,
                settings: {
                    slidesToShow: 1
                }
            }
        ],
        slidesToShow: 3,
        slidesToScroll: 1
    });
    $('#testimonial-statements').slick({
        arrows: false,
        asNavFor: '#testimonial-images',
        dots: false,
        fade: true,
        initialSlide: first,
        slidesToShow: 1,
        slidesToScroll: 1
    });

    // // Hook up the image testis
    // for (var i = 1; i <= 4; i++) {
    //     const testi = $('#testi' + i);
    //     const icon = $('#icon' + i);
    //     $('#tile' + i).hover(function () {
    //         testi.fadeIn();
    //         icon.fadeIn();
    //     }, function () {
    //         testi.fadeOut();
    //         icon.fadeOut();
    //     });
    // }

    // Init the testimonial slider
    // $('#testimonial-slides').slick({
    //     autoplay: true,
    //     autoplaySpeed: 10000,
    //     dots: true,
    //     appendArrows: null,
    //     pauseOnDotsHover: true,
    //     fade: true,
    //     speed: 1000,
    //     initialSlide: Math.floor(Math.random() * 5)
    // });

    // Hook up the flippable cards
    $('.card').flip({
        axis: 'x',
        trigger: 'hover',
        speed: 300
    });

    // Validation and signup logic
    var fni = $('#firstName');
    var ei = $('#email');
    var sb = $('#submit');
    var sbHtml = sb.html();
    var sr = $('#signupRow');
    var fr = $('#featureRow');
    var ar = $('#alertRow');
    var sa = $('#signupAlert');

    $('#signup').validator().on('submit', function (e) {
        if (e.isDefaultPrevented()) return;
        ar.hide();
        var firstName = fni.val();
        var email = ei.val();
        e.preventDefault();
        signUp(firstName, email)
    });

    function signUp(firstName, email) {
        setBusy(true);
        var s = {type: 'POST', contentType: 'application/json'};
        s.data = {type: 'client', firstName: firstName, email: email, lang: lang};
        s.data[r('zntvp')] = r('tjHFzT35mzrhthupR5Ej5AEDX4QiaaTe');
        s[r('hey')] = r('uggcf://havd-fvtahc.urebxhncc.pbz/hfref');
        s.data = JSON.stringify(s.data);
        s.success = function () {
            setBusy(false);
            showAlert(true, firstName);
        };
        s.error = function (jqxhr, status, err) {
            if (err) {
                console.log('jqXHR: ' + JSON.stringify(jqxhr));
                console.log('Status: ' + status);
                console.log('Error: ' + err);
            }
            setBusy(false);
            showAlert(false);
        };
        $.ajax(s);
    }

    // Helpers
    function startVideo() {
        var frame = $('iframe#cover-video');
        var vidsrc = frame.attr('src');
        frame.attr('src', vidsrc.replace('autoplay=0', 'autoplay=1'));
    }

    function stopVideo() {
        var frame = $('iframe#cover-video');
        var vidsrc = frame.attr('src');
        frame.attr('src', '');
        frame.attr('src', vidsrc.replace('autoplay=1', 'autoplay=0'));
    }

    function setBusy(b) {
        fni.prop('disabled', b);
        ei.prop('disabled', b);
        sb.prop('disabled', b);
        sb.html(b ? '<i class="fa fa-spinner fa-pulse fa-lg"></i>' : sbHtml);
    }

    function showAlert(success, name) {
        sa.removeClass(success ? 'alert-danger' : 'alert-success');
        sa.addClass(success ? 'alert-success' : 'alert-danger');
        if (success) {
            sa.html('<i class="green fa fa-check fa-lg fa-fw"></i> &nbsp;' +
                messages[lang].signup.success.replace('${NAME}', name));
            sr.hide();
            fr.hide();
        } else
            sa.html('<i class="red fa fa-close fa-lg fa-fw"></i> &nbsp;' +
                messages[lang].signup.error.replace('${NAME}', name));
        ar.show();
    }

    function r(s) {
        return s.replace(/[a-zA-Z]/g, function (c) {
            return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
        });
    }
});

var messages = {
    en: {
        signup: {
            success: 'Thanks for signing up, ${NAME}. We will get in touch within the next days.',
            error: 'Oops, something went wrong and your data was not sent. Please try again.'
        }
    },
    de: {
        signup: {
            success: 'Danke für Deine Anmeldung, ${NAME}. Du hörst innerhalb der nächsten Tage von uns.',
            error: 'Beim Senden ging leider etwas schief. Bitte probiere es nochmal.'
        }
    }
};