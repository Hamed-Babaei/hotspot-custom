var $loading = $('#loader-wrapper').hide();
$(document)
    .ajaxStart(function () {
        $loading.show();
    })
    .ajaxStop(function () {
        $loading.hide();
    });
$(document).ready(function () {

    $.ajax({
        type: 'post',
        data: {ACT: 'signUpAccess', routerId: routerId},
        // url: 'http://cp.wihi.ir/core/ajax/user.php',
        url: 'http://cp.wihi.ir/core/ajax/user.php',
        success: function (result) {
            var myObj = JSON.parse(result);
            if (parseInt(myObj.access) == 0)
                window.location.replace("login.html");
            else {
                if (parseInt(myObj.nc) == 1)
                    $('#NCParent').removeClass('d-none');
                if (parseInt(myObj.bd) == 1) {
                    $('#birthDateParent').removeClass('d-none');
                    $('#birthDate').persianDatepicker({
                        initialValue: false,
                        maxDate: new persianDate().subtract('year', 7).valueOf(),
                        observer: true,
                        viewMode: 'year',
                        autoClose: true,
                        format: 'YYYY/MM/DD',
                        responsive: true,
                    });
                }


            }
        }
        , error: function (result) {
            // $('.ajax-content').html('<hr>Ajax Request Completed !')
        }

    });
// Get the input field
    var inputNC = document.getElementById("NC");

// Execute a function when the user releases a key on the keyboard
    inputNC.addEventListener("keyup", function (event) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Trigger the button element with a click
            document.getElementById("signUpButton").click();
        }
    });
    var inputM = document.getElementById("mobile");

// Execute a function when the user releases a key on the keyboard
    inputM.addEventListener("keyup", function (event) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Trigger the button element with a click
            document.getElementById("signUpButton").click();
        }
    });
    var inputBD = document.getElementById("birthDate");

// Execute a function when the user releases a key on the keyboard
    inputBD.addEventListener("keyup", function (event) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Trigger the button element with a click
            document.getElementById("signUpButton").click();
        }

    });
// Execute a function when the user releases a key on the keyboard
//     var inputOTP = document.getElementById("otpCode");inputOTP.addEventListener("keyup", function (event) { event.preventDefault(); if (event.keyCode === 13) { document.getElementById("otpButton").click();}});

    //initial Value
    var mobile = '0';
    var nc = null;
    var bd = null;

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

    //count down function
    function count_down(min, stage) {
        // Set the date we're counting down to
        //Stage 1 => SMS
        //Stage 2 => AVADEL
        var countDownDate = new Date();
        countDownDate = countDownDate.setMinutes(countDownDate.getMinutes() + min);
        var x = setInterval(function () {
            // Get todays date and time
            var now = new Date().getTime();

            // Find the distance between now an the count down date
            var distance = countDownDate - now;
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            // Output the result in an element with id="demo"
            if (stage == 1) {
                if (minutes > 0) {
                    document.getElementById("count_down").innerHTML = minutes + " دقیقه " + seconds + " ثانیه دیگر " + " تا تماس";
                } else {
                    document.getElementById("count_down").innerHTML = seconds + " ثانیه دیگر " + "تا تماس";
                }
            } else if (stage == 2) {
                if (minutes > 0) {
                    document.getElementById("count_down").innerHTML = "کد را تا " + minutes + " دقیقه و " + seconds + " ثانیه دیگر " + "وارد کنید!";
                } else {
                    document.getElementById("count_down").innerHTML = "کد را تا " + seconds + " ثانیه دیگر " + "وارد کنید!";
                }
            }


            // If the count down is over, write some text
            if (distance < 0) {
                clearInterval(x);
                if (stage == 1) {
                    document.getElementById("count_down").innerHTML = "ارسال کد از طریق تماس";
                } else if (stage == 2) {
                    document.getElementById("count_down").innerHTML = "وقت شما به اتمام رسید";
                }

                if (stage == 1) {
                    $.ajax({
                        type: 'post',
                        url: 'http://cp.wihi.ir/core/ajax/user.php',
                        data: {ACT: 'STAGE2', routerId: routerId, mobile: mobile},
                        success: function (data) {
                            // $('.login-box-body').fadeOut(1000);
                            if (parseInt(data) == 1)
                                count_down(5, 2);
                            else {
                                //      window.location.replace("/");
                            }

                            // window.location.replace("cp.wihi.ir");
                            // $('#forget-password').fadeIn(2500);

                            console.log(data);

                        },
                        error: function (data) {
                            window.location.replace("cp.wihi.ir");
                            console.log(data);
                        }
                    });
                } else if (stage == 2) {
                    $.ajax({
                        type: 'post',
                        url: 'http://cp.wihi.ir/core/ajax/user.php',
                        data: {ACT: 'clear', routerId: routerId},
                        success: function (data) {
                            // $('.login-box-body').fadeOut(1000);
                            window.location.replace("cp.wihi.ir");
                            // $('#forget-password').fadeIn(2500);

                            console.log(data);

                        },
                        error: function (data) {
                            window.location.replace("cp.wihi.ir");
                            console.log(data);
                        }
                    });
                }
            }
        }, 1000);
    };
    $('#signUpButton').on('click', function (e) {
        e.preventDefault();
        mobile = persianToEnglish($("#mobile").val());
        nc = $("#NC").val();
        if (nc)
            nc = persianToEnglish($("#NC").val());
        bd = $("#birthDate").val();

        var fullname = $("#fullname").val();
        $.ajax({
            type: 'post',
            data: {ACT: 'addUser', routerId: routerId, name: fullname, mobile: mobile, nc: nc, bd: bd},
            url: 'http://cp.wihi.ir/core/ajax/user.php',
            success: function (result) {
                var myObj = JSON.parse(result);
                if (parseInt(myObj.code) == 15) {
                    $('.login-error-box').html("ثبت نام بر روی این روتر بسته است!");
                } else if (parseInt(myObj.code) == 25) {
                    $('.login-error-box').html("وارد کردن فیلدها اجباری است!");
                } else if (parseInt(myObj.code) == 35) {
                    $('.login-error-box').html("شما قبلاً ثبت نام کرده اید!");
                } else if (parseInt(myObj.code) == 10) {
                    $('.login-error-box').addClass('d-none');
                    $('.login__form').html(myObj.html);
                    $("#response-div").html(myObj.js);
                    $("#response-div").find("script").each(function (i) {
                        eval($(this).text());
                    });
                    count_down(5, 1);
                }

                // $('#deleteModal .modal-body').find("script").each(function (i) {
                //     eval($(this).text());
                // });

            }
            , error: function (result) {
                // $('.ajax-content').html('<hr>Ajax Request Completed !')
            }

        });
    });

    $('.login__form').on('click', '#otpButton', function (e) {
        e.preventDefault();
        var token = $("#otpCode").val();
        $.ajax({
            type: 'post',
            url: 'http://cp.wihi.ir/core/ajax/user.php',
            data: {ACT: 'otpUserCheck', routerId: routerId, mobile: mobile, nc: nc, bd: bd, otp: token},
            success: function (data) {
                if (data == 45) {
                    console.log('wrong');
                    $('.login-error-box').html("کد اعتبار سنجی صحیح نمی باشد!");
                    $('.login-error-box').removeClass('d-none');
                } else if (data == 55) {
                    $('.login-error-box').html("مشکلی در ارتباط با روتر پیش آمده است لطفا مجدداً تلاش کنید!");
                    $('.login-error-box').removeClass('d-none');
                } else {
                    var myObj = JSON.parse(data);
                    $('#otp').fadeOut(1500);
                    $('.login-error-box').html("");
                    // $('#forget-password').fadeIn(2500);
                    $('.login__form').html(myObj.msg);
                    document.getElementById("usernameHOTS").value = myObj.user;
                    // document.getElementById("passwordHOTS").value = hexMD5('$(chap-id)' + myObj.pass + '$(chap-challenge)');
                    document.getElementById("passwordHOTS").value = myObj.pass ;

                }
            },
            error: function (data) {
                console.log(data);
            },
            done: function (data) {


                console.log(data);
            }

        });
    });

});