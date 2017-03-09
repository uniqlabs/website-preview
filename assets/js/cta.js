$(document).ready(function () {

    // Get URL params
    var params = {};
    location.search.substr(1).split("&").forEach(function (item) {
        params[item.split("=")[0]] = item.split("=")[1]
    });

    // Check if params were passed in
    if (params.t && params.t == 'signup')
        scrollToSignUp();

    // Get language
    var vals = window.location.href.split('/');
    var lang = (vals.length > 3) ? vals[3] : 'en';
    var base = '/' + lang + '/';
    var isBase = (vals.length <= 5);

    // Hook up the sign up button at the bottom
    $('#toSignUp').on('click', gotoSignUp);
    $('#toApplication').on('click', scrollToApplication);

    function gotoSignUp(event) {
        event.preventDefault();
        if (!isBase)
            window.location = base + '?t=signup';
        else
            return scrollToSignUp();
    }

    function scrollToSignUp() {
        $('html, body').animate({
            scrollTop: $('.signup').offset().top
        }, 300, function () {
            $('#firstName').focus();
        });
    }

    function scrollToApplication() {
        $('html, body').animate({
            scrollTop: $('.application-box').offset().top
        }, 300, function () {
            $('#experience').focus();
        });
    }
});