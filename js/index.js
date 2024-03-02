//ennaltamääritettyjen kaupunkien nimi+locatiot kovakoodattuna objekteina taulukkoon
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
    "name": "tampere",
    "lat": "61.49911",
    "lon": "23.78712"
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

// funktio, joka hakee syötetyn paikkakunnan säätiedot rajapinnasta,  toisesta rajapinnasta haetuilla koordinaateilla
// kun painetaan nappia tai enteriä
const button = document.querySelector('#button')
const form = document.querySelector('#formplace')
const temperatureElement = document.querySelector('#temperature-output')
const windElement = document.querySelector('#wind-output')
const nameElement = document.querySelector('#place-weather-text')

//lisätään tapahtumakäsittelijä lomakkeen submit-tapahtumalle 
form.addEventListener('submit', async (event) => {
  event.preventDefault();  //estetään lomakkeen oletustoiminto
  
  const input = document.querySelector('#inputplace').value
  if (input === '') {
    temperatureElement.innerHTML = ''
    windElement.innerHTML = ''
    return
  }
  // oletataan, että koordinaatit lat.0 ja lon.0 ei ole oikeita, koska tässä koordinaatissa ei oikeaa paikkakuntaa 
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
 
  //kutsutaan funktiota saveLocationToLocalstorage, joka tallentaa paikkakunnan localstorageen
  saveLocationToLocalStorage(upperInput)
});

//funktio, joka tallentaa localstorageen paikannimen (max.5kpl ja tarkistaa, että tätä ei vielä löydy sieltä)
const saveLocationToLocalStorage = (locationName) => {
  const savedLocations = JSON.parse(localStorage.getItem("savedLocations")) || []

  if (!savedLocations.includes(locationName)) {
    //lisätään uusi arvo listan alkuun 
    savedLocations.unshift(locationName)
  }   

  if (savedLocations.length > 5) {
    //poistetaan viimeinen arvo listassa
    savedLocations.pop()
  }

  //tallennetaan päivitetty lista LocalStorageen
  localStorage.setItem("savedLocations", JSON.stringify(savedLocations))
  console.log(localStorage.getItem("savedLocations"))

  //kutsutaan funktiota, joka näyttää localstorage historian käyttöliittymässä
  showLocalStorageHistory()
};

//funktio joka näyttää localstorageen tallennetun tiedon
const showLocalStorageHistory = () => {
  const savedLocations = JSON.parse(localStorage.getItem("savedLocations")) || []
  const locations = savedLocations.join(', ')
  const historyElement = document.querySelector('#weather-history')
  historyElement.innerHTML = locations;
};

//funktio, joka lataa säädatan kovakoodatuille paikkakunnille. 
const downloadTheData = async () => {
  // const allWeatherData = []
  for (const value of predefinedWeatherLocations) {
    //tallenetaan muuttujaan getWeatherForCoordinates-funktion rajapinnasta palauttamat säätiedot koordinaateille lat, lon
    const weatherData = await getWeatherForCoordinates(value.lat, value.lon)
    const temperatureElement = document.querySelector('#temperature-'+value.name)
    const windElement = document.querySelector('#wind-'+value.name)
   
    temperatureElement.innerHTML = weatherData.temperature + "&deg;C"
    windElement.innerHTML = weatherData.wind + "m/s"
  }
};

//kutsutaan localStorageHistory -funktiot, joka näyttää viimeisimmät localstorageeen tallennetut paikkakunnat
showLocalStorageHistory()

//kutsutaan funktiota, joka lataa säädatan
downloadTheData();





