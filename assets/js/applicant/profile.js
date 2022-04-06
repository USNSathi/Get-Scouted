$(document).ready(function () {

    $('#editProfileForm').submit(function (e) {
        var form = $(this);

        $.ajax({
            url: '/applicant/',
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