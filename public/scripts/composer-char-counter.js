$(document).ready(function() {
  $('.new-tweet form').on('keydown', 'textarea', function(event) {  
    const max = 140;
    let length = $(this).val().length; 
    if (length <= max) {
      $(this).parent().children('.counter').html(max - length).removeClass("red");
    } else {
      $(this).parent().children('.counter').html(max - length).addClass("red");
    }
  });

});