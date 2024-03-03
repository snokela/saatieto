//funktio, joka hakee suomalaisen paikkakunnan koordinaatit rajapinnasta ja palauttaa paikkakunnan lat ja lon
//https://open-meteo.com/en/docs/geocoding-api/#name=tampere

const getCoordinatesForPlace = async (place) => {
  const apiURL = "https://geocoding-api.open-meteo.com/v1/search?name=" + place + ",Finland&count=10&language=en&format=json"
  try {
    const response = await fetch(apiURL)
    if (response.ok) {
      const jsonResponse = await response.json()

      return {
        lat: jsonResponse.results[0].latitude,
        lon: jsonResponse.results[0].longitude,
        // palautetaan ensimmäisen vastauksen lat ja lon
      }
    } else {
      return {
        lat: 0,
        lon: 0
      }
    }
  } catch (error) {
    console.log(error)
    return {
      lat: 0,
      lon: 0
    }
  }
};

//funktio, joka hakee rajapinnasta säätiedot koordinaateille lat, lon
//haetaan tiedot https://open-meteo.com/en/docs

const getWeatherForCoordinates = async (lat, lon) => {
  //virheentarkistusta
  if (lat === 0 && lon === 0) {
    return
  }

  const apiURL = "https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + lon + "&current=temperature_2m,wind_speed_10m&wind_speed_unit=ms"
  try {
    const response = await fetch(apiURL)
    if (response.ok) {
      const jsonResponse = await response.json()
    //console.log(jsonResponse);

      return {
        temperature: jsonResponse.current.temperature_2m, 
        wind: jsonResponse.current.wind_speed_10m
      }
    } 
  } catch (error) {
    console.log(error)
  }
};