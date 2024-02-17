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
  }
];

//tehdään oma funktio joka näyttää säätietokenttien nimet
//https://getbootstrap.com/docs/5.0/utilities/text/
const showWeatherLabels = () => {
  const elements = document.querySelectorAll('span.weather-label')
  elements.forEach(element => {
    element.classList.replace('d-none', 'd-inline')   
  })
};

//tehdään funktio joka poistaa säätietokenttien nimet näkyvistä
const hideWeatherLabels = () => {
  const hideElements = document.querySelectorAll('span.weather-label')
  hideElements.forEach(element => {
    if (element.classList.contains('d-inline')) {
      element.classList.replace('d-inline', 'd-none')
    } else {
      element.classList.replace('d-none', 'd-inline')
    }
  })
};

//luodaan funktio joka tyhjentää nappia painamalla input kentän sekä lämpötilan ja tuulisuuden
const clearButton = document.querySelector('#clear-button')

clearButton.addEventListener('click', () => {
  const emptyInputPlace = document.querySelector('#inputplace')
  emptyInputPlace.value = ''
  temperatureElement.innerHTML = ''
  windElement.innerHTML = '' 
  //kutstutaan funktiota, joka piilottaa säätietokenttien nimet, kun tyhjennä-nappia painetaan
  hideWeatherLabels()
});

// funktio joka hakee syötetyn paikkakunnan sään toisesta rajapinnasta haetuilla koordinaateilla, kun painetaan nappia
const button = document.querySelector('#button')
const temperatureElement = document.querySelector('#temperature-output')
const windElement = document.querySelector('#wind-output')

button.addEventListener('click', async () => {
  const input = document.querySelector('#inputplace').value
  const coordinates = await getCoordinatesForPlace(input)
  const weatherData = await getWeatherForCoordinates(coordinates.lat, coordinates.lon)

  //jos säätietoja ei saatu haettua, tyhjennetään säätietokentät ja lopetetaan funktion suorittaminen
  if (weatherData === null) {
    temperatureElement.innerHTML = ''
    windElement.innerHTML = ''
    return
  }
  //kutsutaan funktiota showWeatherLabels
  showWeatherLabels()

  temperatureElement.innerHTML = weatherData.temperature + "&deg;C"
  windElement.innerHTML = weatherData.wind + "m/s"
});


//https://www.w3schools.com/js/js_loop_forof.asp
// https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
// kuunnellaan domcontetloaded eventia ja käydään läpi kaikki ennaltamääritellyt paikat ja kaupungit
// haetaan myös syötetylle paikkakunnalle lämpötila ja tuulisuus 
document.addEventListener("DOMContentLoaded", async (event) => {
  const allWeatherData = []
  for (const value of predefinedWeatherLocations) {
    const weatherData = await getWeatherForCoordinates(value.lat, value.lon)
    const temperatureElement = document.querySelector('#temperature-'+value.name)
    const windElement = document.querySelector('#wind-'+value.name)
   
    temperatureElement.innerHTML = weatherData.temperature + "&deg;C"
    windElement.innerHTML = weatherData.wind + "m/s"

    allWeatherData.push({ "name": value.name, "temperature": weatherData.temperature })
  }

// name:"rovaniemi"
// temperature: -4.3

const warmestLocation = ["", ""]
const coldestLocation = ["", ""]

//etsitään lämpimin ja kylmin paikkakunta sekä lämpötilat
for (const location of allWeatherData) {
  if (warmestLocation[0] === "")  {
    warmestLocation[0] = location.name
    warmestLocation[1] = location.temperature
  } else {
    if (location.temperature > warmestLocation[1]) {
      warmestLocation[0] = location.name
      warmestLocation[1] = location.temperature
    }
  }
  if (coldestLocation[0] === "")  {
    coldestLocation[0] = location.name
    coldestLocation[1] = location.temperature
  } else {
    if (location.temperature < coldestLocation[1]) {
      coldestLocation[0] = location.name
      coldestLocation[1] = location.temperature
    }
  }
};

//https://www.w3schools.com/jsref/jsref_touppercase.asp
//https://sentry.io/answers/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript/
const warmestLocationPlace = document.querySelector('#warmest-place')
warmestLocationPlace.innerHTML = warmestLocation[0].charAt(0).toUpperCase() + warmestLocation[0].slice(1)
const warmestLocationTemperatureElement = document.querySelector('#warmest-temperature')
warmestLocationTemperatureElement.innerHTML = warmestLocation[1] + "&deg;C"

const coldestLocationPlace = document.querySelector('#coldest-place')
coldestLocationPlace.innerHTML = coldestLocation[0].charAt(0).toUpperCase() + coldestLocation[0].slice(1)
const coldestLocationTemperatureElement = document.querySelector('#coldest-temperature')
coldestLocationTemperatureElement.innerHTML = coldestLocation[1] + "&deg;C"
});
