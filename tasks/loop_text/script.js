var numVowels = 0;
let inputValue = "eksempel setning for å se hvor mange vokaler som er i setningen";

calcVowels("eksempel setning for å se hvor mange vokaler som er i setningen");
html();

function html() {
    let html = /*HTML*/ `
    <div class="center"> <h1>Loop - String Vokaler</h1> </div>
    <div class="divider"></div>
    <div class="center col" style="margin-top: 50px">
        <div id="numbers">Vokaler i tekst:</div> 
        <div class="vowel">${numVowels}</div>
    </div>
    <div class="divider"></div>
    <input onChange="calcVowels(this.value)" value="${inputValue}" id="textField"></input>
    `;

    document.getElementById('html').innerHTML = html;
}

function calcVowels(inputField) {
    let Vowels = 0;
    let inputText = document.getElementById('textField').value;
    inputValue = inputField;

    for (let i = 0; i < inputText.length; i++) {
        if (inputText[i] == 'a' || inputText[i] == 'e' || inputText[i] == 'i' || inputText[i] == 'o' || inputText[i] == 'u' || inputText[i] == 'y' || inputText[i] == 'æ' || inputText[i] == 'ø' || inputText[i] == 'å') {
            Vowels++;
        }
    }
    numVowels = Vowels;
    html();
}