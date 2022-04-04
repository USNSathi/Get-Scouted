$(document).ready(function () {
    $('#loginForm').submit(function (e) {
        var form = $(this);

        var email = $('#email').val();
        var password = $('#password').val();

        if (email == '' || password == '') {
            $('#message').text('Please fill all fields');
            return;
        }

        $.ajax({
            url: form.attr('action'),
            type: form.attr('method'),
            data: form.serialize(),
            success: function (response) {

                console.log(response);
                if (response.success) {
                    window.location.href = response.redirect;
                } else {
                    $('#message').text(response.message);
                }
            }
        })

    });
});