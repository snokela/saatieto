//funktio, joka hakee rajapinnasta säätiedot koordinaateille lat, lon
//haetaan tiedot https://open-meteo.com/
//https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// const getWeatherForCoordinates = async (lat, lon) => {
//   //virheentarkistusta
//   if (lat === 0 && lon === 0) {
//     return
//   }

//   const apiURL = "https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + lon + "&current=temperature_2m,wind_speed_10m&wind_speed_unit=ms"
//   const response = await fetch(apiURL)
//   const jsonResponse = await response.json()
//   //console.log(jsonResponse);

//   return {
//     temperature: jsonResponse.current.temperature_2m, 
//     wind: jsonResponse.current.wind_speed_10m
//   }
// };
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

// //funktio, joka hakee suomalaisen paikkakunnan koordinaatit rajapinnasta ja palauttaa lat ja lon
// const getCoordinatesForPlace = async (place) => {
//   const apiURL = "https://geocoding-api.open-meteo.com/v1/search?name=" + place + ",Finland&count=10&language=en&format=json"
//   console.log(apiURL)
//   const response = await fetch(apiURL)
//   const jsonResponse = await response.json()
//   console.log(jsonResponse)
//   // console.log(jsonResponse)

// //jos syötetään siansaksaa > konsolissa virhe > tehdään virheentarkistusta  
// //jos apilta ei saada vastausta, palautetaan koordinaateiksi nolla ja nolla. koordinaatit 0 ja 0 paikassa ei 
// //ole mitään kaupunkia, vaikka koordinaatti todellisuudessa on oikea.
//   if (!jsonResponse || (jsonResponse && !jsonResponse.results)) {
//     return {
//       lat: 0,
//       lon: 0
//     }
//   }

//   return {
//     lat: jsonResponse.results[0].latitude,
//     lon: jsonResponse.results[0].longitude,
//     // name: jsonResponse.results[0].name  //"name": "Raahe"
//   }
// };

//funktio, joka hakee suomalaisen paikkakunnan koordinaatit rajapinnasta ja palauttaa lat ja lon
const getCoordinatesForPlace = async (place) => {
  const apiURL = "https://geocoding-api.open-meteo.com/v1/search?name=" + place + ",Finland&count=10&language=en&format=json"
  try {
    const response = await fetch(apiURL)
    if (response.ok) {
      const jsonResponse = await response.json()

    //jos syötetään siansaksaa > konsolissa virhe > tehdään virheentarkistusta  
    //jos apilta ei saada vastausta, palautetaan koordinaateiksi nolla ja nolla. koordinaatit 0 ja 0 paikassa ei 
    //ole mitään kaupunkia, vaikka koordinaatti todellisuudessa on oikea.
      if (!jsonResponse || (jsonResponse && !jsonResponse.results)) {
        return {
          lat: 0,
          lon: 0
        }
      }

      return {
        lat: jsonResponse.results[0].latitude,
        lon: jsonResponse.results[0].longitude,
        // name: jsonResponse.results[0].name  //"name": "Raahe"
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