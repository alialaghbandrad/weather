const error = document.getElementById("error");
const emailEnt = document.getElementById("email");
const form = document.getElementById("form");
const passEnt = document.getElementById("password");

form.addEventListener("submit", function (event) {

    error.innerText = "";

    var errorMessage = [];
    if (emailEnt.value === "" || emailEnt.value === null) {
        errorMessage.push("Error! Please complete the form! Email Address must be filled!")
    }
    if (passEnt.value.length <= 6) {
        errorMessage.push("Password length must be at least 6 characters!");
    }
    if (errorMessage.length > 0) {
        error.innerText = errorMessage.join(" & ");
    }
    event.preventDefault();

    if (emailEnt.value === "admin@yopmail.com" && passEnt.value === "adminyopmail") {
        $.ajax("http://dataservice.accuweather.com/forecasts/v1/daily/5day/56186?apikey=rZYGbVL9SSFTaJ7662CkHoTFR8oiBT5S&metric=true").done(requestFunc).fail(failingFunc)
    }

    function requestFunc(data) {

        for (let i = 0; i <= 5; i++) {
            const dayNum = i + 1;
            let d = new Date(2010, 7, 5);
            let theDate = data.DailyForecasts[i].Date;
            let maxVal = data.DailyForecasts[i].Temperature.Maximum.Value;
            let maxUnit = data.DailyForecasts[i].Temperature.Maximum.Unit;
            let minVal = data.DailyForecasts[i].Temperature.Minimum.Value;
            let minUnit = data.DailyForecasts[i].Temperature.Minimum.Unit;
            let dayDes = data.DailyForecasts[i].Day.IconPhrase;
            let nightDes = data.DailyForecasts[i].Night.IconPhrase;

            const montrealWeather = document.getElementById("montrealWeather");
            montrealWeather.innerText = "Weather in Montreal for the Next 5 Days";

            const theLi = document.createElement("li");
            const theUl = document.createElement("ul");
            // theLi.innerHTML = `Day ${dayNum}: \n Date: ${theDate} \n Min:${minVal} ${minUnit} \n Max:${maxVal} ${maxUnit}    Day:${dayDes}     Night: ${nightDes} `;
            theLi.innerHTML = `<p><b style="color:#812919"> Day ${dayNum}</b></p> <p><b style="color:#812919">${theDate}</b> </p> <p><b>Min:</b>${minVal} ${minUnit} <b>Max:</b>${maxVal} ${maxUnit} </p> <p><b>Day:</b>${dayDes} </p> <p> <b>Night:</b> ${nightDes} </p>`;
            console.log(theLi)
            theUl.appendChild(theLi);
            const weatherInfo = document.getElementById("weatherInfo");
            weatherInfo.appendChild(theUl);
        }

    }

    function failingFunc(){

    }

})

function messUnderForm() {
    const message = document.getElementById("message");
    // message.innerHTML = `<b>Today's message: <span style="color:green">"in init"</span></b>`;
    const date = document.getElementById("date");
    const today = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = days[today.getDay()];
    const months = ["Jan", "Feb", "March", "Apr", "May", "June", "July", "August", "Sep", "Oct", "Nov", "Dec"];
    const month = months[today.getMonth()];
    const dayNum = today.getDate();
    const year = today.getFullYear();
    date.innerHTML = `<b>Today's Date: ${day} ${month} ${dayNum} ${year}</b> `;
    const time = document.getElementById("time");
    const hour = today.getHours();
    const min = today.getMinutes();
    const sec = today.getSeconds();
    time.innerHTML = `<b>Time Now: ${hour}:${min}:${sec} </b>`
}