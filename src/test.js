let now = new Date();


let timeDate = document.querySelector("#current-date");
let time = document.querySelector("#current-time");

let year = now.getFullYear();
let date = now.getDate();

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let month = months[now.getMonth()];

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];

let hour = now.getHours();
if (hour < 10) {
    hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
    minute = `0${minute}`;
}

timeDate.innerHTML = ` ${day}, ${month} ${date}, ${year}`;
time.innerHTML = `Current time: ${hour}:${minute}`;

function searchPlace(event) {
    event.preventDefault();
    let newCity = document.querySelector("#search-input");
    //let replaceCity = document.querySelector("#current-city");
    newCity = newCity.value;
    //newCity = newCity.toUpperCase();
    //replaceCity.innerHTML = `Current place: ${newCity}`;

    /* console.log(newCity); */

    function showTemperature(response) {
        event.preventDefault();
        let degree = document.querySelector("#degreeShow");
        let temperature = Math.round(response.data.main.temp);
        degree.innerHTML = `${temperature}`;
        document.querySelector("#current-city").innerHTML = response.data.name;
        document.querySelector("#high-temp").innerHTML = Math.round(response.data.main.temp_max);
        document.querySelector("#low-temp").innerHTML = Math.round(response.data.main.temp_min);
        //console.log(response.data.main);

        document.querySelector("#humidity").innerHTML = response.data.main.humidity;
        document.querySelector("#wind").innerHTML = Math.round(
            response.data.wind.speed);
        document.querySelector("#description").innerHTML =
            response.data.weather[0].main;

    };
    let apiKey = "c7c6992fb4b628387a33963036074203";
    let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather?";
    let apiUrl = `${apiEndPoint}q=${newCity}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(showTemperature);


}

let button = document.querySelector("button");
button.addEventListener("click", searchPlace);

function showPosition(position) {

    let h3 = document.querySelector("h3");
    let latitude = position.coords.latitude;
    latitude = latitude.toFixed(2);
    let longitude = position.coords.longitude;
    longitude = longitude.toFixed(2);
    h3.innerHTML = `Your Latitude is ${latitude} and Your Longitude is ${longitude} `;
}


function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(showPosition);
}

let gPS = document.querySelector("button1");
gPS.addEventListener("click", getCurrentPosition);
