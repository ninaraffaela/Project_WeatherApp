let userInput = document.querySelector("#user-input") as HTMLInputElement;
const submitBtn = document.querySelector("#submit-btn");

const outputArea = document.querySelector("#output-area");

const localTimeOutput = document.querySelector("#api-local-time");
const windSpeedOutput = document.querySelector("#api-wind-speed");
const cloudinessOutput = document.querySelector("#api-cloudiness");
const pressureOutput = document.querySelector("#api-pressure");
const humidityOutput = document.querySelector("#api-humidity");
const sunriseOutput = document.querySelector("#api-sunrise");
const sunsetOutput = document.querySelector("#api-sunset");
const coordinatesOutput = document.querySelector("#api-coordinates");

const apiKey = "1df87bf8dc76ad9d26cf0c6d8c378325";

//*1. suche nach der Stadt, die der User eingibt
//* es gibt lat und lon zureuck
// fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${userInput.value}&appid=${apiKey}`)
//   .then(res => res.json())
//   .then(data => {
//     const lat = data[0].lat;
//     const lon = data[0].lon;

//     //* Hier kommt der zweite fetch-Aufruf hin!
//     //*2. eigentlichen Wetterdaten fetchen
//     fetch("https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}")
//       .then(res => res.json())
//       .then(weatherData => {
//         // ...
//       });
//   });

submitBtn.addEventListener("click", () => {
        const city = userInput.value;

fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`).then((res) => res.json()).then((data) => {
    //+ Fehler, wenn keine Stadt vorhanden 
    if (data.length === 0) {
        window.alert("Stadt nicht gefunden!");
        return;
    }
    
    //+ lat und lon auslesen 
    const lat = data[0].lat;
    const lon = data[0].lon;
    console.log(`Latitude: ${lat}, Longitude: ${lon}`);


    //+ eigentlichen Wetterdaten fetchen 
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=DE`).then((res) => res.json().then((data) =>{

        console.log(data)
    }))




}).catch((error) => console.log(error));
})