// Global Variables 
// var searchEl = document.getElementById("search-form");
// var inputEl = document.getElementById("search-input");
var nameEl = document.getElementById("city-name");
var currentTempEl = document.getElementById("temperature");

// API 

var apiKey = "NAUqjqumgvHjOh22xdKhD5LXDAzGaHz0";
var apiInfo = "http://dataservice.accuweather.com/locations/v1/cities/search";
// cURL 
// var apiResponse = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=NAUqjqumgvHjOh22xdKhD5LXDAzGaHz0&q=${city}&imperial`;


//  Search city name;
// var formSubmitCity = function (event) {
//     event.preventDefault();

//     var cityName = inputEl.value.trim();

//     if (cityName) {
//         getapiInfo(cityName);

//         // nameEl.textContent = " ";
//         inputEl.value = " ";
//     } else {
//         // alert("Please enter a city name");
//         console.log("Please Enter cityname")
//     }
// };

let cityName  = localStorage.getItem("city")
console.log("city",cityName)
getapiInfo(cityName);
var getData = function (key) {

    var apiUrl = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${key}?apikey=NAUqjqumgvHjOh22xdKhD5LXDAzGaHz0`


        fetch(apiUrl)
            .then(function (response) {
                if (response.ok) {
                 
                    response.json()
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
                    let key=data[0].Key
                   getData(key)
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
