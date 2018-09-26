
      var query = ["Cartman", "Professor Chaos", "Butters", "Towelie"];

      function displayGifs() {

        var query = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          query + "&api_key=2mmLDVISGro0r8Qj1O5UV6rCnfAP0agk&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
          })

          .then(function(response) {
            console.log(response)
            console.log(queryURL)

            var results = response.data;

            for (var i = 0; i < results.length; i++) {

            var gifDiv = $("<div class='gif'>");

            var rating = results[i].rating;

            var pOne = $("<p>").text("Rating: " + rating);

            gifDiv.append(pOne);

            var gif = $("<img>");

            gif.addClass("gif");

            gif.attr("src", results[i].images.downsized.url);


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
          button.addClass("btn btn-warning")
      
          button.attr("data-name", query[i]);
          
          button.text(query[i]);
      
          $("#buttons-view").append(button);
        }

      }

      $("#add-gif").on("click", function (event) {
        event.preventDefault();

        var gifInput = $("#gif-input").val().trim();


        query.push(gifInput);

        renderButtons();
      });
      

      //event listener
      $(document).on("click", ".gif-btn", "#submit", displayGifs);

      renderButtons();