//funktio joka hakee rajapinnasta säätiedot koordinaateille lat, lon
//haetaan tiedot https://open-meteo.com/
//https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
const getWeatherForCoordinates = async (lat, lon) => {
  const apiURL = "https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + lon + "&current=temperature_2m,wind_speed_10m&wind_speed_unit=ms"
  const response = await fetch(apiURL);
  const jsonResponse = await response.json();
  console.log(jsonResponse);

  return {
    temperature: jsonResponse.current.temperature_2m, 
    wind: jsonResponse.current.wind_speed_10m
  }
}

// https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
// kuunnellaan domcontetloaded eventia
document.addEventListener("DOMContentLoaded", async (event) => {
  // paikkakunnan rovaniemi lämpötila ja tuulisuus
  const rovaniemiTemperature = document.querySelector('#temperature-rovaniemi')
  const rovaniemiWind = document.querySelector('#wind-rovaniemi')
  const rovaniemiWeather = await getWeatherForCoordinates('66.5', '25.71667')
  // console.log("rovaniemiWeather sisältää:")
  // console.log(rovaniemiWeather);
  rovaniemiTemperature.innerHTML = rovaniemiWeather.temperature + "&deg;C"
  rovaniemiWind.innerHTML = rovaniemiWeather.wind + "m/s"
});

/*
const predefinedWeatherLocations = [
  {
    "name": "rovaniemi",
    "lat": "12,54",
    "lon": "65,23"
  },
  {
    "name": "oulu",
    "lat": "15,11",
    "lon": "69,75"
  },
];

const hottestLocation = ["rovaniemi", "-100"];

for (location in weatherLocations) {
  const weatherData = getWeatherForCoordinates(location.lat, location.lon);

  if (weatherData.temperature > hottestLocation[1]) {
    hottestLocation[0] = location.name;
    hottestLocation[1] = weatherData.temperature;
  } 

  const temperatureElement = document.querySelector('#temperature-'+location.name);
  const windElement = document.querySelector('#wind-'+location.name);

  temperatureElement.innerHTML = weatherData.temperature;
  windElement.innerHTML = weatherData.wind;
}
*/
