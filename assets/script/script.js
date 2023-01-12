var searchItem = {name:'London',state: 'England', country: 'GB'}
var searchEl = [searchItem.name,searchItem.state,searchItem.country]
// // var searchString= JSON.stringify(searchEl)
var searchBtn = document.querySelector('#search-button')
var searchResults = document.querySelector('#search-results')
var forecastEl = document.querySelector('#forecast-cards');


var clearBtn = document.querySelector('#clear-button')
var latLongArray=[];
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

        addCityToList(name);
}
}return
}


// BUTTON FUNCTIONS
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

clearBtn.addEventListener('click',function(event){
    event.preventDefault
    localStorage.clear();
    var cityList = document.querySelector('#selected-cities')
    clearList(cityList);

})

document.querySelector('#search-results').addEventListener('click',function(event){
    event.preventDefault;

    var city = event.target
    var cityID = Number(city.id)
    var cityName = city.textContent
    console.log(cityName)
    console.log(latLongArray[cityID])
    var latLong = latLongArray[cityID]
    

    savedCoordinates.push(latLong);
    cityList.push({latLong,cityName})
    localStorage.setItem('citylist',JSON.stringify(cityList));   
    addCityToList(cityName)
})

document.querySelector('#selected-cities').addEventListener('click',function(event){
    event.preventDefault;



    var city = event.target;
    var cityText = city.textContent
    console.log(cityText)   


    var cityList = JSON.parse(localStorage.getItem('citylist'))
    console.log(cityList[0].cityName)

    for (var i = 0; i < cityList.length; i++){
        if (cityText === cityList[i].cityName){
            console.log('cities match')
            var forecastURL= 'https://api.openweathermap.org/data/2.5/forecast?lat='+cityList[i].latLong.lat+'&lon='+cityList[i].latLong.lon+'&appid=af55055307791ec469a2fe0620680567&units=imperial'

            fetch(forecastURL)
            .then(function(response){
                return response.json();
            })
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
function displaySearchResults(city){


    for(var i=0; i < city.length; i++){
    const list = document.querySelector('#search-results');

    const row = document.createElement('a');

    row.classList= 'list-item flex-row justify-space-between align-center btn btn-light rounded-3 text-dark'
    row.id= IDArray[i];
    row.textContent = [city[i].name,' '+city[i].state,' '+city[i].country]
    
    var lat = city[i].lat;
    var lon = city[i].lon;
    latLongArray.push({lat, lon})



    list.appendChild(row);  
}
console.log(latLongArray)
}

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

function addCityToList(city){
    // Append selected city to list
    const list = document.querySelector('#selected-cities');

    const row = document.createElement('a');

    row.classList= 'list-item flex-row justify-space-between align-center btn btn-secondary rounded-3 text-info'
    row.id='saved-city'
    row.textContent = city
    

    list.appendChild(row);  
}

function clearList(list){
    while(list.firstChild){
        list.removeChild(list.firstChild);
    }
}

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

function appendCards(array,index){
    
        var forecastCard = forecastEl.children[index]
        forecastCard.classList = 'col-sm-2 fs-6 fw-light bg-dark text-light py-2 w-12'
        
        const date = document.createElement('h6')
        const temp = document.createElement('p')
        const wind = document.createElement('p')
        const hum = document.createElement('p')
    
        temp.textContent = "Temp: "+array[0]+" °F"
        wind.textContent = "Wind: "+array[1]+" MPH"
        hum.textContent = "Hum: "+array[2]+"%"
        date.textContent = array[3]

        forecastCard.appendChild(date)
        forecastCard.appendChild(temp)
        forecastCard.appendChild(wind)
        forecastCard.appendChild(hum)
    

}

function displayForecast(city){
    console.log(city);
    calculateForecast(city);

    const list =  document.querySelector('#current-weather')

    const location = document.createElement('h1')
    const temp = document.createElement('p')
    const wind = document.createElement('p')
    const hum = document.createElement('p')
    

    location.textContent = city.city.name + "   "+ city.list[0].dt_txt + "  "+city.list[0].weather[0].icon
    location.classList = 'fs-2'

    temp.textContent = "Temperature:  "+city.list[0].main.temp+" °F"
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