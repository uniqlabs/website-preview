$(document).ready(function () {
    // Navbar links
    $("a[href^='#']").on('click', function (event) {
        var target;
        target = this.hash;
        event.preventDefault();
        return $('html, body').animate({
            scrollTop: $(this.hash).offset().top
        }, 300, function () {
            return window.history.pushState(null, null, target);
        });
    });
});