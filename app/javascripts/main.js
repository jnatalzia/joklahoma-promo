$(function() {
  var backgroundImage = new Image();
  backgroundImage.src = "img/oklahoma-bg.jpg";
  backgroundImage.onload = function() {
    $('.loading-modal').animate({opacity: 0}, 500, function() {
      $(this).remove();
      $('body').removeClass('loading');
    });
  }
});