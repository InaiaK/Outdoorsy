const apiKey = 'apikey=UTIojKvGOntZW05jT4VTYnAMcfn8u3OG';

var apiCall = function(city, segment='', radius=30) {
    city = city.toLowerCase();
    var requestURL = `https://app.ticketmaster.com/discovery/v2/events.json?city=${city}&${apiKey}`;
    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data._embedded.events);
        });
}
apiCall('boston');

var typeURL = 'https://app.ticketmaster.com/discovery/v2/classifications.json?apikey=UTIojKvGOntZW05jT4VTYnAMcfn8u3OG';
fetch(typeURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        var types = data._embedded.classifications;
        console.log(types);
    });