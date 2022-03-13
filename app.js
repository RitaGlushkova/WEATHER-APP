window.addEventListener("load", () => {
  let lon;
  let lat;
  let temperatureDescription = document.querySelector(".temprature-decription");
  let temperatureDegree = document.querySelector(".temperature-degree");
  let timezone = document.querySelector(".location-timezone");
  let weatherIcon = document.querySelector("img");
  let temperatureSection = document.querySelector(".temperature-section");
  let temperatureSpan = document.querySelector(".temperature-section span");

  function changeKelvinToCelsius(t) {
    return t - 273.15;
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      console.log(position);
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a91dc4f621cbeae0e61c58b5d0849c5d`;
      console.log(api);
      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const temperature = data.main.temp;
          const description = data.weather[0].description;
          //set DOM Elements from the API
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = description;
          timezone.textContent = data.name + " / " + data.sys.country;
          //set icons
          weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
          // Change temperature to Celcius/K
          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "K") {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor(changeKelvinToCelsius(temperature));
            } else {
              temperatureSpan.textContent = "K";
              temperatureDegree.textContent = temperature;
            }
          });
        });
    });
  }
});
