$(document).ready(function () {

    $('#updateProfile').submit(function (e) {
        var form = $(this);

        $.ajax({
            url: '/recruiter/',
            type: form.attr('method'),
            data: form.serialize(),
            success: function (response) {

                console.log(response);
                if (response.redirect) {
                    window.location.href = response.redirect;
                }
            }
        })

    });

});