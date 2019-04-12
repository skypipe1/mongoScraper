// $(document).onclick(".scrapeButton", function(){
//   $.getJSON("/articles", function(data){
//       for (var i = 0; i < data.length; i++){
//           $(".results").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
//       }
//   })
// });
// function displayResults(data) {
//   // First, empty the table
//   $("tbody").empty();

//   // Then, for each entry of that json...
//   animals.forEach(function(animal) {
//     // Append each of the animal's properties to the table
//     var tr = $("<tr>").append(
//       $("<td>").text(animal.name),
//       $("<td>").text(animal.numLegs),
//       $("<td>").text(animal.class),
//       $("<td>").text(animal.weight),
//       $("<td>").text(animal.whatIWouldReallyCallIt)
//     );

//     $("tbody").append(tr);
//   });
// }

$(document).on('click', "#saveArticle", function (e) {
    e.preventDefault()
    let thisId = $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
    }).then(function (data) {
        console.log(data)
    })
})

// $("#savedArticleButton").on('click', function (e) {
//     e.preventDefault()

//     $("#results").empty()

//     $.getJSON("/articles", function (data) {

//         $("#results").empty()
//         // For each one
//         for (var i = 0; i < data.length; i++) {
//             // Display the apropos information on the page
//             $("#results").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>" + "<br />" + "<button data-id='" + data._id + "' id='savenote'>Save Article</button>");
//         }
//     });



// })





// this is for the home page SCRAPE BUTTON CLICK
$("#fuck").on('click', function (e) {
    e.preventDefault()

    $("#results").empty()

    $.getJSON("/articles", function (data) {

        $("#results").empty()
        // For each one
        for (var i = 0; i < data.length; i++) {
            // Display the apropos information on the page
            $("#results").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>" + "<br />" + "<button data-id='" + data[i]._id + "' id='saveArticle'>Save Article</button>");
        }
    });



})
// Grab the articles as a json WHAT DISPLAYS INFO ON  THE PAGE

$.getJSON("/articles", function (data) {
    $("#results").empty()
    // For each one
    for (var i = 0; i < data.length; i++) {
        // Display the apropos information on the page
        $("#results").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>" + "<br />" + "<button data-id='" + data[i]._id + "' id='saveArticle'>Save Article</button>");
    }
});

// displays saved articles
$("#savedArticleButton").on("click", function (e) {
    e.preventDefault()
    $("#results").empty()
    // on click of saved articles to display
    $.getJSON("/savedArticles", function (data) {
        $("#results").empty()
        // For each one
        for (var i = 0; i < data.length; i++) {
            // Display the apropos information on the page
            $("#results").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>" + "<br />" + "<button data-id='" + data[i]._id + "' id='deleteArticle'>Delete</button>" + "<button data-id='" + data[i]._id + "' id='saveArticle'>Save Article</button>");
        }
    });
});
// for deleteing article
$("#deleteArticle").on("click", function (e) {
    e.preventDefault()
    $("#results").empty()
    // on click of saved articles to display
    $.getJSON("/deletedArticles", function (data) {
        $("#results").empty()
        // For each one
        for (var i = 0; i < data.length; i++) {
            // Display the apropos information on the page
            $("#results").remove("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>" + "<br />" + "<button data-id='" + data[i]._id + "' id='deleteArticle'>Delete</button>" + "<button data-id='" + data[i]._id + "' id='saveArticle'>Save Article</button>");
        }
    });
});

// When you click the savenote button
$(document).on("click", "#deleteArticle", function () {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
        method: "POST",
        url: "/remove/" + thisId,

    })
        // With that done
        .then(function (data) {
            // Log the response
            console.log(data);
            // Empty the notes section
            $("#notes").empty();
        });

    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
});


// Whenever someone clicks a p tag
$(document).on("click", "p", function () {
    // Empty the notes from the note section
    $("#notes").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");

    // Now make an ajax call for the Article
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })
        // With that done, add the note information to the page
        .then(function (data) {
            console.log(data);
            // The title of the article
            $("#notes").append("<h2>" + data.title + "</h2>");
            // An input to enter a new title
            $("#notes").append("<input id='titleinput' name='title' >");
            // A textarea to add a new note body
            $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
            // A button to submit a new note, with the id of the article saved to it
            $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

            // If there's a note in the article
            if (data.note) {
                // Place the title of the note in the title input
                $("#titleinput").val(data.note.title);
                // Place the body of the note in the body textarea
                $("#bodyinput").val(data.note.body);
            }
        });
});

// When you click the savenote button
$(document).on("click", "#savenote", function () {
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
        .then(function (data) {
            // Log the response
            console.log(data);
            // Empty the notes section
            $("#notes").empty();
        });

    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
});

