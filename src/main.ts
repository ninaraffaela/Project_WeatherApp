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


export type LocalWeather = {
    coord:      Coord;
    weather:    Weather[];
    base:       string;
    main:       Main;
    visibility: number;
    wind:       Wind;
    clouds:     Clouds;
    dt:         number;
    sys:        Sys;
    timezone:   number;
    id:         number;
    name:       string;
    cod:        number;
}

export type Clouds = {
    all: number;
}

export type Coord = {
    lon: number;
    lat: number;
}

export type Main = {
    temp:       number;
    feels_like: number;
    temp_min:   number;
    temp_max:   number;
    pressure:   number;
    humidity:   number;
    sea_level:  number;
    grnd_level: number;
}

export type Sys = {
    type:    number;
    id:      number;
    country: string;
    sunrise: number;
    sunset:  number;
}

export type Weather = {
    id:          number;
    main:        string;
    description: string;
    icon:        string;
}

export type Wind = {
    speed: number;
    deg:   number;
    gust:  number;
}




submitBtn.addEventListener("click", () => {
        const city = userInput.value;

fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`).then((res) => res.json()).then((data) => {
    //+ Fehler, wenn keine Stadt vorhanden 
    if (data.length === 0) {
        window.alert("Stadt nicht gefunden!"); //# warum kein alert wenn input leer? 
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