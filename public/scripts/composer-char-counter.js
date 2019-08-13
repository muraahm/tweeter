$(document).ready(function() {
  $('.new-tweet form').on('keydown', 'textarea', function(event) {
  const count = $(this).parent().find('.counter');
  const counter = 140 - $(this).val().length;
  count.html(counter);
    if(counter >= 0) {
      $(count).css('color', 'black');
       } else {
         $(count).css('color', 'red');
      }
  })
 });