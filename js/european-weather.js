//valmiiksi määritellyt euroopankaupungit ja niiden koordinaatit
const europePredefinedWeatherLocations = [
  {
    "name": "tukholma",
    "lat": "59.32938",
    "lon": "18.06871"
  },
  {
    "name": "oslo",
    "lat": "59.91273",
    "lon": "10.74609"
  },
  {
    "name": "praha",
    "lat": "50.08804",
    "lon": "14.42076"
  },
  {
    "name": "berliini",
    "lat": "52.52437",
    "lon": "13.41053"
  },
  {
    "name": "pariisi",
    "lat": "59.27861",
    "lon": "26.13361"
  },
  {
    "name": "lontoo",
    "lat": "51.50853",
    "lon": "-0.12574"
  },
  {
    "name": "reykjavik",
    "lat": "64.13548",
    "lon": "-21.89541"
  },
  {
    "name": "amsterdam",
    "lat": "52.37403",
    "lon": "4.88969"
  },
  {
    "name": "varsova",
    "lat": "52.22977",
    "lon": "21.01178"
  },
];

//Funktio, joka lataa säätiedot kovakoodatuille kaupungeille. Tässä funktiossa kutsutaan funktiota joka hakee koordinaateille säätiedot
const allWeatherData = []
const downloadTheData = async () => {
  for (const value of europePredefinedWeatherLocations) {
    const weatherData = await getWeatherForCoordinates(value.lat, value.lon)

    const temperatureElement = document.querySelector('#temperature-'+value.name)
    const windElement = document.querySelector('#wind-'+value.name)
   
    temperatureElement.innerHTML = weatherData.temperature + "&deg;C"
    windElement.innerHTML = weatherData.wind + "m/s"

    //lisätään paikkakunnan nimi (esim. name:"reykjavik" ) ja lämpötila (temperature: -4.3)
    //allWeatherData-nimiseen listaan, kylmimmän ja lämpimimmän paikkakunnan etsimiseksi
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
  }

  //ennen käyttöliittymässä näyttämistä, muutetaan paikkakunnan nimen alkukirjain isoksi
  const warmestLocationPlace = document.querySelector('#warmest-place')
  warmestLocationPlace.innerHTML = warmestLocation[0].charAt(0).toUpperCase() + warmestLocation[0].slice(1)
  const warmestLocationTemperatureElement = document.querySelector('#warmest-temperature')
  warmestLocationTemperatureElement.innerHTML = warmestLocation[1] + "&deg;C"

  const coldestLocationPlace = document.querySelector('#coldest-place')
  coldestLocationPlace.innerHTML = coldestLocation[0].charAt(0).toUpperCase() + coldestLocation[0].slice(1)
  const coldestLocationTemperatureElement = document.querySelector('#coldest-temperature')
  coldestLocationTemperatureElement.innerHTML = coldestLocation[1] + "&deg;C"
};

//kutsutaan funktiota, joka lataa säätiedot
downloadTheData();