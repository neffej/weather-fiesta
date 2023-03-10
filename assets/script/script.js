var searchItem = {name:'London',state: 'England', country: 'GB'}
var searchEl = [searchItem.name,searchItem.state,searchItem.country]
// // var searchString= JSON.stringify(searchEl)
var searchBtn = document.querySelector('#search-button')
var searchResults = document.querySelector('#search-results')
var forecastEl = document.querySelector('#forecast-cards');


var clearBtn = document.querySelector('#clear-button')
var resultArray=[];
var savedCoordinates=[];
var cityList=[];
var IDArray=[0,1,2,3,4]

var dayOne = []
var dayTwo = []
var dayThree = []
var dayFour = []
var dayFive = []

var tempArray = []
var windArray = []
var humArray = []
var dateArray = []


var forecastURL= 'http://api.openweathermap.org/data/2.5/forecast?lat=34.8781&lon=-83.4010&appid=af55055307791ec469a2fe0620680567'

function init(){
    var cityList = JSON.parse(localStorage.getItem('citylist'))
    if(cityList != null){
    for(var i=0; i < cityList.length; i++){
        var latLong = cityList[i].latLong
        var name = cityList[i].cityName

        console.log(name);
        console.log(cityList)

        addCityToList(name);
}
}return
}


// BUTTON FUNCTIONS
// This button initiates the forecast retrieval code. If the user submission is not blank, then a function is run which sends an API call to retrieve a list of cities that match the user search.
searchBtn.addEventListener('click', function(event){
    event.preventDefault();

    var city = document.querySelector('#search').value;

    if (city ===''){
        alert('Please enter a city to search database');
        return;
    }else{
        console.log(city);
        searchCityList(city);
        }
});

// This button clears the list of cities saved on the page
clearBtn.addEventListener('click',function(event){
    event.preventDefault
    localStorage.clear();
    var cityList = document.querySelector('#selected-cities')
    clearList(cityList);

})

// This click event refers to the buttons that populate upon a user search.  The user selects one of the buttons; the selected city is added to localStorage, a function is called to populate the "selected-cities" list with the user selection, and the search options are cleared.
document.querySelector('#search-results').addEventListener('click',function(event){
    event.preventDefault;

    var city = event.target
    var cityID = Number(city.id)
    var cityName = city.textContent
    console.log(cityName,cityID)
    console.log(resultArray[cityID])
    console.log(resultArray[0].name+', '+resultArray[0].state+', '+resultArray[0].country)
    for (var i=0; i<resultArray.length; i++){
             if(cityName == resultArray[i].name+', '+resultArray[i].state+', '+resultArray[i].country){
                var lat = resultArray[i].lat
                var lon = resultArray[i].lon
                var latLong = {lat,lon}
        }
        }
    

    savedCoordinates.push(latLong);
    cityList.push({latLong,cityName})
    console.log(cityList)
    localStorage.setItem('citylist',JSON.stringify(cityList));   

    addCityToList(cityName)
    clearList(searchResults)


})

// This click event refers to the list of saved cities, populated from local storage
document.querySelector('#selected-cities').addEventListener('click',function(event){
    event.preventDefault;

    // Identifies which item was clicked
    var city = event.target;
    var cityText = city.textContent
    console.log(cityText)   

// Retrieves information from local storage
    var cityList = JSON.parse(localStorage.getItem('citylist'))
    console.log(cityList[0].cityName)

    // Cycles through local storage to find matching city and sends match to API to retrieve forecast data
    for (var i = 0; i < cityList.length; i++){
        if (cityText === cityList[i].cityName){
            console.log('cities match')
            var forecastURL= 'https://api.openweathermap.org/data/2.5/forecast?lat='+cityList[i].latLong.lat+'&lon='+cityList[i].latLong.lon+'&appid=af55055307791ec469a2fe0620680567&units=imperial'

            fetch(forecastURL)
            .then(function(response){
                return response.json();
            })
            // Retrieved data is displayed via the called function
            .then(function(data){
                displayForecast(data);
                return;
            })
            }else{
                console.log("city not found")
            }
        }
})

// SUPPORT AND DISPLAY FUNCTIONS

// The data that is returned from the first API call is insufficient for producing a forecast; there are too many synonomous cities in the world. So, this function displays the first 5 results from the API call so that the user can select which city they mean.
function displaySearchResults(city){

    for(var i=0; i < city.length; i++){
    const list = document.querySelector('#search-results');
// Create elements for each search option
    const row = document.createElement('a');

// Create an object to hold city data
    var result = {lat:city[i].lat, lon:city[i].lon, name:city[i].name, state:city[i].state,country:city[i].country}

// Style the elements
    row.classList= 'list-item flex-row justify-space-between align-center btn btn-light rounded-3 text-dark'
// Set the element id to a number between 0->5
    row.id= IDArray[i];
// Grab information from API and attach to display
    row.textContent = [city[i].name,' '+city[i].state,' '+city[i].country]

// Push city data to an array
    resultArray.push(result)

// Display elements in the appropriate column container
    list.appendChild(row);  
}
console.log(resultArray)
}

// The first API call - when users input a city name, this function sends a call out to retrieve more data.
function searchCityList(city){
    var geocodingURL= 'https://api.openweathermap.org/geo/1.0/direct?q='+city+'&limit=5&appid=af55055307791ec469a2fe0620680567'

    fetch(geocodingURL)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(searchResults.length);

        clearList(searchResults);
        displaySearchResults(data);
        return;
        
        })
}

// When the user selects a city from their search results, this function appends that selection to a list
function addCityToList(city){
    // Append selected city to list
    const list = document.querySelector('#selected-cities');

    const row = document.createElement('a');

    row.classList= 'list-item flex-row justify-space-between align-center btn btn-secondary rounded-3 text-info'
    row.id='saved-city'
    row.textContent = city
    

    list.appendChild(row);  
}

// This function clears the called HTML list displays 
function clearList(list){
    while(list.firstChild){
        list.removeChild(list.firstChild);
    }
}

// This function calculates values to then be displayed on screen
function calculateForecast(city){

    for (var i=0; i < city.list.length; i++){
        
        var temp = city.list[i].main.temp
        var wind = city.list[i].wind.speed
        var hum = city.list[i].main.humidity
        var data =  city.list[i].dt_txt.split(" ") 
        var date = data[0]  

            tempArray.push(temp)
            windArray.push(wind)
            humArray.push(hum)
            dateArray.push(date)
    }

    // The following suite of functions commits the calculated values to arrays for each forecast day. There is probably a more efficient way to do this. 
    dayOne.push(calculateDayOne(tempArray))
    dayOne.push(calculateDayOne(windArray))
    dayOne.push(calculateDayOne(humArray))
    dayOne.push(dateArray[0])
    dayTwo.push(calculateDayTwo(tempArray))
    dayTwo.push(calculateDayTwo(windArray))
    dayTwo.push(calculateDayTwo(humArray))
    dayTwo.push(dateArray[8])
    dayThree.push(calculateDayThree(tempArray))
    dayThree.push(calculateDayThree(windArray))
    dayThree.push(calculateDayThree(humArray))
    dayThree.push(dateArray[16])
    dayFour.push(calculateDayFour(tempArray))
    dayFour.push(calculateDayFour(windArray))
    dayFour.push(calculateDayFour(humArray))
    dayFour.push(dateArray[24])
    dayFive.push(calculateDayFive(tempArray))
    dayFive.push(calculateDayFive(windArray))
    dayFive.push(calculateDayFive(humArray))
    dayFive.push(dateArray[32])

console.log(dayOne)
console.log(dayTwo)
    appendCards(dayOne,0);
    appendCards(dayTwo,1);
    appendCards(dayThree,2);
    appendCards(dayFour,3);
    appendCards(dayFive,4);
}

// The next five functions calculate averages for the displayed values. There is one function for each calculated day; there is definitely a better way to do this, but that's a TO-DO for next time.
function calculateDayOne(array){
    var total = 0;
    var count = 0;

    for(var i=0; i < 8; i++){
        total += array[i];
        count++;
    };
    let num = ( total / count)
    let n = num.toFixed(0);
    return n
}
function calculateDayTwo(array){
    var multiplier = 1
    var total = 0;
    var count = 0;

    for(var i=(0+(multiplier*8)); i < (7+(multiplier*8)); i++){
        total += array[i];
        count++;
    };
    let num = ( total / count)
    let n = num.toFixed(0);
    return n
}
function calculateDayThree(array){
    var multiplier = 2
    var total = 0;
    var count = 0;

    for(var i=(0+(multiplier*8)); i < (7+(multiplier*8));i++){
        total += array[i];
        count++;
    };
    let num = ( total / count)
    let n = num.toFixed(0);
    return n
}
function calculateDayFour(array){
    var multiplier = 3
    var total = 0;
    var count = 0;

    for(var i=(0+(multiplier*8)); i < (7+(multiplier*8)); i++){
        total += array[i];
        count++;
    };
    let num = ( total / count)
    let n = num.toFixed(0);
    return n
}
function calculateDayFive(array){
    var multiplier = 4
    var total = 0;
    var count = 0;

    for(var i=(0+(multiplier*8)); i < (7+(multiplier*8)); i++){
        total += array[i];
        count++;
    };
    let num = ( total / count)
    let n = num.toFixed(0);
    return n
}

// This function populates the little forecast cards with the calculated information
function appendCards(array,index){
    
        var forecastCard = forecastEl.children[index]
        console.log(forecastCard.hasChildNodes())

        // If the cards already have elements, clear them and repopulate
        if(forecastCard.hasChildNodes()===true){
            clearList(forecastCard)
        }

        forecastCard.classList = 'col-sm-2 fs-6 fw-light bg-dark text-light py-2 w-12'

        // Create elements
        const date = document.createElement('h6')
        const temp = document.createElement('p')
        const wind = document.createElement('p')
        const hum = document.createElement('p')
    
        // Give elements text from gathered information
        temp.textContent = "Temp: "+array[0]+" ??F"
        wind.textContent = "Wind: "+array[1]+" MPH"
        hum.textContent = "Hum: "+array[2]+"%"
        date.textContent = array[3]

        // Append elements to appropriate list
        forecastCard.appendChild(date)
        forecastCard.appendChild(temp)
        forecastCard.appendChild(wind)
        forecastCard.appendChild(hum)
    

}

// This function transcribes the information from the weather API to a displayed forecast
function displayForecast(city){
    console.log(city);
    console.log(forecastEl[0])

    
    calculateForecast(city);

    const list =  document.querySelector('#current-weather')

    const location = document.createElement('h1')
    const temp = document.createElement('p')
    const wind = document.createElement('p')
    const hum = document.createElement('p')
    

    location.textContent = city.city.name + "   "+ city.list[0].dt_txt + "  "+city.list[0].weather[0].icon
    location.classList = 'fs-2'

    temp.textContent = "Temperature:  "+city.list[0].main.temp+" ??F"
    wind.textContent = "Wind Speed:  " +city.list[0].wind.speed+" MPH"
    hum.textContent = "Humidity:  "+city.list[0].main.humidity+"%"

    clearList(list);

    list.insertBefore(hum,list.children[0])
    list.insertBefore(wind,list.children[0])
    list.insertBefore(temp,list.children[0])
    list.insertBefore(location,list.children[0])
}




init();




// Useful links below:

// http://openweathermap.org/img/wn/10d@2x.png
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}