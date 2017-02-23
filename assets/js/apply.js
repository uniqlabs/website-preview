$(document).ready(function () {

    // Get URL params
    var params = {};
    location.search.substr(1).split("&").forEach(function (item) {
        params[item.split("=")[0]] = item.split("=")[1]
    });

    // Get current language
    var vals = window.location.href.split('/');
    var lang = (vals.length > 3) ? vals[3] : 'en';

    // Hook up the fields
    var fields = ['firstName', 'lastName', 'age', 'degree', 'city', 'email', 'phone', 'experience', 'timePerWeek', 'availability', 'motivation'];
    var f = {};
    fields.forEach(function (field) {
        f[field] = $('#' + field);
    });
    var applyRow = $('#applyRow');
    var alertRow = $('#alertRow');
    var applyAlert = $('#alert');
    var submitBtn = $('#apply');
    var sbHtml = submitBtn.html();

    // Pre-fill inputs if parameters were passed in
    if (params.e && !isNaN(params.e))
        f['experience'].val(params.e);
    if (params.t && !isNaN(params.t))
        f['timePerWeek'].val(params.t);
    if (params.a && !isNaN(params.a))
        f['availability'].val(params.a);

    submitBtn.validator().on('submit', function (e) {
        if (e.isDefaultPrevented()) return;
        alertRow.hide();
        var data = {};
        data.gender = $('input[name="gender"]:checked').val();
        fields.forEach(function (field) {
            data[field] = f[field].val();
        });
        e.preventDefault();
        apply(data);
    });

    // window.onbeforeunload = function() {
    //     return "Are you sure you want to navigate away?";
    // }

    // Validation and application logic
    var gender = $('input[name="gender"]:checked');

    function apply(data) {
        setBusy(true);
        var s = {type: 'POST', contentType: 'application/json'};
        s.data = data;
        s.data.type = 'coach';
        s.data.lang = lang;
        s.data[r('zntvp')] = r('tjHFzT35mzrhthupR5Ej5AEDX4QiaaTe');
        s[r('hey')] = r('uggcf://havd-fvtahc.urebxhncc.pbz/hfref');
        s.data = JSON.stringify(s.data);
        s.success = function () {
            setBusy(false);
            showAlert(true, data.firstName);
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

    function setBusy(b) {
        fields.forEach(function (field) {
            f[field].prop('disabled', b);
        });
        submitBtn.html(b ? '<i class="fa fa-spinner fa-pulse fa-lg"></i>' : sbHtml);
    }

    function showAlert(success, name) {
        applyAlert.removeClass(success ? 'alert-danger' : 'alert-success');
        applyAlert.addClass(success ? 'alert-success' : 'alert-danger');
        if (success) {
            applyAlert.html('<i class="green fa fa-check fa-lg fa-fw"></i> &nbsp;' +
                messages[lang].apply.success.replace('${NAME}', name));
            applyRow.hide();
        } else
            applyAlert.html('<i class="red fa fa-close fa-lg fa-fw"></i> &nbsp;' +
                messages[lang].apply.error.replace('${NAME}', name));
        alertRow.show();
    }

    function r(s) {
        return s.replace(/[a-zA-Z]/g, function (c) {
            return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
        });
    }
});

var messages = {
    en: {
        apply: {
            success: 'Thanks for your application, ${NAME}. We will get in touch within the next days.',
            error: 'Oops, something went wrong and your data was not sent. Please try again.'
        }
    },
    de: {
        apply: {
            success: 'Danke für Deine Bewerbung, ${NAME}. Du hörst innerhalb der nächsten Tage von uns.',
            error: 'Beim Senden ging leider etwas schief. Bitte probiere es nochmal.'
        }
    }
};