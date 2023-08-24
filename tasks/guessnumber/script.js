let HTMLcode = document.getElementById('myHTML');
let answer_image = "";
let randomNumber;

scrambleNum();

function viewHTML() {
    let newhtml = /*HTML*/`
    
        <div class="center col">
            <div id="answerImg">${answer_image}</div>
            <input id="answer" value="0" type="number" min="0" max="9">
        </div>
        <div class="center row">
            <button onClick="guess()">Guess number</button>
        </div>
        `;

    HTMLcode.innerHTML = newhtml;
}
function scrambleNum() {
    randomNumber = Math.floor(Math.random() * 9);
}

function guess() {
    scrambleNum();
    let num = parseInt(document.getElementById('answer').value);
    if (num === randomNumber){
        answer_image = /*HTML*/`<img src="img/guess_correct.png"/>`;
    }
    else if (num < randomNumber){
        answer_image = /*HTML*/`<img src="img/guess_higher.png"/>`;
    }
    else if (num > randomNumber){
        answer_image = /*HTML*/`<img src="img/guess_lower.png"/>`;
    }
    document.getElementById('answer').value = 0;
    viewHTML();
}

viewHTML();