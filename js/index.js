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

//funktio, joka näyttää säätietokentät (lämpötila, tuulisuus) 
const showWeatherLabels = () => {
  const elements = document.querySelectorAll('span.weather-label')
  elements.forEach(element => {
    element.classList.replace('d-none', 'd-inline')   
  })
};

//funktio, joka piilottaa säätietokenttien nimet (lämpötila, tuulisuus)
const hideWeatherLabels = () => {
  const hideElements = document.querySelectorAll('span.weather-label')
  hideElements.forEach(element => {
    if (element.classList.contains('d-inline')) {
      element.classList.replace('d-inline', 'd-none')
    } 
  })
};

//funktio, joka tyhjentää nappia painamalla input kentän
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
const nameElement = document.querySelector('#place-weather-text')

button.addEventListener('click', async () => {
  const input = document.querySelector('#inputplace').value
  if (input === '') {
    temperatureElement.innerHTML = ''
    windElement.innerHTML = ''
    return
  }
  // oletataan, että koordinaatit lat.0 ja lon.0 ei ole oikeita, koska tässä koordinaatissa ei 
  //tallenetaan muuttujaan coordinates getCoordinatesForPlace-funktion palauttamat paikkakunnan koordinaatit
  const coordinates = await getCoordinatesForPlace(input)
  if  (coordinates.lat === 0 && coordinates.lon === 0) {
    alert('Annetulle paikkakunnalle ei löytynyt säätietoja!')
    return
  }

  const weatherData = await getWeatherForCoordinates(coordinates.lat, coordinates.lon)

  //jos säätietoja ei saatu haettua, tyhjennetään säätietokentät ja lopetetaan funktion suorittaminen
  if (!weatherData) {
    temperatureElement.innerHTML = ''
    windElement.innerHTML = ''
    return
  }

  //kutsutaan funktiota, joka näyttää säätietokentät (lämpötila, tuulisuus) 
  showWeatherLabels()

  //muutetaan syötetyn paikkakunnan ensimmäinen kirjain isoksi
  const upperInput =  input.charAt(0).toUpperCase() + input.slice(1)

  //näytetään arvot käyttöliittymässä
  nameElement.innerHTML = "Sää paikassa " + upperInput + ":"
  temperatureElement.innerHTML = weatherData.temperature + "&deg;C"
  windElement.innerHTML = weatherData.wind + "m/s"
 
  //kutsutaan savetolocalstorage funktiota ja tallenetaan nimi localstorageen
  saveLocationToLocalStorage(upperInput)
});

//funktio joka tallentaa localstorageen paikannimen (max.5kpl ja tarkistaa, että tätä ei vielä löydy sieltä)
const saveLocationToLocalStorage = (locationName) => {
  const savedLocations = JSON.parse(localStorage.getItem("savedLocations")) || []
  if (!savedLocations.includes(locationName)){
    savedLocations.push(locationName)
  }   
  if (savedLocations.length > 5) {
    savedLocations.shift()
    }

  //tallennetaan päivitetty lista LocalStorageen
  localStorage.setItem("savedLocations", JSON.stringify(savedLocations))
  console.log(localStorage.getItem("savedLocations"))

  //kutsutaan funktiota, joka näyttää localstorage historian käyttöliittymässä
  showLocalStorageHistory()
};

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join
//funktio joka näyttää localstorageen tallennetun tiedon
const showLocalStorageHistory = () => {
  const savedLocations = JSON.parse(localStorage.getItem("savedLocations")) || []
  const locations = savedLocations.join(', ')
  const historyElement = document.querySelector('#weather-history')
  historyElement.innerHTML = locations;
};

//https://www.w3schools.com/js/js_loop_forof.asp
//funktio, joka lataa säädatan. käytetään async/wait -koodia verkkokutsun vuoksi
const downloadTheData = async () => {
  const allWeatherData = []
  for (const value of predefinedWeatherLocations) {
    //tallenetaan muuttujaan getWeatherForCoordinates-funktion rajapinnasta palauttamat säätiedot koordinaateille lat, lon
    const weatherData = await getWeatherForCoordinates(value.lat, value.lon)
    const temperatureElement = document.querySelector('#temperature-'+value.name)
    const windElement = document.querySelector('#wind-'+value.name)
   
    temperatureElement.innerHTML = weatherData.temperature + "&deg;C"
    windElement.innerHTML = weatherData.wind + "m/s"

    //lisätään paikkakunnan nimi (esim. name:"rovaniemi" ) ja lämpötila (temperature: -4.3)allWeatherData-nimiseen listaan, kylmimmän ja lämpimimmän paikkakunnan etsimiseksi
    allWeatherData.push({ "name": value.name, "temperature": weatherData.temperature })
  }

//alustetaan kaksi taulukkoa, joissa kaksi tyhjää merkkijonoa
const warmestLocation = ["", ""]
const coldestLocation = ["", ""]

//etsitään lämpimin ja kylmin paikkakunta sekä näiden lämpötilat
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
//ennen käyttöliittymään siirtämistä, muutetaan paikkakunnan alkukirjain vielä isoksi
const warmestLocationPlace = document.querySelector('#warmest-place')
warmestLocationPlace.innerHTML = warmestLocation[0].charAt(0).toUpperCase() + warmestLocation[0].slice(1)
const warmestLocationTemperatureElement = document.querySelector('#warmest-temperature')
warmestLocationTemperatureElement.innerHTML = warmestLocation[1] + "&deg;C"

const coldestLocationPlace = document.querySelector('#coldest-place')
coldestLocationPlace.innerHTML = coldestLocation[0].charAt(0).toUpperCase() + coldestLocation[0].slice(1)
const coldestLocationTemperatureElement = document.querySelector('#coldest-temperature')
coldestLocationTemperatureElement.innerHTML = coldestLocation[1] + "&deg;C"

//kutsutaan localStorageHistory -funktiot, joka näyttää viimeisimmät localstorageeen tallennetut paikkakunnat
showLocalStorageHistory()
};

//kutsutaan funktiota, joka lataa säädatan
downloadTheData();





