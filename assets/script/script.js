var searchItem = {name:'London',state: 'England', country: 'GB'}
console.log(searchItem);
var searchEl = [searchItem.name,searchItem.state,searchItem.country]
console.log(searchEl);
// var searchString= JSON.stringify(searchEl)





var forecastURL= 'http://api.openweathermap.org/data/2.5/forecast?lat=34.8781&lon=-83.4010&appid=af55055307791ec469a2fe0620680567'

// http://openweathermap.org/img/wn/10d@2x.png
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}


fetch(forecastURL)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
    })



// City Search functions
var searchInput = document.querySelector('#search');
var searchString = searchInput.textContent
console.log(searchString);

var geocodingURL= 'http://api.openweathermap.org/geo/1.0/direct?q='+searchString+'&limit=5&appid=af55055307791ec469a2fe0620680567'

fetch(geocodingURL)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
    })


// API calls

// Display selected city in Forecast