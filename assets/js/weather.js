// Global Variables 
var searchEl = document.getElementById("search-form");
var inputEl = document.getElementById("search-input");
var nameEl = document.getElementById("city-name");
var currentTempEl = document.getElementById("temperature");

// API 

var apiKey = "NAUqjqumgvHjOh22xdKhD5LXDAzGaHz0";
var apiInfo ="http://dataservice.accuweather.com/locations/v1/cities/search";
var apiResponse = 



//  Search city name;
var formSubmitCity = function (event) {
    event.preventDefault();

    var cityName = inputEl.value.trim();

    if(cityName){
        getapiInfo(cityName);

        nameEl.textContent= " ";
        inputEl.value = " ";
    } else { 
        alert("Please enter a city name");
    }
};

var apiResponse = function (lat,lon,city) {

    var apiUrl = 
    

  
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          console.log(response);
          response.json()
    }}).then(function (data) {
        console.log(data);
        document.getElementById("city-name").innerText=city
        document.getElementById("temperature").innerText="Temperature : " + data.current.temp
        let forecastHTML =""
        // for (let i = 0; i < 5;i++){
        //     forecastHTML += "<div class="input-group-button">
        //     <p>Temperature: ${data.daily[i].temp.day}</p>
        //     </div>"

        // }
    })

searchEl.addEventListener("click", formSubmitCity);

function getapiInfo(city){
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

  
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          console.log(response);
          response.json().then(function (data) {
            console.log(data);
            var lat = data.coord.lat
            var lon = data.coord.lon
            apiResponse(lat,lon,city)
            var userHistory = JSON.parse(localStorage.getItem("WeatherAPI")) || []
            userHistory.push(city)
            localStorage.setItem("WeatherAPI",JSON.stringify(userHistory))
          });
        } else {
          console.log('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Error: Please enter a City');
      });
  }
