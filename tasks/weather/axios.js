const { default: axios } = require("axios");

const getButton = document.getElementById('locationBTN');

var lat;
var lng;
var yrData = [];

var Temperature1;
var Temperature2;
var Temperature3;
var weather1;
var weather2;
var weather3;

const getData = (position) => {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
            axios.get('https://api.met.no/weatherapi/locationforecast/2.0/complete?lat='+lat+'&lon='+lng).then(response => {
                console.log(response);
                yrData = response;
                readyHTML();
            });

            
        }
    )}
};

function error(err) {
    console.log(err)
}

navigator.geolocation.getCurrentPosition(getData, error);

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
Date.prototype.addHours = function(hour) {
    this.setTime(this.getTime() + (hour*60*60*1000));
    return this;
}

function readyHTML() {
    let today = new Date().setMinutes(0);
    today = new Date(today).setSeconds(0);
    today = new Date(today).setMilliseconds(0);
    today = new Date(today).addHours(2);
    let isoDate1 = new Date(today).toISOString();
    console.log(isoDate1);

    let tommorow = new Date(today).setHours(14);
    tommorow = new Date(tommorow).addDays(1);
    let isoDate2 = new Date(tommorow).toISOString();
    console.log(isoDate2);

    let dayafter = new Date(today).setHours(14);
    dayafter = new Date(dayafter).addDays(2);
    let isoDate3 = new Date(dayafter).toISOString();
    console.log(isoDate3);

    const forecast1 = yrData.data.properties.timeseries.filter(event => (new Date(event.time)).toISOString() == isoDate1);
    const forecast2 = yrData.data.properties.timeseries.filter(event => (new Date(event.time)).toISOString() == isoDate2);
    const forecast3 = yrData.data.properties.timeseries.filter(event => (new Date(event.time)).toISOString() == isoDate3);

    console.log(forecast1);
    console.log(forecast2);
    console.log(forecast3);

    /* Start Setting weather variables of day1 (current), day2 (tommorow kl12:00) and day3 (dayaftetommorow kl12:00) */
    Temperature1 = forecast1[0].data.instant.details.air_temperature;
    Temperature2 = forecast2[0].data.instant.details.air_temperature;
    Temperature3 = forecast3[0].data.instant.details.air_temperature;
    weather1 = forecast1[0].data.next_6_hours.summary.symbol_code;
    weather2 = forecast2[0].data.next_6_hours.summary.symbol_code;
    weather3 = forecast3[0].data.next_6_hours.summary.symbol_code;
    console.log(Temperature1);
    console.log(weather1);

    viewHTML();

}
  