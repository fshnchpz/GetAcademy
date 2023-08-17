let AnswerArray = [
    "Ja", "Nei", "Tror ikke det", "Ingen tvil", "404 SVAR fantes ikke", "Bryr meg ikke, GET er kult"
];
let Answer = "";
let PreviousAnswer = 0;
let Question ="";
function html() {
    let html = /*HTML*/ `
    <div class="center"> <h1>Magic 8 Ball</h1> </div>
    <div class="divider"></div>
    <div class="center col" style="margin-top: 50px">
        <div class="eight_ball">${Answer}</div>
    </div>
    <div class="divider"></div>
    <h2 class="center">Skriv ja/nei spørsmål</h2>
    <input onChange="getAnswer(this.value)" value="${Question}"></input>
    `;

    document.getElementById('html').innerHTML = html;
}

function getAnswer(inputQuestion) {
    if (inputQuestion == "") {
        return;
    }
    Question = inputQuestion;
    let RNGi = Math.floor(Math.random() * AnswerArray.length);

    if (RNGi == PreviousAnswer) {
        getAnswer();
    }
    else {
        Answer = AnswerArray[RNGi];
        PreviousAnswer = RNGi;
        html();
    }
}