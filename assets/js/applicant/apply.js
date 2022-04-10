$(document).ready(function () {

    $('.apply').click(function (e) {
        e.preventDefault();

        var index = $(this).data('index');
        var buttonId = 'input[name=jobId-' + index + ']';

        var jobId = $(buttonId).val();
        var url = '/application/' + jobId;

        var resId = '#serverResponse' + index;

        console.log(index);
        console.log(url);

        $.ajax({
            url: url,
            type: 'POST',
            success: function (response) {
                $(resId).text(response.message);

                if (response.redirect) {
                    window.location.href = response.redirect;
                }
            }
        });
    });
});