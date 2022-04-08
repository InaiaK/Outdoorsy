const apiKeyTM = 'apikey=UTIojKvGOntZW05jT4VTYnAMcfn8u3OG';
const eventTypes = [
    'Sports',
    'Music',
    'Arts & Theatre',
    'Film',
    'Miscellaneous'
];

var resultsEl = document.getElementById('result-content');

var getEvents = function (city, segmentName = '', radius = '&radius=30') {
    city = city.toLowerCase();
    if (segmentName) {
        segmentName = `&classificationName=${segmentName}`;
    }
    var requestURL = `https://app.ticketmaster.com/discovery/v2/events.json?city=${city}${segmentName}${radius}&${apiKeyTM}`;
    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
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

                console.log('event:',event,'name',name,'dateTime',dateTime,'imgURL', imgURL, 'eventURL', eventURL,'venueName', venueName,'eventInfo', eventInfo);

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

                var URLa = document.createElement('a');
                URLa.innerText = 'Get tickets now!';
                URLa.setAttribute('src',eventURL)

                eventDiv.append(titleHeader, infoP, dateP, img, URLa, venueP);
                resultsEl.append(eventDiv);
            }
        }).catch((error) => {
            console.error('Error:', error);
          });
}

var searchParams = window.location.search;
const urlParams = new URLSearchParams(searchParams);
var cityQ = urlParams.get('q');
getEvents(cityQ);