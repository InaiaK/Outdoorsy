var searchEl = document.getElementById("search-form");
var inputEl = document.getElementById("search-input");

var formSubmitCity = function (event) {
    event.preventDefault();

    var cityName = inputEl.value.trim();

    if (cityName) {
      
        localStorage.setItem("city",cityName)
        // nameEl.textContent = " ";
        inputEl.value = " ";
        console.log("cityName")
        location.replace("./results.html")
    } else {
        alert("Please enter a city name");
        console.log("Please Enter cityname")
    }
};

searchEl.addEventListener("click", formSubmitCity);