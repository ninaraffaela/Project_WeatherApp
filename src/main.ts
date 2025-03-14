let userInput = document.querySelector("#user-input") as HTMLInputElement;
const submitBtn = document.querySelector("#submit-btn");

const outputArea = document.querySelector("#output-area");

let localTimeOutput = document.querySelector("#api-local-time");
let windSpeedOutput = document.querySelector("#api-wind-speed");
let cloudinessOutput = document.querySelector("#api-cloudiness");
let pressureOutput = document.querySelector("#api-pressure");
let humidityOutput = document.querySelector("#api-humidity");
let sunriseOutput = document.querySelector("#api-sunrise") as HTMLParagraphElement;
let sunsetOutput = document.querySelector("#api-sunset")as HTMLParagraphElement;
let coordinatesOutput = document.querySelector("#api-coordinates") as HTMLParagraphElement;

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




submitBtn?.addEventListener("click", () => {
        const city = userInput.value;

fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`).then((res) => res.json()).then((data) => {
    //+ Fehler, wenn keine Stadt vorhanden 
    if (data.length === undefined || data.length === 0) {
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


    
        const weatherIcon = data.weather[0].icon;
        console.log(weatherIcon);

        // - CONVERT UNIX-CODES
        const dt = data.dt;  // Zeitstempel (Sekunden seit 1970)
        const timezone = data.timezone;  // Zeitzonenoffset (Sekunden)
        const localTime = new Date((dt + timezone) * 1000).toLocaleTimeString("de-DE");

        const sunrise = data.sys.sunrise;
        const sunriseTransformed = new Date((sunrise + timezone) * 1000).toLocaleTimeString("de-DE");
        console.log(sunriseTransformed);
        
        const sunset = data.sys.sunset;
        const sunsetTransformed = new Date((sunset + timezone) * 1000).toLocaleTimeString("de-DE");
        console.log(sunsetTransformed);


        // - create OUTPUT Elements
        const outputCity = document.createElement("h2");
        outputCity.innerText = `Weather in ${city}`;
        outputCity.classList.add("output-city")

        const outputCountry = document.createElement("p");
        outputCountry.innerText = data.sys.country;
        outputCountry.classList.add("output-country")

       

        const outputIcon = document.createElement("img");
        outputIcon.src = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
        outputIcon.classList.add("output-icon");
        
        

        const outputTemp = document.createElement("p");
        outputTemp.innerText = `${data.main.temp}°`;
        outputTemp.classList.add("output-icon");

        const iconContainer = document.createElement("div");
        iconContainer.append(outputIcon, outputTemp)

        const outputDescription = document.createElement("p");
        outputDescription.innerText = data.weather[0].description;
        outputDescription.classList.add("output-description");

        outputArea?.append(outputCity, outputCountry, iconContainer, outputDescription )



        

        if (localTimeOutput) {
            localTimeOutput.textContent = localTime;
        }

        windSpeedOutput = data.wind.speed;
        cloudinessOutput = data.clouds.all
        pressureOutput = data.main.pressure;
        humidityOutput = data.main.humidity;
        sunriseOutput.textContent = sunriseTransformed;
        sunsetOutput.textContent = sunsetTransformed;
        coordinatesOutput.textContent = `${lat}, ${lon}`;
        
        
        console.log(localTimeOutput, windSpeedOutput, cloudinessOutput, pressureOutput, humidityOutput, sunriseOutput, sunsetOutput, coordinatesOutput);

        
        
        


    }))
    




}).catch((error) => console.log(error));
})