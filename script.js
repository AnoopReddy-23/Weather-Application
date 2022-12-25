let weather = {
  apiKey: "API KEY GOES HERE",
  fetchWeather: function (city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=edfbb71f85e1fcfb2f25c50ebd685682`
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    //console.log(data)
    const { name } = data;
    const { icon,main, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const{country} = data.sys;
    const { speed } = data.wind;
    let str=''
    if(temp<0){
      str+="Wear Double-layered hooded down jackets and Ear Muffs, Scarves and Waterproof winter boots"
    }
    if(temp>0 && temp<15){
      str+="Wear Sweaters, Jumpers, Turtlenecks, Jeans, Trousers and Scarves, Socks and Boots"
    }
    if(temp>=15){
      str+='Wear Shirts, Jeans, Trousers and Sneakers'
    }
    if(main==='Clouds'){
      str+=' and carry an umbrella'
    }
    document.querySelector(".city").innerText = "Weather in " + name + ", "+ country;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".suggestion").innerText=
      "Suggestions: " + str;
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + description + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Denver");
