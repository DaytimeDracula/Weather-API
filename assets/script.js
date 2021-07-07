//Global variables
var apiKey ="093213c73593aaf289efebaa7e65679c"
var searchBtn =document.querySelector("#search-button");
var baseClass ="fas fa-";
var weatherKeys={};
var today=new Date().toLocaleDateString();
var city =document.querySelector("#city-name");
var temperature=document.querySelector("#temp");
var wind=document.querySelector("#wind");
var humidity=document.querySelector("#humidity");
var statusElement=document.createElement("span");
var geolocationQueryUrl="https://api.openweathermap.org/geo/1.0/direct?q="+searchValue+"&units=imperial&appid="+apiKey;
//Weather icon key values
weatherKeys["clouds"]=baseClass+"cloud-sun";
weatherKeys["clear"]=baseClass+"sun";
weatherKeys["snow"]=baseClass+"snowflake";
weatherKeys["drizzle"]=baseClass+"cloud-sun-rain";
weatherKeys["rain"]=baseClass+"cloud-rain";
weatherKeys["thunderstorm"]=baseClass+"bolt";
//Array to store searchable cities
var citiesList=[];
localStorage.setItem("city",JSON.stringify(searchValue));
citiesList.push(JSON.parse(localStorage.getItem("city")));
//Event listener
searchBtn.addEventListener("click",searchValue);

//Find location of city
fetch(geolocationQueryUrl)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            var lon = data[0].lon;
            var lat = data[0].lat;

//Gets current weather conditions for city
function getCurrentWeather(searchValue){
    var queryUrl =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        searchValue +
        "&units=imperial&appid=" +
        apiKey;

    fetch(queryUrl)
        .then(function (res){
            return res.json();
        })
        .then(function (data){
            console.log(data);
            var descriptionKey = data.weather[0].main.toLowerCase();
            var descriptionValueClass = weatherKeys[descriptionKey];

            //Initial values
            city.innerHTML = "";
            statusElement.innerHTML = "";
            temperature.innerHTML = "temperature: ";
            wind.innerHTML = "Wind: ";
            humidity.innerHTML = "Humidity: ";
            statusElement.innerHTML =
                " " + '<i class="' + descriptionValueClass + '"></i>';
            //Replaces initial values with actual current weather values
            city.append(data.name + " " + "(" + today + ")");
            city.append(statusElement);
            temperature.append(data.main.temperature + "\u00B0F");
            wind.append(data.wind.speed + " MPH");
            humidity.append(data.main.humidity + "%");