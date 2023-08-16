let weather = {
    apiKey : "7eacaaac26050e98f78010ed68052dd9", // OpenWeatherMap API
    
    // retrieves data from API
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city 
            + "&units=metric&appid=" 
            + this.apiKey
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },

    // extracts relevant information
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name,icon,description,temp,humidity,speed);
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = 
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: "  + speed + "km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900?" + name + "')";
    },

    // retrieves user input and calls fetchWeather
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

// when search button is clicked, call weather.search()
document
.querySelector(".search button")
.addEventListener("click", function () {
    weather.search();
});

// when Enter key is pressed after input, call weather.search()
document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

// Initially fetches info for Toronto
weather.fetchWeather("Toronto");