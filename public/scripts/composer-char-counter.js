$(document).ready(function() {
  $("#text").on('keydown', function() {
    const max = 140;
    let length = $(this).val().length; 
    if (length <= maxLength) {
      $(this).parent().children('.counter').html(max - length).removeClass("red");
    } else {
      $(this).parent().children('.counter').html(max - length).addClass("red");
    }
  });

});