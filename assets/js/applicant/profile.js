$(document).ready(function () {

    $('#editProfileForm').submit(function (e) {

        // form validation

        // clear previous errors
        $('#message').text('');

        var form = $(this);

        var name = $('input[name=name').val();
        var email = $('input[name=email').val();
        var phone = $('input[name=phone').val();
        var address = $('input[name=address').val();
        var birthday = $('input[name=birthday').val();
        var education = $('input[name=education').val();
        var skills = $('input[name=skills').val();
        var currentCompany = $('input[name=currentCompany').val();
        var currentPosition = $('input[name=currentPosition').val();
        var cv = $('input[name=cv').val();
        var status = $('input[name=status').val();
        var country = $('input[name=country').val();
        var region = $('input[name=region').val();

        if (name == '' || email == '' || phone == '' || address == '' || birthday == '' || education == '' || skills == '' || cv == '' || status == '' || country == '' || region == '') {
            e.preventDefault();

            $('#message').text('Please fill all fields');
            return;
        }


        $.ajax({
            url: '/applicant/',
            type: form.attr('method'),
            data: form.serialize(),
            success: function (response) {

                if (response.redirect) {
                    window.location.href = response.redirect;
                }
            }
        })
    });
});