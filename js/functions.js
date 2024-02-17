//funktio joka hakee rajapinnasta säätiedot koordinaateille lat, lon
//haetaan tiedot https://open-meteo.com/
//https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
const getWeatherForCoordinates = async (lat, lon) => {
  //virheentarkistusta
  if (lat === 0 || lon === 0) {
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

//funktio joka hakee paikkakunnan koordinaatit
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

// funktio joka hakee syötetyn paikkakunnan sään toisesta rajapinnasta haetuilla koordinaateilla, kun painetaan nappia
const button = document.querySelector('#button')
const temperatureElement = document.querySelector('#temperature-output')
const windElement = document.querySelector('#wind-output')
button.addEventListener('click', async () => {
  const input = document.querySelector('#inputplace').value
  const coordinates = await getCoordinatesForPlace(input)
  console.log(coordinates)
  const weatherData = await getWeatherForCoordinates(coordinates.lat, coordinates.lon)
  console.log(weatherData)

  //jos säätietoja ei saatu haettua, tyhjennetään säätietokentät ja lopetettan funktion suorittaminen
  if (weatherData === null) {
    temperatureElement.innerHTML = ''
    windElement.innerHTML = ''
    return
  }

  temperatureElement.innerHTML = "Lämpötila " + weatherData.temperature + "&deg;C"
  windElement.innerHTML = "Tuulisuus " + weatherData.wind + "m/s"
});


//luodaan funktio joka tyhjentää nappia painamalla input kentän sekä lämpötilan ja tuulisuuden
const clearButton = document.querySelector('#clear-button')
clearButton.addEventListener('click', () => {
  document.querySelector('#inputplace').value = ''
  temperatureElement.innerHTML = ''
  windElement.innerHTML = ''
});


//ennaltamääritettyjen kaupunkien nimi+locatiot kovakoodattuna objekteina taulukkoon
// https://appro.mit.jyu.fi/tiea2120/luennot/javascript_basics/#TOC22
const predefinedWeatherLocations = [
  {
    "name": "rovaniemi",
    "lat": "66.5",
    "lon": "25.71667"
  },
  {
    "name": "oulu",
    "lat": "65.01236",
    "lon": "25.46816"
  },
  {
    "name": "jyvaskyla",
    "lat": "62.24147",
    "lon": "25.72088"
  },
  {
    "name": "helsinki",
    "lat": "	60.16952",
    "lon": "24.93545"
  },

];

// https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
// kuunnellaan domcontetloaded eventia ja käydään läpi kaikki ennaltamääritellyt kaupungit
// haetaan myös syötetylle paikkakunnalle lämpötila ja tuulisuus 
document.addEventListener("DOMContentLoaded", async (event) => {
  //https://www.w3schools.com/js/js_array_iteration.asp
  predefinedWeatherLocations.forEach(async (value) => {
    const weatherData = await getWeatherForCoordinates(value.lat, value.lon)
    const temperatureElement = document.querySelector('#temperature-'+value.name);
    const windElement = document.querySelector('#wind-'+value.name);
  
    temperatureElement.innerHTML = weatherData.temperature + "&deg;C"
    windElement.innerHTML = weatherData.wind + "m/s"
  })
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
