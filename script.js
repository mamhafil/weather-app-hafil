const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");
const locationButton = document.querySelector(".location-btn");
const currentWeatherDiv = document.querySelector(".current-weather");
const weatherCardsDiv = document.querySelector(".weather-cards");

const API_KEY = "dc90f0ded9d705e7e4bfc363ef6f547f"; // API key for OpenWeatherMap API

const createWeatherCard = (cityName, weatherItem, index) => {
    if(index === 0) { // HTML for the main weather card
        return `<div class="details" id="weatherdata">
                    <h2>${cityName} (${weatherItem.dt_txt.split(" ")[0]})</h2>
                    <h6>Temperature Fahrenheit: ${(weatherItem.main.temp * 9/5 - 459.67).toFixed(2)}°F</h6>
                    <h6>Temperature celsius: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h6>
                    <h6>pressure: ${weatherItem.main.pressure} P</h6>
                    <h6>Wind: ${weatherItem.wind.speed} M/S</h6>
                    <h6>Humidity: ${weatherItem.main.humidity}%</h6>
                </div>
                <div class="icon">
                    <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
                    <h6>${weatherItem.weather[0].description}</h6>
                </div>`;
    } else { // HTML for the other five day forecast card
        return `<li class="card">
                    <h3>(${weatherItem.dt_txt.split(" ")[0]})</h3>
                    <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
                    <h6>Temp: ${(weatherItem.main.temp * 9/5 - 459.67).toFixed(2)}°F</h6>
                    <h6>Temp: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h6>
                    <h6>Wind: ${weatherItem.wind.speed} M/S</h6>
                    <h6>Humidity: ${weatherItem.main.humidity}%</h6>
                </li>`;
    }
}



const getWeatherDetails = (cityName, latitude, longitude) => {
    const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
    fetch(WEATHER_API_URL).then(response => response.json()).then(data => {
        // Filter the forecasts to get only one forecast per day
        const uniqueForecastDays = [];
        const fiveDaysForecast = data.list.filter(forecast => {
            const forecastDate = new Date(forecast.dt_txt).getDate();
            if (!uniqueForecastDays.includes(forecastDate)) {
                return uniqueForecastDays.push(forecastDate);
            }
        });

        // Clearing previous weather data
        cityInput.value = "";
        currentWeatherDiv.innerHTML = "";
        weatherCardsDiv.innerHTML = "";

        // Creating weather cards and adding them to the DOM
        fiveDaysForecast.forEach((weatherItem, index) => {
            const html = createWeatherCard(cityName, weatherItem, index);
            if (index === 0) {
                currentWeatherDiv.insertAdjacentHTML("beforeend", html);
            } else {
                weatherCardsDiv.insertAdjacentHTML("beforeend", html);
            }
        });        
    }).catch(() => {
        alert("An error occurred while fetching the weather forecast!");
    });
}

const getCityCoordinates = () => {
    const cityName = cityInput.value.trim();
    if (cityName === "") return;
    const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;
    
    // Get entered city coordinates (latitude, longitude, and name) from the API response
    fetch(API_URL).then(response => response.json()).then(data => {
        if (!data.length) return alert(`No coordinates found for ${cityName}`);
        const { lat, lon, name } = data[0];
        getWeatherDetails(name, lat, lon);
    }).catch(() => {
        alert("An error occurred while fetching the coordinates!");
    });
}

const getUserCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
        position => {
            const { latitude, longitude } = position.coords; // Get coordinates of user location
            // Get city name from coordinates using reverse geocoding API
            const API_URL = `api.openweathermap.org/data/3.0/onecall?lat=38.8&lon=12.09&callback=test`;
            fetch(API_URL).then(response => response.json()).then(data => {
                const { name } = data[0];
                getWeatherDetails(name, latitude, longitude);
            }).catch(() => {
                window.location.href = 'location.html';
            });
        },
        error => { // Show alert if user denied the location permission
            if (error.code === error.PERMISSION_DENIED) {
                alert("Geolocation request denied. Please reset location permission to grant access again.");
            } else {
                alert("Geolocation request error. Please reset location permission.");
            }
        });
}

locationButton.addEventListener("click", getUserCoordinates);
searchButton.addEventListener("click", getCityCoordinates);
cityInput.addEventListener("keyup", e => e.key === "Enter" && getCityCoordinates());


//send Message API
    document.addEventListener('DOMContentLoaded', function() {
      const username = 'k9ha5';
      const password = 'W5qusq+/Ztvy%U3';
      const apiKey = '1ec0778531567247c4182c056f917fc3-f7afcc2b-2d6b-4326-9ebe-e4a4d1ad98ad';

      document.getElementById('smsForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        const phoneNumber = document.getElementById('phone_number').value;
        const message = document.getElementById('message').value;

        const requestData = {
          from: 'Alert',
          to: phoneNumber,
          text: message
        };

        fetch('https://dk9mp1.api.infobip.com/sms/2/text/single', {
          method: 'POST',
          headers: {
            'Authorization': 'Basic ' + btoa(`${username}:${password}`),
            'Content-Type': 'application/json',
            'x-api-key': apiKey
          },
          body: JSON.stringify(requestData)
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          // Handle the successful response here
          console.log(data);
    // Redirect to another page upon successful SMS send
          window.location.href = 'success_page.html'; // Replace 'success_page.html' with the URL of your success page
        })
        .catch(error => {
          // Handle errors here
          console.error('There was an error:', error);
        });
      });
    });
    function copyContent() {
    // Get the content of the div
    var divContent = document.getElementById('content').innerText;

    // Set the content of the textarea to the div content
    document.getElementById('textarea').value = divContent;
}


//country suggestion API

const autoCompleteInput = document.querySelector('.autocompleteInput')
const submitBtn = document.querySelector('.submitBtn')
const formContainer = document.querySelector('.form_container')
const countryInfoContainer = document.querySelector('.countryInfoContainer')

autoCompleteInput.addEventListener('input', onInputChange)

getCountryData()

let countryNames = []

async function getCountryData() {
    const countryResource = await fetch('https://restcountries.com/v3.1/all')
    const data = await countryResource.json()
    // console.log(data);

    countryNames = data.map((country) => {
        return country.name.common
    })

    // console.log(countryNames);
}

function onInputChange() {

    removeAutoCompleteDropdown()

    const value = autoCompleteInput.value.toLowerCase()

    if(value.length !== 0){
        submitBtn.classList.remove('active')
    }
    else{
        submitBtn.classList.add('active')
        return
    }

    const filteredNames = []

    countryNames.forEach((countryName) => {
        if(countryName.substr(0, value.length).toLowerCase() === value)
        filteredNames.push(countryName)
    })
    // console.log(filteredNames);

    createAutoCompleteDropdown(filteredNames)
}

function createAutoCompleteDropdown(list) {
    ul = document.createElement('ul')
    ul.id = "autoCompleteList"

    list.forEach(country => {
        const li = document.createElement('li')
        const countryBtn = document.createElement('button')
        countryBtn.innerHTML = country

        countryBtn.addEventListener('click', onCountryButtonClik)

        li.appendChild(countryBtn)
        ul.appendChild(li)
    })

    formContainer.appendChild(ul)
}

function removeAutoCompleteDropdown(){
    const listEl = document.getElementById('autoCompleteList')
    if(listEl) listEl.remove()
}


function onCountryButtonClik(e) {

    const buttonEl = e.target
    autoCompleteInput.value = buttonEl.innerHTML

    removeAutoCompleteDropdown()
}





submitBtn.addEventListener('click', (e)=> {
    e.preventDefault()

    removeAutoCompleteDropdown()

    var countryInfoURL = `https://restcountries.com/v3.1/name/${autoCompleteInput.value}?fullText=true`
    fetch(countryInfoURL)
    .then((response) => {
        if(!response.ok){
            if(response.status === 404){
                throw new Error('Enter a valid country name.')
            }
            else if(response.status == 408){
                throw new Error('Request timed out')
            }
            else{
                throw new Error('Network error')
            }
        }
        return response.json()
    })
    .catch( error => {
        countryInfoContainer.innerHTML = `<h3>${'Error:', error.message}</h3>`
    })
})




