var searchItem = {name:'London',state: 'England', country: 'GB'}
var searchEl = [searchItem.name,searchItem.state,searchItem.country]
// // var searchString= JSON.stringify(searchEl)
var searchBtn = document.querySelector('#search-button')




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
function displaySearchResults(city){
    for(var i=0; i < city.length; i++){
    const list = document.querySelector('#search-results');

    const row = document.createElement('a');

    row.classList= 'list-item flex-row justify-space-between align-center btn btn-light rounded-3 text-dark'
    row.innerHTML = [city[i].name,' '+city[i].state,' '+city[i].country] 
    row.setAttribute = ('href','http://api.openweathermap.org/data/2.5/forecast?'+city[i].lat+'&'+city[i].lon+'&appid=af55055307791ec469a2fe0620680567')

    list.appendChild(row);  
}}

function addCityToList(){
    const list = document.querySelector('.list-group');

    const row = document.createElement('li');

    // row.innerHTML = 
}



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
    console.log('this works input is broken')

    var city = document.querySelector('#search').value;

    if (city ===''){
        alert('Please enter a city to search database');
        return;
    }else{
        console.log(city);
        sendCityToAPI(city);
        }
});





// // API calls

// Display selected city in Forecast




// Useful links below:

// http://openweathermap.org/img/wn/10d@2x.png
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}