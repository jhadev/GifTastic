var query = ["Cartman", "Professor Chaos", "Butters", "Towelie"];

function displayGifs() {

  var query = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    query + "&api_key=2mmLDVISGro0r8Qj1O5UV6rCnfAP0agk&limit=10";

  $.ajax({
      url: queryURL,
      method: "GET"
    })

    .then(function (response) {
      console.log(response)
      console.log(queryURL)

      var results = response.data;

      for (var i = 0; i < results.length; i++) {

        var gifDiv = $("<div class='gif'>");

        var rating = results[i].rating;

        var pOne = $("<p>").text("Rating: " + rating);

        gifDiv.append(pOne);

        var gif = $("<img>");


        gif.attr("src", results[i].images.original.url);
        gif.attr("data-still", results[i].images.original_still.url);
        gif.attr("data-animate", results[i].images.original.url);
        gif.attr("data-state", "still");
        gif.attr("class", "gif");


        gifDiv.append(gif);



        $("#query-view").prepend(gifDiv);

      }
    })
};

function renderButtons() {


  $("#buttons-view").empty();

  // Looping through the array of query
  for (var i = 0; i < query.length; i++) {

    var button = $("<button>");

    button.addClass("gif-btn");
    button.addClass("btn btn-dark")

    button.attr("data-name", query[i]);

    button.text(query[i]);

    $("#buttons-view").append(button);
  }

}

function imageChangeState() {

  var state = $(this).attr("data-state");
  var animateImage = $(this).attr("data-animate");
  var stillImage = $(this).attr("data-still");

  if (state == "still") {
    $(this).attr("src", animateImage);
    $(this).attr("data-state", "animate");
  } else if (state == "animate") {
    $(this).attr("src", stillImage);
    $(this).attr("data-state", "still");
  }
}

$("#add-gif").on("click", function (event) {
  event.preventDefault();

  var gifInput = $("#gif-input").val().trim();


  query.push(gifInput);

  renderButtons();
});

var jumboHeight = $('.jumbotron').outerHeight();

function parallax() {
  var scrolled = $(window).scrollTop();
  $('.bg').css('height', (jumboHeight - scrolled) + 'px');
}

$(window).scroll(function (e) {
  parallax();
});

//event listener
$(document).on("click", ".gif-btn", "#submit", displayGifs);
$(document).on("click", ".gif", imageChangeState);

renderButtons();
imageChangeState();
parallax();