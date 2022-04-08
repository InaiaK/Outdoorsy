const apiKey = 'apikey=UTIojKvGOntZW05jT4VTYnAMcfn8u3OG';
const eventTypes = {
    'Sports': "KZFzniwnSyZfZ7v7nE",
    'Music': "KZFzniwnSyZfZ7v7nJ",
    'Arts & Theatre': "KZFzniwnSyZfZ7v7na",
    'Film': "KZFzniwnSyZfZ7v7nn",
    'Miscellaneous': "KZFzniwnSyZfZ7v7n1"
}

var searchEl = document.getElementById('search');
var resultsEl = document.getElementById('results');

searchEl.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        getEvents(event.target.value);
    }
});

var getEvents = function (city, segmentID = '', radius = '&radius=30') {
    city = city.toLowerCase();
    if (segmentID) {
        segmentID = `&classificationID=${segmentID}`;
    }
    var requestURL = `https://app.ticketmaster.com/discovery/v2/events.json?city=${city}${segmentID}${radius}&${apiKey}`;
    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data);
            resultsEl.innerHTML="";
            var eventList = data._embedded.events;
            for (i = 0; i < eventList.length; i++) {
                var event = eventList[i];
                var name = event.name;
                var timeTBA = event.dates.start.timeTBA;
                var dateTime = timeTBA ? event.dates.start.localDate : event.dates.start.dateTime;
                var imgURL = event.images[0].url;
                var eventURL = event.url;
                var venueName = event._embedded.venues[0].name;
                if (event.hasOwnProperty('info')) {
                    var eventInfo = event.info;
                } else {
                    var eventInfo = '';
                }

                var eventDiv = document.createElement('div');

                var titleHeader = document.createElement('h1');
                titleHeader.innerText = name;

                var infoP = document.createElement('p');
                infoP.innerText = eventInfo;

                var dateP = document.createElement('p');
                dateP.innerText = dateTime;

                var venueP = document.createElement('p');
                venueP.innerText = venueName;

                var img = document.createElement('img');
                img.setAttribute('src', imgURL);

                var URLp = document.createElement('p');
                URLp.innerText = eventURL;

                eventDiv.append(titleHeader, infoP, dateP, img, URLp, venueP);
                resultsEl.append(eventDiv);
            }
        });
}