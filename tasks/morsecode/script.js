let HTMLcode = document.getElementById('myHTML');
let text_innerhtml = "";
let morse_innerhtml = "";
const alphabet = "abcdefghijklmnopqrstuvwxyz æøå";
const morseCodeArray = [ '.-', '-...', '-.-.', '-..', '.', '..-.', '--.', '....', '..', '.---', '-.-', '.-..', '--', '-.', '---', '.--.', '--.-', '.-.', '...', '-', '..-', '...-', '.--', '-..-', '-.--', '--..', ' ', '·−·−', '−−−·', '·−−·−'];

/*View*/

function viewHTML() {
    let newhtml = /*HTML*/`
            <h2 class="center">Skriv inn tekst som skal bli oversettet til morsecode</h2>
            <div class="inputs center"><input value="" type="text" id="textInput" onchange="morse_trans()"/><button onClick="morse_trans()">Translate</button></div>
            <div class="divider"></div>
            <div class="Text">${text_innerhtml}</div>
            <div class="divider"></div>
            <div class="MorseCode">${morse_innerhtml}</div>
        `;

    HTMLcode.innerHTML = newhtml;
}

/* Controller*/

function morse_trans() {
    let newText = document.getElementById('textInput').value;
    let newMorse = "";
    text_innerhtml = newText;
    document.getElementById('textInput').value = "";

    for (let i=0; i<newText.length; i++) {
        let letter = "";
        letter = newText[i];
        let letterIndex = alphabet.indexOf(letter.toLowerCase());
        newMorse += `${morseCodeArray[letterIndex]} `;
    }
    morse_innerhtml = newMorse;
    viewHTML();
}
viewHTML();
