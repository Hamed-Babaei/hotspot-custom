var $loading = $('#loader-wrapper').hide();
$(document)
    .ajaxStart(function () {
        $loading.show();
    })
    .ajaxStop(function () {
        $loading.hide();
    });
$(document).ready(function () {
    var mobile = '0';
    //convert Number
    function persianToEnglish(value) {
        var newValue = "";
        for (var i = 0; i < value.length; i++) {
            var ch = value.charCodeAt(i);
            if (ch >= 1776 && ch <= 1785) // For Persian digits.
            {
                var newChar = ch - 1728;
                newValue = newValue + String.fromCharCode(newChar);
            } else if (ch >= 1632 && ch <= 1641) // For Arabic & Unix digits.
            {
                var newChar = ch - 1584;
                newValue = newValue + String.fromCharCode(newChar);
            } else
                newValue = newValue + String.fromCharCode(ch);
        }
        return newValue;
    }

// Execute a function when the user releases a key on the keyboard
    var input = document.getElementById("password");
    input.addEventListener("keyup", function (event) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Trigger the button element with a click
            document.getElementById("changePassButton").click();
        }
    });

    $('#changePassButton').on('click', function (e) {
        e.preventDefault();
        var user = $("#usernmae").val();
        var pass = persianToEnglish($("#password").val());
        if (pass.length == 0) {
            $('.login-error-box').html("لطفاً کلمه عبور را وارد کنید.");
        } else {
            // console.log(pass);
            $.ajax({
                type: 'post',
                data: {ACT: 'changePass', routerId: routerId, username: user, newPass: pass},
                url: 'http://cp.wihi.ir/core/ajax/user.php',
                // url: 'http://itm.local/core/ajax/user.php',
                success: function (result) {
                    if (parseInt(result) == 1) {
                        $('.login-error-box').html("کلمه عبور با موفقیت تغییر یافت.");
                        $('#changePassButton').addClass('d-none');
                        $('#back').removeClass('d-none');
                    } else if (parseInt(result) == 0) {
                        $('.login-error-box').html("مشکلی در تغییر کلمه عبور پیش آمده است.");
                    } else if (parseInt(result) == -1) {
                        $('.login-error-box').html("پرکردن فیلدها اجباری است.");
                    }

                }
                , error: function (result) {
                    // $('.ajax-content').html('<hr>Ajax Request Completed !')
                }

            });
        }

    });

});