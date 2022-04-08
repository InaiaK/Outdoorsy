var nameEl = document.getElementById("city-name");
var currentTempEl = document.getElementById("temperature");

// API 

var apiKey = "NAUqjqumgvHjOh22xdKhD5LXDAzGaHz0";
var apiInfo = "http://dataservice.accuweather.com/forecasts/v1/daily/1day/?apikey=NAUqjqumgvHjOh22xdKhD5LXDAzGaHz0"

let cityName = localStorage.getItem("city")
console.log("city", cityName)
getapiInfo(cityName);

var getData = function (key) {

    var apiUrl = `https://dataservice.accuweather.com/forecasts/v1/daily/1day/${key}?apikey=NAUqjqumgvHjOh22xdKhD5LXDAzGaHz0`
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        }).then(function (data) {
            console.log(data);
        })
}
// searchEl.addEventListener("click", formSubmitCity);

function getapiInfo(city) {
    var apiResponse = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=NAUqjqumgvHjOh22xdKhD5LXDAzGaHz0&q=${city}&imperial`;
    fetch(apiResponse)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    let key = data[0].Key
                    getData(key)
                    var dailyWeather = "http://dataservice.accuweather.com/forecasts/v1/daily/1day/34781?apikey=NAUqjqumgvHjOh22xdKhD5LXDAzGaHz0"
                    // var lat = data.coord.lat
                    // // var lon = data.coord.lon
                    // apiResponse(lat, lon, city)
                    // var userHistory = JSON.parse(localStorage.getItem("WeatherAPI")) || []
                    // userHistory.push(city)
                    // localStorage.setItem("WeatherAPI", JSON.stringify(userHistory))
                });
            } else {
                console.log('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Error: Please enter a City');
        });

}