
var timer;
var seconds = 0;
var minutes = 0;
var hours = 0;
const stopwatch = document.getElementById("clock");

function stopwatchStart() {
    timer = setInterval(doSeconds, 1000);
}
function doSeconds() {
    seconds++;

    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }
    if (minutes >= 60) {
        minutes = 0;
        hours++;
    }
    var TimeStamp = "";
    if (hours <= 9) {
        TimeStamp = "0" + hours + ":";
    }
    else {
        TimeStamp = hours + ":";
    }

    if (minutes <= 9) {
        TimeStamp += "0" + minutes + ":";
    }
    else {
        TimeStamp += minutes + ":";
    }

    if (seconds <= 9) {
        TimeStamp += "0" + seconds;
    }
    else {
        TimeStamp += seconds;
    }
    document.getElementById("clock").innerHTML = TimeStamp;
}
function stopwatchPause() {
    clearInterval(timer);
}
function stopwatchRound() {
    var TimeStamp = "";
    if (hours <= 9) {
        TimeStamp = "0" + hours + ":";
    }
    else {
        TimeStamp = hours + ":";
    }

    if (minutes <= 9) {
        TimeStamp += "0" + minutes + ":";
    }
    else {
        TimeStamp += minutes + ":";
    }

    if (seconds <= 9) {
        TimeStamp += "0" + seconds;
    }
    else {
        TimeStamp += seconds;
    }
    document.getElementById("times").innerHTML += TimeStamp + "<br>";
}

function stopwatchStop() {
    location.reload();
}