var Score = 0;
var Number1 = 1;
var Number2 = 7;

function resetAll() {
    Score = 0;
    updateNumbers();
    updateScore();
}
function updateScore() {
    document.getElementById('score').innerHTML = Score;
}
function updateNumbers() {
    Number1 = getRNG();
    Number2 = getRNG();
    document.getElementById('number1').innerHTML = Number1;
    document.getElementById('number2').innerHTML = Number2;
}
function getRNG() {
    return Math.round(Math.random() * 10);
}


function submitAnswer() {
    let Answer = document.getElementById('answer').value;
    if (Answer == "="){
        if (Number1 == Number2) {
            Score++;
            updateScore();
            updateNumbers();
        }
        else {
            Score--;
            updateScore();
            updateNumbers();
        }
    }
    if (Answer == "<"){
        if (Number1 < Number2) {
            Score++;
            updateScore();
            updateNumbers();
        }
        else {
            Score--;
            updateScore();
            updateNumbers();
        }
    }
    if (Answer == ">"){
        
        if (Number1 > Number2) {
            Score++;
            updateScore();
            updateNumbers();
        }
        else {
            Score--;
            updateScore();
            updateNumbers();
        }
    }
}