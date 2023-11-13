"use strict";

let HTMLcode = document.getElementById('myHTML');
let raceTimeConverted = [];
const raceTimes = [
    "31:17",
    "42:28",
    "29:55",
    "32:34",
    "31:43",
    "43:52",
    "44:22",
    "29:04",
    "34:52",
    "39:14"
  ];


function viewHTML() {
    ConvertToSeconds();
    let SortedList = raceTimeConverted.sort(function(a, b) {
        return a.seconds - b.seconds;
    })

    console.log(SortedList);

    let newhtml = /*HTML*/`
        <div>${SortedList[0].raceTime}</div><br>
        <div>${SortedList[1].raceTime}</div><br>
        <div>${SortedList[2].raceTime}</div><br>
        <br><br>${StiansMetode()}
        `;

    HTMLcode.innerHTML = newhtml;
}

function ConvertToSeconds() {
    for (let i=0; i<raceTimes.length; i++) {
        let seconds = 0;
        let splittedNumber = raceTimes[i].split(':');
        seconds = (splittedNumber[0] * 60) + splittedNumber[1];

        raceTimeConverted.push({seconds, raceTime: raceTimes[i]});
    }
}

function StiansMetode() {
    let fastestTime = '99:99';

    for (let i = 0; i < raceTimes.length; i++) {
        
        if (raceTimes[i] < fastestTime) {
            fastestTime = raceTimes[i];
        }
    }

    return fastestTime;
}

viewHTML();