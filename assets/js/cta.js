$(document).ready(function () {

    var vals = window.location.href.split('/');
    var lang = (vals.length > 3) ? vals[3] : 'en';
    var base = '/' + lang + '/';

    // Hook up the sign up button at the bottom
    $('#toSignUp').on('click', scrollToSignUp);

    function scrollToSignUp(event) {
        event.preventDefault();
        if (!endsWith(window.location.href, base))
            window.location = base;
        else {
            return $('html, body').animate({
                scrollTop: $('.what').offset().top
            }, 300, function () {
                $('#firstName').focus();
            });
        }
    }

    function endsWith(str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }
});