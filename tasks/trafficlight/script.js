var turnReady = true;
var currentLight = 'green';

function turnAllOff() {
    document.getElementById('green').innerHTML = "";
    document.getElementById('red').innerHTML = "";
    document.getElementById('yellow').innerHTML = "";
}

function turnLight(color){
    turnAllOff();
    
    document.getElementById(color).innerHTML = `<div id="${color}" class="light_active ${color}_active"></div>`;
}

function turnRed() {
    if (turnReady) {
        turnReady = false;
        setTimeout(goRed, 2000);
        turnReady = true;
        currentLight = 'red';
    }
}
function turnYellowRed() {
    if (turnReady) {
        turnReady = false;
        setTimeout(goYellowRed, 1000);
        turnReady = true;
        currentLight = 'red';
    }
}
function turnGreen() {
    if (turnReady) {
        turnReady = false;
        setTimeout(goGreen, 2000);
        turnReady = true;
        currentLight = 'green';
    }
}

function goRed() {
    turnLight('red');
}
function goYellowRed() {
    turnLight('yellow');
    setTimeout(goRed, 1000);
}
function goGreen() {
    turnLight('green');
}