$(document).ready(function () {
    $(".faq-entry p").hide();
    $(".faq-entry h4").click(function () {
        $(this).next(".faq-entry p").slideToggle(100);
    });
});