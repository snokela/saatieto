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
