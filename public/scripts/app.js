/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const data = [{
//     "user": {
//       "name": "Ahmed",
//       "avatars": "https://i.imgur.com/73hZDYK.png",
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd"
//     },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1562517999090
//   }
// ];


$(document).ready(function() {

const timeDifference = function(current, previous) {  
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

const createTweetElement = function (obj) {
  const currentDate = new Date();
  const $markup =
    $(`<article class="article">
  <img src="${obj.user.avatars}">
  <h3> ${obj.user.name} </h3>
  <h3 class="tag"> ${obj.user.handle} </h3>
  <p class="text">${obj.content.text}</p>
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
    $(".tweet").append(createTweetElement(tweet));
  }
};

const loadTweets = function() {
  return $.ajax({
    url: '/tweets/',
    type: "GET",
    success: function(data) {
      console.log(data);
      renderTweets(data);
    }
  });
};

$(function() {
  loadTweets()
  $('#form').on("submit", function(event) {
    event.preventDefault();
    const $form = $(this);
  const data = $form.serialize();
    console.log('Button clicked, performing ajax call...');
    $.ajax({
      type: 'POST',
      url: "/tweets/",
      data: data
    })
    .then(function() {
      console.log('Success: ', data);
      
    })
    .fail(function(err) {
      console.log(err)
    });
  });
});
});




// // Test / driver code (temporary). Eventually will get this from the server.
// const tweetData = {
//   "user": {
//     "name": "Newton",
//     "avatars": "https://i.imgur.com/73hZDYK.png",
//       "handle": "@SirIsaac"
//     },
//   "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//   "created_at": 1461116232227
// }
//timeDifference(currentDate, obj.created_at)
//const currentDate = new Date();

// const $tweet = createTweetElement(tweetData);

// // Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.