$(document).ready(function () {

    $('#signupForm').submit(function (e) {
        e.preventDefault();

        var form = $(this);

        // form validation
        var email = $('#email').val();
        var password = $('#password').val();
        var confirmPassword = $('#confirmPassword').val();
        var name = $('#name').val();

        if (!email || !password || !confirmPassword || !name) {
            valid = false;
            $('#notvalid').text('Please fill all the fields');
            return;
        }

        if (password !== confirmPassword) {
            $('#notvalid').text('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            $('#notvalid').text('Password must be at least 6 characters long');
            return;
        }

        var data = form.serialize();

        $.ajax({
            type: 'POST',
            url: '/auth/register',
            data: data,
            success: function (response) {
                $('#notvalid').text(response.message);

                // check status code
                if (response.statusCode === 201) {
                    // redirect to login page

                    setTimeout(function () {
                        // redirect to login page
                        top.location.href = '/login';
                    }, 1000);
                }
            },
            error: function (error) {
                if (error.status === 400) {
                    $('#notvalid').text(error.responseJSON.message);
                }
                else if (error.status === 403) {
                    $('#notvalid').text(error.responseJSON.message);
                }
            }
        });
    });
});