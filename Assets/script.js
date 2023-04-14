$(document).ready(function () {
    $("#search-button").on("click", function () {
        var searchTerm = $("#search-value").val();
        $("#search-value"),val("");
        weatherFunction(searchTerm);
        weatherForecast(searchTerm);
});

$("#search-button").keypress(function (event) {
    var keycode = (event.keycode ? event.keycode : event.which);
    if (keycode ===13) {
        weatherFunction(searchTerm);
        weatherForecast(searchTerm);
    }
});

var history = JSON.parse(localStorage.getItem("history")) || [];

if (history.length > 0) {
    weatherFunction(history[history.length -1]);
}

for (var i = 0; i < history.length; i++) {
    createRow(history[i]);
}

function createRow(text) {
    var listItem = $("<li>").addClass("list-group-item").text(text);
    $(".history").append(listItem);
}

$(".history").on("click", "li", function () {
    weatherFunction($(this).text());
    weatherForecast($(this).text());
});

function weatherFunction(searchTerm) {
    $.ajax({
        type: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&APPID=6e829212dfe55ced8e340fd8630f7ac6",

    }).then(function (data) {
        if(history.indexOf(searchTerm) === -1 {
            history.push(searchTerm);
            localStorage.setItem("history", JSON.stringify(history));
            createRow(searchTerm);
        }
        $("#today").empty();

        var title = $("<h3>").addClass("card-title").text(data.name + " (" + new Date().toLocaleDateString() + ")");
        var img = $("<img>").attr("src", "https://openweathermap.org/img/w" + data.weather[0].icon + ".png");

        var card = $("<div>").addClass("card");
        var cardBody = $("<div").addClass("card-body");
        var wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + " MPH");
    }
}

});