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




});