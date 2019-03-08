const query = [
  "Cartman",
  "Professor Chaos",
  "Butters",
  "Towelie",
  "Walter White",
  "Saul Goodman"
];

function displayGifs() {
  const query = $(this).attr("data-name");
  const queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    query +
    "&api_key=2mmLDVISGro0r8Qj1O5UV6rCnfAP0agk&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    const results = response.data;

    for (let i = 0; i < results.length; i++) {
      const gifDiv = $("<div class='gif'>");
      const rating = results[i].rating;
      const pOne = $("<p>").text("Rating: " + rating);
      gifDiv.append(pOne);
      const gif = $("<img>");
      const url = results[i].bitly_gif_url;
      const a = $("<a>").html(url);
      a.attr("href", url).attr("target", "_blank");
      gifDiv.append(a);
      gif.attr("src", results[i].images.original.url);
      gif.attr("data-still", results[i].images.original_still.url);
      gif.attr("data-animate", results[i].images.original.url);
      gif.attr("data-state", "still");
      gif.attr("class", "gif");
      gifDiv.append(gif);
      $("#query-view").prepend(gifDiv);
    }
  });
}

function renderButtons() {
  $("#buttons-view").empty();
  for (let i = 0; i < query.length; i++) {
    const button = $("<button>");
    button.addClass("gif-btn btn btn-dark");
    button.attr("data-name", query[i]);
    button.text(query[i]);
    $("#buttons-view").append(button);
  }
}

function imageChangeState() {
  const state = $(this).attr("data-state");
  const animateImage = $(this).attr("data-animate");
  const stillImage = $(this).attr("data-still");

  if (state == "still") {
    $(this).attr("src", animateImage);
    $(this).attr("data-state", "animate");
  } else if (state == "animate") {
    $(this).attr("src", stillImage);
    $(this).attr("data-state", "still");
  }
}

function handleErrors() {
  $("#gif-input").val("");
  const alertDiv = $("<div>");
  alertDiv
    .addClass("mt-2 alert alert-danger")
    .attr("role", "alert")
    .attr("data-dismiss", "alert")
    .text(`Please input a valid search. Click to dismiss.`);
  $("#gif-input").after(alertDiv);
}

$("#add-gif").on("click", function(event) {
  event.preventDefault();
  $(".alert").alert("close");
  const gifInput = $("#gif-input")
    .val()
    .trim();
  if (gifInput !== "") {
    query.push(gifInput);
    $("#gif-form").val("");
    renderButtons();
  } else {
    handleErrors();
  }
});

//tried background image with parallax scrolling but ditched it
const jumboHeight = $(".jumbotron").outerHeight();

function parallax() {
  const scrolled = $(window).scrollTop();
  $(".bg").css("height", jumboHeight - scrolled + "px");
}

$(window).scroll(function(e) {
  parallax();
});

//event listener
$(document).on("click", ".gif-btn", "#submit", displayGifs);
$(document).on("click", ".gif", imageChangeState);

renderButtons();
imageChangeState();
parallax();
