var app = app || {};

(function(a) {
    var weatherVM = kendo.observable({
        forecast : {}
    });
    var geocoder;
    var city;
    var country;
    var watch;
    var image;
    
    function initWeather(e) {
        kendo.bind(e.view.element, weatherVM);
    }
    //Get the latitude and the longitude;
    function successFunction(position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        codeLatLng(lat, lng)
    }

    function errorFunction(err) {
        console.log(err.message);
    }

    function initialize() {
        geocoder = new google.maps.Geocoder();
        document.addEventListener("deviceready", function(e) {
            if (navigator.geolocation) {
                watch = navigator.geolocation.watchPosition(successFunction, errorFunction, {timeout:30000,enableHighAccuracy: true});
            }
        }, false);
    }

    function codeLatLng(lat, lng) {
        var latlng = new google.maps.LatLng(lat, lng);
        geocoder.geocode({'latLng': latlng}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    city = results[0].address_components[2].short_name;
                    country = results[0].address_components[4].short_name;
                    dataPersister.getWeather(city, country).then(function(text) {
                        var weather = JSON.parse(text);
                        var forecast = {};
                        forecast.temp = (weather.list[0].main.temp - 274.15).toString().substr(0, 4);
                        forecast.forecast = weather.list[0].weather[0].description.toUpperCase();
                        getImageUrl(weather.list[0].weather[0].id);
                        weatherVM.set("forecast", forecast);
                    }, function(error) {
                        navigator.notification.alert(error);
                    });
                }
                else {
                    console.log("No results found");
                }
            }
            else {
                console.log("Geocoder failed due to: " + status);
            }
            
            navigator.geolocation.clearWatch(watch);
        });
    }
    
    function getImageUrl(weatherId) {
        var categoryId = weatherId.toString()[0];
        sqlite.getById(categoryId, function(tx, rs) {
            if (rs.rows.length > 0) {
                var weather = weatherVM.forecast;
                weather.icon = rs.rows.item(0).url;
                weatherVM.set("forecast", weather);
            }
        });
    }
    
    initialize();
    a.weather = {
        init:initWeather
    }
}(app));