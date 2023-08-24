let HTMLcode = document.getElementById('myHTML');
var chat_txt = [];
let Condition = "";

function viewHTML() {
    let newhtml = /*HTML*/`
    <div class="col center">
        <div id="chat"></div>
        <div class="divider"></div>
        <h2>Spørr chatbot ~</h2>
        <input id="inputChat" onchange="inputChatQuestion(this.value)"/>
    </div>

    `;

    HTMLcode.innerHTML = newhtml;
    loadChat();
}
function loadChat() {
    document.getElementById('chat').innerHTML = "";

    for (let i=0; i < chat_txt.length; i++) {
        document.getElementById('chat').innerHTML += chat_txt[i] + '<br>';
    }
}
function inputChatQuestion(input) {
    chat_txt.push('>> '+ input);
    chat_txt.push('Chatbot: ...');
    setTimeout(askChatbot, 2000, input);
    input = "";
    viewHTML();
}

function askChatbot(que) {
    let Q = que.toLowerCase();
    chat_txt.pop();
    
    //chat_txt.push('debug: svarer');

    if (Q.indexOf('hei') > -1) {
        chat_txt.push(`<b>Chatbot: Hei`);
    }

    if (Q.indexOf('hvordan går det') > -1) {
        chat_txt.push(`<b>Chatbot: Jeg har ikke følelser, så jeg kan ikke si hvor bra det går an med meg.
        <br> Hvis jeg skulle måle hvordan det går med hvor mye jeg lærer, så går det ekstremt dårlig.
        <br>Hva med deg da?</b>`);
        Condition = "howareyou";
    }
    else if (Q.indexOf('hvem er du') > -1) {
        chat_txt.push(`<b>Chatbot: Jeg er Chatbot. Og er bare programmert til å svare på spesifik setninger.</b>`);
    }
    else if (Q.indexOf('bra') > -1 && Condition == "howareyou") {
        chat_txt.push(`<b>Chatbot: Så godt å høre. Hva skal du gjøre i dag?</b>`);
        Condition = "whatareyoudoing";
    }
    else {
        Condition = "";
    }

    viewHTML();
}


viewHTML();