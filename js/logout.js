$(document).ready(function () {
  var animating = false,
    submitPhase1 = 1100,
    submitPhase2 = 400,
    logoutPhase1 = 800,
    $login = $(".login"),
    $app = $(".app");

  function ripple(elem, e) {
    $(".ripple").remove();
    var elTop = elem.offset().top,
      elLeft = elem.offset().left,
      x = e.pageX - elLeft,
      y = e.pageY - elTop;
    var $ripple = $("<div class='ripple'></div>");
    $ripple.css({ top: y, left: x });
    elem.append($ripple);
  }

  /*  $(document).on("click", ".login__submit", function(e) {*/
  if (animating) return;
  animating = true;
  // var that = this;
  // ripple($(that), e);
  //  $(that).addClass("processing");
  setTimeout(function () {
    // $(that).addClass("success");
    setTimeout(function () {
      $app.show();
      $app.css("top");
      $app.addClass("active");
    }, submitPhase2 - 70);
    /*      setTimeout(function() {
        $login.hide();
        $login.addClass("inactive");
        animating = false;
        $(that).removeClass("success processing");
      }, submitPhase2);*/
  }, submitPhase1);
  /*});*/

  $(document).on("click", ".app__logout-btn", function (e) {
    console.log("t");
    /* if (animating) return; */
    /* $(".ripple").remove(); */
    animating = true;
    var that = this;
    $(that).addClass("clicked");
    setTimeout(function () {
      $app.removeClass("active");
    }, 2000);
    openLogin();
  });
});
