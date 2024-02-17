//funktio joka hakee rajapinnasta säätiedot koordinaateille lat, lon
//haetaan tiedot https://open-meteo.com/
//https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
const getWeatherForCoordinates = async (lat, lon) => {
  //virheentarkistusta
  if (lat === 0 && lon === 0) {
    return
  }

  const apiURL = "https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + lon + "&current=temperature_2m,wind_speed_10m&wind_speed_unit=ms"
  const response = await fetch(apiURL)
  const jsonResponse = await response.json()
  //console.log(jsonResponse);

  return {
    temperature: jsonResponse.current.temperature_2m, 
    wind: jsonResponse.current.wind_speed_10m
  }
};

//funktio, joka hakee paikkakunnan koordinaatit ja palauttaa lat ja long
const getCoordinatesForPlace = async (place) => {
  const apiURL = "https://geocoding-api.open-meteo.com/v1/search?name=" + place + "&count=10&language=en&format=json"
  const response = await fetch(apiURL)
  const jsonResponse = await response.json()
  // console.log(jsonResponse)

//jos syötetään siansaksaa > konsolissa virhe > tehdään virheentarkistusta  
//jos apilta ei saada vastausta, palautetaan koordinaateiksi nolla
  if (jsonResponse && jsonResponse.results === undefined) {
    return {
      lat: 0,
      lon: 0
    }
  }

  return {
    lat: jsonResponse.results[0].latitude,
    lon: jsonResponse.results[0].longitude
  }
};


// document.addEventListener("DOMContentLoaded", async (event) => {
//   //https://www.w3schools.com/js/js_array_iteration.asp
//   for (const value of europePredefinedWeatherLocations) {
//     const weatherData = await getWeatherForCoordinates(value.lat, value.lon)

//     const temperatureElement = document.querySelector('#temperature-'+value.name)
//     const windElement = document.querySelector('#wind-'+value.name)
   
//     temperatureElement.innerHTML = weatherData.temperature + "&deg;C"
//     windElement.innerHTML = weatherData.wind + "m/s"
//   }
// });


//toiminto, josssa etsitään paikkakuntakohtaisen sään lämpimin ja kylmin paikkakunta
/*
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

// //etsitään lämpimin paikkakunta
// const hottestLocation = ["rovaniemi", "-100"]
// // const coldestLocation = ["rovaniemi", "100"]

// for (location in weatherLocations) {
//   const weatherData = getWeatherForCoordinates(location.lat, location.lon)

//   if (weatherData.temperature > hottestLocation[1]) {
//     hottestLocation[0] = location.name
//     hottestLocation[1] = weatherData.temperature
//   }

//   locationElement = document.querySelector('#warmest-place')
//   temperatureElement = document.querySelector('warmest-temperature')

//   locationElement.innerHTML = hottestLocation
//   temperatureElement.innerHTML = weatherData.temperature
// };


  //https://www.w3schools.com/jsref/jsref_map.asp
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
  // const warmestTemperature = Math.max(...allWeatherData.map(data => data.temperature))
  // console.log(warmestTemperature)
  // const warmestCity = allWeatherData.find(data => data.temperature === warmestTemperature).value.name

  // const coldestTemperature = Math.min(...allWeatherData.map(data => data.temperature))
  // const coldestCity = allWeatherData.find(data => data.temperature === coldestTemperature).value.name

  // const warmestPlace = document.querySelector('#warmest-place')
  // const warmestTemperaturePlace = document.querySelector('#warmest-temperature')
  // warmestPlace.innerHTML = warmestCity
  // warmestTemperaturePlace.innerHTML = warmestTemperature

  // const coldestPlace = document.querySelector('#coldest-place')
  // const coldestTemperaturePlace = document.querySelector('#coldest-temperature')
  // coldestPlace.innerHTML = coldestCity
  // coldestTemperaturePlace.innerHTML = coldestTemperature