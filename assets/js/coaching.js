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
});