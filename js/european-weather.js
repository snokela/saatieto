//valmiiksi määritellyt euroopankaupungit
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
];

//https://www.w3schools.com/js/js_loop_forof.asp
document.addEventListener("DOMContentLoaded", async (event) => {
  for (const value of europePredefinedWeatherLocations) {
    const weatherData = await getWeatherForCoordinates(value.lat, value.lon)

    const temperatureElement = document.querySelector('#temperature-'+value.name)
    const windElement = document.querySelector('#wind-'+value.name)
   
    temperatureElement.innerHTML = weatherData.temperature + "&deg;C"
    windElement.innerHTML = weatherData.wind + "m/s"
  }
});