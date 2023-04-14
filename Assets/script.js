$(document).ready(function() {
    $("#search-button").on("click", function() {
        var searchTerm = $("#search-value").val();
        $("#search-value").val("");
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

$(".history").on("click", "li", function() {
    weatherFunction($(this).text());
    weatherForecast($(this).text());
});

function weatherFunction(searchTerm) {
    $.ajax({
        type: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&APPID=6e829212dfe55ced8e340fd8630f7ac6",

    }).then(function (data) {
        if(history.indexOf(searchTerm) === -1) {
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
        var humid = $("<p>").addClass("card-text").text("Humidity: " + data.wind.speed + " %");
        var temp = $("<p>").addClass("card-text").text("Temperature: " + data.wind.speed + " K");
        console.log(data)
        var lon = data.coord.lon;
        var lat = data.coord.lat;

        $.ajax({
            type: "GET",
            url: "api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=6e829212dfe55ced8e340fd8630f7ac6&lat" + lat + "&lon=" + lon,

        }).then(function (response) {
            console.log(response);

            var uvColor;
            var uvResponse = response.value;
            var uvIndex = $("<p>").addClass("card-text").text("UV Index: ");
            var btn = $("<span>").addClass("btn btn-sm").text(uvResponse);

            if(uvResponse < 3) {
                btn.addClass("btn-success");
            } else if (uvResponse < 7) {
                btn.addClass("btn-warning");
            } else {
                btn.addClass("btn-danger");
            }

            cardBody.append(uvIndex);
            $("#today .card-body").append(uvIndex.append(btn));
        });
    })

    function weatherForecast(searchTerm) {
        $.ajax({
            type: "GET",
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + searchTerm + "&APPID=6e829212dfe55ced8e340fd8630f7ac6&units=imperial",

        }).then(function (data) {
            console.log(data);
            $("#forecast").html("<h4 class=\"mt-3\">5-day Forecast:</h4>").append("<div class=\"row\">");

            for (var i=0; i<data.list.length; i++){

                if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {

                    var titlecon = $("<h3>").addClass("card-title").text(new Date(data.list[i].dt_txt).toLocaleDateString());
                    var imgcon = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");
                    var colcon = $("<div>").addClass("col-md-2.5");
                    var cardcon = $("<div>").addClass("card bg-primary text-white");
                    var cardbodycon = $("<div>").addClass("card-body p-2");
                    var humidcon = $("<p>").addClass("card-text").text("Humidity: " + data.list[i].main.humidity + "%");
                    var tempcon = $("<p>").addClass("card-text").text("Temperature: " + data.list[i].main.temp + "deg F");

                    colcon.append(cardcon.append(cardbodycon.append(titlecon, imgcon, tempcon, humidcon)));

                    $("#forecast .row").append(colcon);
                }
            }
        });
    }
}});