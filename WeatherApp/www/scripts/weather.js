var OpenWeatherAppKey = "6f85f6e0f2cbb8c98e70e042e1bbff33";

function getWeatherWithZipCode() {

    var zipcode = $('#zip-code-input').val();

    var queryString =
        'http://api.openweathermap.org/data/2.5/weather?zip='
        + zipcode + ',us&appid=' + OpenWeatherAppKey + '&units=imperial';

    $.getJSON(queryString, function (results) {

        showWeatherData(results);

    }).fail(function (jqXHR) {
        $('#error-msg').show();
        $('#error-msg').text("Error retrieving data. " + jqXHR.statusText);
    });

    return false;
}
function getVoteResults() {

    var zipcode = $('#zip-code-input').val();

    var queryString =
        'http://api.openweathermap.org/data/2.5/weather?zip='
        + zipcode + ',us&appid=' + OpenWeatherAppKey + '&units=imperial';

    $.getJSON(queryString, function (results1) {

        showVoteData(results1);

    }).fail(function (jqXHR) {
        $('#error-msg').show();
        $('#error-msg').text("Error retrieving data. " + jqXHR.statusText);
    });

    return false;
}
function getWeatherWithGeoLocation() {

    navigator.geolocation.getCurrentPosition(onGetLocationSuccess, onGetLocationError,
      { enableHighAccuracy: true });

    $('#error-msg').show();
    $('#error-msg').text('Determining your current location ...');

    $('#get-weather-btn').prop('disabled', true);
}
function onGetLocationSuccess(position) {

    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    var queryString =
      'http://api.openweathermap.org/data/2.5/weather?lat='
        + latitude + '&lon=' + longitude + '&appid=' + OpenWeatherAppKey + '&units=imperial';

    $('#get-weather-btn').prop('disabled', false);

    $.getJSON(queryString, function (results) {

        showWeatherData(results);

    }).fail(function (jqXHR) {
        $('#error-msg').show();
        $('#error-msg').text("Error retrieving data. " + jqXHR.statusText);
    });

}
function onGetLocationError(error) {

    $('#error-msg').text('Error getting location');
    $('#get-weather-btn').prop('disabled', false);
}

function showWeatherData(results) {

    if (results.weather.length) {

        $('#error-msg').hide();
        $('#weather-data').show();

        $('#title').text(results.name);
        $('#temperature').text(results.main.temp);
        $('#wind').text(results.wind.speed);
        $('#humidity').text(results.main.humidity);
        $('#visibility').text(results.weather[0].main);

        var sunriseDate = new Date(results.sys.sunrise);
        $('#sunrise').text(sunriseDate.toLocaleTimeString());

        var sunsetDate = new Date(results.sys.sunrise);
        $('#sunset').text(sunsetDate.toLocaleTimeString());

    } else {
        $('#weather-data').hide();
        $('#error-msg').show();
        $('#error-msg').text("Error retrieving data. ");
    }
}
function showVoteData(results) {

    if (results.Question.length) {

        $('#error-msg').hide();
        $('#weather-data').show();

#        $('#title').text(results1.name);

    } else {
        $('#weather-data').hide();
        $('#error-msg').show();
        $('#error-msg').text("Error retrieving data. ");
    }
}

