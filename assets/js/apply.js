$(document).ready(function () {

    // Get URL params
    var params = {};
    location.search.substr(1).split("&").forEach(function (item) {
        params[item.split("=")[0]] = item.split("=")[1]
    });

    // Pre-fill inputs if parameters were passed in
    if (params.e && !isNaN(params.e))
        $('#experience').val(params.e);
    if (params.t && !isNaN(params.t))
        $('#time').val(params.t);
    if (params.a && !isNaN(params.a))
        $('#availability').val(params.a);

    $('#apply').validator().on('submit', function (e) {
        if (e.isDefaultPrevented()) return;
        e.preventDefault();
    });

    // window.onbeforeunload = function() {
    //     return "Are you sure you want to navigate away?";
    // }
});