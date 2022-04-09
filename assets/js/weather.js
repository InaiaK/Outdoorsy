// API

const apiKey = "NAUqjqumgvHjOh22xdKhD5LXDAzGaHz0";
var weatherEl = document.getElementById('weather');

let cityName = localStorage.getItem("city");
getapiInfo(cityName);

var getData = function (key) {
    var apiUrl = `https://dataservice.accuweather.com/forecasts/v1/daily/1day/${key}?apikey=NAUqjqumgvHjOh22xdKhD5LXDAzGaHz0`
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        }).then(function (data) {
            var forecast = data.DailyForecasts[0];
            console.log(forecast);

            var dayHigh = forecast.Temperature.Maximum.Value;
            var dayLow = forecast.Temperature.Minimum.Value;
            var iconNum = forecast.Day.Icon;
            if (iconNum < 10) {
                iconNum = `0${iconNum}`;
            }
            var icon = `https://developer.accuweather.com/sites/default/files/${iconNum}-s.png`;

            var iconEl = document.createElement('img');
            iconEl.setAttribute('src', icon);
            var dayHighSpan = document.getElementById('day-high');
            var dayLowSpan = document.getElementById('day-low');
            dayHighSpan.innerText = `High: ${dayHigh}°F`;
            dayLowSpan.innerText = `Low: ${dayLow}°F`;

            weatherEl.append(iconEl,dayHighSpan,dayLowSpan);

        })
}

function getapiInfo(city) {
    var apiResponse = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=NAUqjqumgvHjOh22xdKhD5LXDAzGaHz0&q=${city}&imperial`;
    fetch(apiResponse)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        console.log(data);
                        let key = data[0].Key;
                        var weatherHeader = document.createElement('h2');
                        weatherHeader.innerText = `Today's forecast for ${data[0].EnglishName}`;
                        weatherEl.append(weatherHeader);
                        getData(key);
                    });
            } else {
                console.log('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            console.error('Error:', error);
        });

}