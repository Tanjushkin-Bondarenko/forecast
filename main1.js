let link = [
    kievLink = "http://api.openweathermap.org/data/2.5/weather?id=703448&appid=bf35cac91880cb98375230fb443a116f&units=metric",
    londonLink = "http://api.openweathermap.org/data/2.5/weather?id=2643743&appid=bf35cac91880cb98375230fb443a116f&units=metric",
    newYorkLink = "http://api.openweathermap.org/data/2.5/weather?id=5128638&appid=bf35cac91880cb98375230fb443a116f&units=metric"
]

class Forecast {
    constructor() {
        this.city
        this.degree
        this.sky
        this.feelLike
        this.sky_description
        this.link;
        this.humidity,
        this.pressure,
        this.visibility,
        this.gust,
        this.speed,
        this.blockDetail
        this.blockForecust
        this.sunRise
    }
    createForecast(link) {
        fetch(link)
            .then(response => response.json())
            .then(json => {
                console.log(json)
                this.blockForecust = document.createElement("div");
                this.blockForecust.classList.add("city")
                this.divNameCity = document.createElement("div");
                this.divNameCity.classList.add("city_name_block");
                this.city = document.createElement("div");
                this.city.classList.add("name")
                this.city.innerHTML = json.name;
                this.btnFourDays = document.createElement("button");
                this.btnFourDays.classList.add("btn_seven_days");
                this.btnFourDays.innerHTML = "forecast for 7 days"
                this.divNameCity.append(this.city)
                this.divNameCity.append(this.btnFourDays)
                this.blockForecust.append(this.divNameCity)

                this.degreesBlock = document.createElement("div");
                this.degreesBlock.classList.add("degrees_block");
                this.degree = document.createElement("div");
                this.degree.classList.add("degrees");
                this.degree.innerHTML = Math.round(json.main.temp) + " C";
                this.feelsLike = document.createElement("div");
                this.feelsLike.classList.add("feels_like");
                this.feelsLike.innerHTML = "feels like" + Math.round(json.main.feels_like) + " C";
                this.btnCelsius = document.createElement("button");
                this.btnCelsius.classList.add("btn_in_celsius");
                this.btnCelsius.addEventListener("click", () => {
                    if (this.btnCelsius.innerHTML == "in Fahrenheit") {
                        this.degree.innerHTML = Math.round(json.main.temp + 273.15) + " F";
                        this.btnCelsius.innerHTML = "in Celsius"
                        this.feelsLike.innerHTML = "feels like" + Math.round(json.main.feels_like + 273.15) + " F";
                    } else {
                        this.btnCelsius.innerHTML = "in Fahrenheit";
                        this.degree.innerHTML = Math.round(json.main.temp) + " C";
                        this.feelsLike.innerHTML = "feels like" + Math.round(json.main.feels_like) + " C";
                    }
                })
                this.btnCelsius.innerHTML = "in Fahrenheit";
                this.degreesBlock.append(this.degree);
                this.degreesBlock.append(this.feelsLike);
                this.degreesBlock.append(this.btnCelsius);
                this.blockForecust.append(this.degreesBlock)

                this.skyBlock = document.createElement("div");
                this.skyBlock.classList.add("sky_block");
                this.sky = document.createElement("img");
                this.sky.classList.add("sky");
                this.sky.src = "http://openweathermap.org/img/wn/" + json.weather[0]['icon'] + "@2x.png";
                this.skyDeskription = document.createElement("div");
                this.skyDeskription.classList.add("sky_description");
                this.skyDeskription.innerHTML = json.weather[0].description;

                this.btnDetail = document.createElement("button");
                this.btnDetail.classList.add("btn_in_detail");
                this.btnDetail.textContent = "detailed forecast";

                this.skyBlock.append(this.sky);
                this.skyBlock.append(this.skyDeskription);
                this.skyBlock.append(this.btnDetail);
                this.blockForecust.append(this.skyBlock)

                this.blockDetail = document.createElement("div");
                this.blockDetail.classList.add("block_detail");
                this.blockDetail.innerHTML = "Detail forecast"
                this.sunRise = document.createElement("div");
                this.sunRise.innerHTML = "Sunrise: " + new Date(+(`${json.sys.sunrise}` + "000")).toLocaleTimeString();
                this.sunSet = document.createElement("div");
                this.sunSet.innerHTML = "Sunset: " + new Date(+(`${json.sys.sunset}` + "000")).toLocaleTimeString()
                this.blockDetail.style.display = "none"
                this.humidity = document.createElement("div");
                this.humidity.innerHTML = "Humidity: " + json.main.humidity + "%";
                this.pressure = document.createElement("div");
                this.pressure.innerHTML = "Atmospheric pressure: " + json.main.pressure + " hPa";
                this.visibility = document.createElement("div");
                this.visibility.innerHTML = "Visibility: " + json.visibility + " meter";
                this.gust = document.createElement("div");
                this.gust.innerHTML = "Wind gust: " + json.wind.gust + " meter/sec";
                this.speed = document.createElement("div");
                this.speed.innerHTML = " Wind speed: " + json.wind.speed + " meter/sec";
                this.blockDetail.append(this.sunRise)
                this.blockDetail.append(this.sunSet)
                this.blockDetail.append(this.humidity);
                this.blockDetail.append(this.pressure);
                this.blockDetail.append(this.visibility);
                this.blockDetail.append(this.speed);


                document.querySelector("main").append(this.blockForecust)
                document.querySelector("main").append(this.blockDetail)
                this.btnDetail.addEventListener("click", () => {

                    if (this.blockDetail.style.display == "none") {
                        this.blockDetail.style.display = "block"
                    } else { this.blockDetail.style.display = "none" }
                })
            })
    };
}

let kievWeatherForecast = new Forecast();
kievWeatherForecast.createForecast(kievLink);
let londonWeatherForecast = new Forecast();
londonWeatherForecast.createForecast(londonLink);
let newYorkWeatherForecast = new Forecast();
newYorkWeatherForecast.createForecast(newYorkLink);



