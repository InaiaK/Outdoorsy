var searchEl = document.getElementById("search-form");
var inputEl = document.getElementById("search-input");

var apiKey = "NAUqjqumgvHjOh22xdKhD5LXDAzGaHz0";

var citySearchApi = "https://dataservice.accuweather.com/locations/v1/cities/search?apikey=NAUqjqumgvHjOh22xdKhD5LXDAzGaHz0${key}&q=${city}";

// http://dataservice.accuweather.com/forecasts/v1/daily/1day/{locationKey}

// Search city name - (index.html)
var formSubmitCity = function (event) {
    event.preventDefault();

    var cityName = inputEl.value.trim();

    if (cityName) {
        localStorage.setItem("city", cityName)
        inputEl.value = " ";
        console.log("cityName")
        location.replace("./results.html") // It is going to display the weather on the second page html
    } else {
        alert("Please enter a city name"); // If user don't type a city name. 
        console.log("Please Enter cityname")
    }
};

searchEl.addEventListener("click", formSubmitCity);