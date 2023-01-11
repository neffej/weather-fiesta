var searchItem = {name:'London',state: 'England', country: 'GB'}
var searchEl = [searchItem.name,searchItem.state,searchItem.country]
// // var searchString= JSON.stringify(searchEl)
var searchBtn = document.querySelector('#search-button')
var clearBtn = document.querySelector('#clear-button')
var latLongArray=[];
var savedCoordinates=[];
var cityList=[];




var forecastURL= 'http://api.openweathermap.org/data/2.5/forecast?lat=34.8781&lon=-83.4010&appid=af55055307791ec469a2fe0620680567'




// fetch(forecastURL)
//     .then(function(response){
//         return response.json();
//     })
//     .then(function(data){
//         console.log(data);
//     })



// City Search functions
// // var searchInput = document.querySelector('#search');
// // var searchString = searchInput.value
// console.log(searchInput);

// function getSearchInput(){
//     console.log('im lost plz help')
//     var searchInput = document.querySelector('#search').value;
//     document.getElementById('demo').textContent = searchInput;
// }
function init(){
    var cityList = JSON.parse(localStorage.getItem('citylist'))
    if(cityList != null){
    for(var i=0; i < cityList.length; i++){
        var latLong = cityList[i].latLong
        var name = cityList[i].cityName

        console.log(name);

        addCityToList(name);
}
}
}

function displaySearchResults(city){
    for(var i=0; i < city.length; i++){
    const list = document.querySelector('#search-results');

    const row = document.createElement('a');

    row.classList= 'list-item flex-row justify-space-between align-center btn btn-light rounded-3 text-dark'
    row.id=[i]
    row.textContent = [city[i].name,' '+city[i].state,' '+city[i].country] 
    var lat = city[i].lat;
    var lon = city[i].lon;
    latLongArray.push({lat, lon})

    console.log(latLongArray)

    list.appendChild(row);  
}}

function sendCityToAPI(city){
    var geocodingURL= 'http://api.openweathermap.org/geo/1.0/direct?q='+city+'&limit=5&appid=af55055307791ec469a2fe0620680567'

    fetch(geocodingURL)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        displaySearchResults(data)
    })
}

searchBtn.addEventListener('click', function(event){
    event.preventDefault();

    var city = document.querySelector('#search').value;

    if (city ===''){
        alert('Please enter a city to search database');
        return;
    }else{
        console.log(city);
        sendCityToAPI(city);
        }
});

clearBtn.addEventListener('click',function(event){
    event.preventDefault
    localStorage.clear();
    // for loop to remove list items from selected cities
    var cityList = document.querySelector('#selected-cities')
    while (cityList.firstChild){
        cityList.removeChild(cityList.firstChild)
    }

})
// Select city from list and display weather forecast
// Select city from list:


document.querySelector('#search-results').addEventListener('click',function(event){
    event.preventDefault;
    var city = event.target
    var cityID = Number(city.id)
    var cityName = city.textContent
    console.log(latLongArray[cityID])
    var latLong = latLongArray[cityID]
    

    savedCoordinates.push(latLong);
    cityList.push({latLong,cityName})
    localStorage.setItem('citylist',JSON.stringify(cityList));   
    addCityToList(cityName)




    // 'http://api.openweathermap.org/data/2.5/forecast?lat='+city[i].lat+'&lon='+city[i].lon+'&appid=af55055307791ec469a2fe0620680567'

})

function addCityToList(city){
    // console.log(city.textContent)
    // Append selected city to list
    const list = document.querySelector('#selected-cities');

    const row = document.createElement('a');

    row.classList= 'list-item flex-row justify-space-between align-center btn btn-secondary rounded-3 text-info'
    row.id='saved-city'
    row.textContent = city
    

    list.appendChild(row);  
}
document.querySelector('#selected-cities').addEventListener('click',function(event){
    event.preventDefault;
    console.log(event.target)
    var city = event.target

})


function displayForecast(city){
    var geocodingURL= 'http://api.openweathermap.org/geo/1.0/direct?q='+city+'&limit=5&appid=af55055307791ec469a2fe0620680567'

    fetch(geocodingURL)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        displaySearchResults(data)
    })
}


init();






// // API calls

// Display selected city in Forecast




// Useful links below:

// http://openweathermap.org/img/wn/10d@2x.png
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}