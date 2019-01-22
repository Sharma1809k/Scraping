$(document).ready(function () {
  $(".scrape").on("click", function (event) {
   $.ajax({
      method: "GET",
      url: "/scrape"
    }).then(function (data) {
       location.reload()
       console.log(data);
      });
  });

// Whenever someone clicks leave a comment
$(document).on("click", ".add", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the .add tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' placeholder = 'Add the title' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' placeholder = 'Leave a comment' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
     
      $("#notes").append("<button  id='cancel'>Cancel</button>");
    
    });
});

$(document).on("click" ,"#cancel" , function(){
  location.reload();
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      comment: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
    
      // Empty the notes section
      $("#notes").empty();
      console.log(data)
    });
});

$(document).on("click", ".delete", function () {

  var thisID = $(this).attr("data-id");
  $.ajax({
    method: "DELETE",
      url: "/delete/" + thisID,
    
  }).then(function () {
      location.reload();
  });
});
});