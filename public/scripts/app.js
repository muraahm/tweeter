/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


/*time stamp with help from stackoverflow*/
$(document).ready(function () {

  const timeDifference = function (current, previous) {
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;

    const elapsed = current - previous;
    let plural = 's';

    if (elapsed < msPerMinute) {
      const seconds = Math.round(elapsed / 1000);
      if (seconds === 1) plural = '';
      return seconds + ' second' + plural + ' ago';
    } else if (elapsed < msPerHour) {
      const minutes = Math.round(elapsed / msPerMinute);
      if (minutes === 1) plural = '';
      return minutes + ' minute' + plural + ' ago';
    } else if (elapsed < msPerDay) {
      const hours = Math.round(elapsed / msPerHour);
      if (hours === 1) plural = '';
      return hours + ' hour' + plural + ' ago';
    } else if (elapsed < msPerMonth) {
      const days = Math.round(elapsed / msPerDay);
      if (days === 1) plural = '';
      return days + ' day' + plural + ' ago';
    } else if (elapsed < msPerYear) {
      const months = Math.round(elapsed / msPerMonth);
      if (months === 1) plural = '';
      return months + ' month' + plural + ' ago';
    } else {
      const years = Math.round(elapsed / msPerYear);
      if (years === 1) plural = '';
      return years + ' year' + plural + ' ago';
    }
  };

  const escape = function (str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  const createTweetElement = function (obj) {
    const currentDate = new Date();
    const text = escape(obj.content.text);
    const $markup =
      $(`<article class="article">
  <img src="${obj.user.avatars}">
  <h3> ${obj.user.name} </h3>
  <h3 class="tag"> ${obj.user.handle} </h3>
  <p class="text">${text}</p>
    <footer class="footer"> ${timeDifference(currentDate, obj.created_at)}
      <div class="btm-icon"> <a href="#"><i class="fas fa-flag"></i></a> <a href="#"><i class="fas fa-retweet"></i></a> <a href="#"><i class="fas fa-heart"></i></a> </div>
    </footer>
</article>`); 
    return $markup;
  };


  const renderTweets = function (tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (const tweet of tweets) {
      $(".tweet").prepend(createTweetElement(tweet)); //reverse sort order
    }
  };

  const loadTweets = function () {
    return $.ajax({
      url: '/tweets/',
      type: "GET",
      success: function (data) {
        $(".tweet").empty();
        renderTweets(data);
      }
    });
  };

  loadTweets()


  $(function () {
    $('#form').on("submit", function (event) {
      event.preventDefault(); // avoid to execute the actual submit of the form.
      const $form = $(this);
      const data = $form.serialize();
      const tweetMsg = data.substring(5)
      if (!tweetMsg) {
        $(".err").slideDown();
        $(".err span").text("Tweet box can't be empty.");
      } else if (tweetMsg.length > 140) {
        $(".err").slideDown();
        $(".err span").text("You've reached the max char.");
      } else {
        $(".err").slideUp();
        $.ajax({
            type: 'POST',
            url: "/tweets/",
            data: data
          })
          .then(function () {
            loadTweets()  // reload all tweets
            $('#tweetMsg').val('').trigger('input')// clear form after submition
            $(".counter").html(140);
             

          })
          .fail(function (err) {//request fail catch
            console.log(err)
          });
      }
    });

  });
});


$(".new-tweet").hide();
  $("#arrow-nav").on("click", function() {
    $(".new-tweet").slideToggle("complete", function() {
      $(".new-tweet").focus();
      $(".msg").focus();
    });
  });