// Grab the articles as a json
var limit = 50;
$(".scrape-new").on("click", function() {
    
  $.ajax({
    method: "GET",
    url: "/scrape"
  })
  // With that done, add the note information to the page
  .then(function(data) {
                $.getJSON("/articles", function(data) {
    // For each one
            for (var i = 0; i < limit; i++) {
      // Display the apropos information on the page 
                console.log("id: " + data[i]._id);
                $("#articles").append("<h3 <a data-id='" + data[i]._id + "'>" + "Title:  " + data[i].title + "<br>" + "Link:  " + data[i].link + "</a>" + "</h3>");
                $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].summary + "</p>");
                
                $("#articles").append('<a class="waves-effect waves-light btn modal-trigger" href="#modal1">Notes</a>');

              }
        });
});
});
  



  // Whenever someone clicks a save button
  $("#note-article").on("click", function() {
    // Empty the notes from the note section
    console.log("got to notes");
    $("#notes").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");
  
    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      // With that done, add the note information to the page
      .then(function(data) {
        console.log(data);
       
        $('#modalCenter').on('show.bs.modal', function (event) {
          var button = $(event.relatedTarget) // Button that triggered the modal
          var recipient = button.data('target') // Extract info from data-* attributes
          // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
          // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
          var modal = $(this)
          modal.find('.modal-title').text('New message to ' + recipient)
          modal.find('.modal-body input').val(recipient)
        })
        $(".modal-body").append("<p id='titleinput'>" + data.title + "</p>");
        // // A textarea to add a new note body
        $(".modal-body").append("<p id='bodyinput'>" + data.notes + "</p></div>");
       
        if (data.note) {
          // Place the title of the note in the title input
          $("#titleinput").val(data.note.title);
          // Place the body of the note in the body textarea
          $("#bodyinput").val(data.note.body);
        }
      });
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
        body: $("#bodyinput").val()
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#notes").empty();
      });
  
    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });
  