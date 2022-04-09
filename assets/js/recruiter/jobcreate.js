$(document).ready(function () {

    $('#createJobPost').submit(function (e) {
        e.preventDefault();

        var form = $(this);
        // form validation

        // clear previous errors
        $('#message').text('');

        var data = form.serialize();

        $.ajax({
            type: 'POST',
            url: '/jobs/',
            data: data,
            success: function (response) {
                $('#message').text(response.message);

                if (response.redirect) {
                    window.location.href = response.redirect;
                }
            }, error: function (error) {
                if (error.status === 400) {
                    $('#message').text(error.responseJSON.message);
                }
                else if (error.status === 403) {
                    $('#message').text(error.responseJSON.message);
                }
            }
        });
    });
});