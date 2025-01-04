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
            }
            else if (ch >= 1632 && ch <= 1641) // For Arabic & Unix digits.
            {
                var newChar = ch - 1584;
                newValue = newValue + String.fromCharCode(newChar);
            }
            else
                newValue = newValue + String.fromCharCode(ch);
        }
        return newValue;
    }
    // Execute a function when the user releases a key on the keyboard
    var inputOTP = document.getElementById("mobile");
    inputOTP.addEventListener("keyup", function (event) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Trigger the button element with a click
            document.getElementById("forgetButton").click();
        }
    });

    $('#forgetButton').on('click', function (e) {
        e.preventDefault();
        mobile = persianToEnglish($("#mobile").val());
        $.ajax({
            type: 'post',
            data: { ACT: 'forgetInfo', routerId: routerId, mobile: mobile },
            url: 'http://cp.wihi.ir/core/ajax/user.php',
            success: function (result) {
                if (parseInt(result) == 1) {
                    $('.login-error-box').html("<p style='color:green;'>کد تایید به موبایل داده شده ارسال شد.</p>");
                    $('#forgetButton').addClass('d-none');
                    $('#mobile').attr('disabled', true);
                    $('#otpButton').removeClass('d-none');
                    $('#otpholder').removeClass('d-none');
                } else if (parseInt(result) == -1) {
                    $('.login-error-box').html("در فرایند ارسال کد مشکلی رخ داده است.");
                }
                else if (parseInt(result) == 0) {
                    $('.login-error-box').html("این شماره یافت نشد.");
                }

            }
            , error: function (result) {
                // $('.ajax-content').html('<hr>Ajax Request Completed !')
            }

        });
    });
    $('#otpButton').on('click', function (e) {
        e.preventDefault();
        mobile = persianToEnglish($("#mobile").val());
        otp = persianToEnglish($("#otp").val());
        $.ajax({
            type: 'post',
            data: { ACT: 'checkForgetOtp', routerId: routerId, mobile: mobile, otp: otp },
            url: 'http://cp.wihi.ir/core/ajax/user.php',
            success: function (result) {
                var myObj = JSON.parse(result);
                if (parseInt(myObj.result) == 1) {
                    $('.login-error-box').html("<p style='color:green;'>کاربری مورد نظر را انتخاب نمایید</p>");
                    $('#resulthtml').html(myObj.html);
                    $('#resulthtml').removeClass('d-none');
                    $('#getdata').removeClass('d-none');
                    $('#otpButton').addClass('d-none');
                    $('#mobileholder').addClass('d-none');
                    $('#otpholder').addClass('d-none');
                } else if (parseInt(myObj.result) == 2) {
                    $('.login-error-box').html("<p style='color:green;'>اطلاعات ارسال گردید.</p>");
                    $('#otpButton').addClass('d-none');
                    $('#otpholder').addClass('d-none');
                    $('#mobileholder').addClass('d-none');
                }
                else if (parseInt(myObj.result) == 0) {
                    $('.login-error-box').html("کد اشتباه می باشد.");
                }

            }
            , error: function (result) {
                // $('.ajax-content').html('<hr>Ajax Request Completed !')
            }

        });
    });
    $('#getdata').on('click', function (e) {
        e.preventDefault();
        username = $("#users").val();
        console.log(username);
        $.ajax({
            type: 'post',
            data: { ACT: 'getForgetData', routerId: routerId, username: username },
            url: 'http://cp.wihi.ir/core/ajax/user.php',
            success: function (result) {
                var myObj = JSON.parse(result);
                if (parseInt(myObj.result) == 1) {
                    $('.login-error-box').html("<p style='color:green;'>اطلاعات ارسال گردید.</p>");
                    $('#resulthtml').addClass('d-none');
                    $('#getdata').addClass('d-none');
                }
                else if (parseInt(myObj.result) == 0) {
                    $('.login-error-box').html("در فرایند ارسال مشکلی رخ داده است.");
                }

            }
            , error: function (result) {
                // $('.ajax-content').html('<hr>Ajax Request Completed !')
            }

        });
    });
});