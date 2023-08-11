


function refreshName() {
    var yourName = document.getElementById('inputName').value;
    document.getElementById('yourName').innerHTML = 'Hei, ' + yourName;
}
function noLayout() {
    document.getElementById('container').classList = [];
}
function verticalLayout() {
    document.getElementById('container').classList = [];
    document.getElementById('container').classList.add('Card_vertical');
}
function horizontalLayout() {
    document.getElementById('container').classList = [];
    document.getElementById('container').classList.add('Card_Horizontal');
}
function gridLayout() {
    document.getElementById('container').classList = [];
    document.getElementById('container').classList.add('Card_Grid');
}

function closeHeaders() {
    document.getElementById('divText').innerHTML= "";
    document.getElementById('divHTML').innerHTML= "";
    document.getElementById('divCSS').innerHTML= "";
    document.getElementById('divJS').innerHTML= "";
    document.getElementById('divGame').innerHTML= "";
}
function showText() {
    closeHeaders();
    document.getElementById('divText').innerHTML = /*html*/`
        De to viktigste verktøyene vi skal bruke er disse:
        <ul>
            <li>
                Koderegisgeringsprogrammet <a href="https://code.visualstudio.com/">Visual Studio Code</a>
                <br />
                Vi skal bruke noen <i>extensions</i>:
                <ul>
                    <li>JavaScript-Booster</li>
                    <li>es6-string-html</li>
                    <li>live-server</li>
                    <li>live-share</li>
                </ul>
            </li>
            <li>
                Nettleseren <a href="https://www.google.com/intl/no/chrome/">Google Chrome</a>
            </li>
        </ul>
    `;
}


function showHTML() {
    closeHeaders();
    document.getElementById('divHTML').innerHTML = /*html*/`
        <div class="innerCard">
            Vi bruker HTML til å definere et dokument.
            <ul>
                <li>Tagger for grunnleggende oppsett av en HTML-fil</li>
                <li>Tagger for grunnleggende formatering av tekst</li>
                <li><tt>&lt;div&gt;</tt></li>
                <li><tt>&lt;input type="text"&gt;</tt></li>
                <li><tt>&lt;button&gt;</tt></li>
                <li><a href="https://www.w3schools.com/html/default.asp" target="_new">W3Schools HTML Tutorial</a>
                </li>
                <li><a href="https://www.w3schools.com/tags/default.asp" target="_new">W3Schools HTML Reference</a>
                </li>
            </ul>
        </div>
    `;
}

function showCSS() {
    closeHeaders();
    document.getElementById('divCSS').innerHTML = /*html*/`
        <div class="innerCard">
            Vi bruker CSS til å <i>style</i> et dokument, altså farger, fonter, utseende og lignende.
            <ul>
                <li><tt>background-color</tt></li>
                <li><tt>color</tt></li>
                <li><tt>padding</tt></li>
                <li><tt>margin</tt></li>
                <li><tt>border</tt></li>
                <li><tt>text-align</tt></li>
                <li><tt>font-size</tt></li>
                <li><a href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/" target="_new">Flexbox</a></li>
                <li><a href="https://css-tricks.com/snippets/css/complete-guide-grid/" target="_new">Grid</a></li>
                <li><a href="https://www.w3schools.com/css/default.asp" target="_new">W3Schools CSS Tutorial</a>
                </li>
                <li><a href="https://www.w3schools.com/cssref/default.asp" target="_new">W3Schools CSS Reference</a>
                </li>
            </ul>
        </div>
    `;
}

function showJS() {
    closeHeaders();
    document.getElementById('divJS').innerHTML = /*html*/`
        <div class="innerCard">
            Det viktigste vi skal lære er programmeringsspråket JavaScript. Vi skal lære grunnleggende programmering
            ved
            å manipulere HTML- og CSS-kode på en nettside ved hjelp av JavaScript.
            <ul>
                <li>Det finnes en W3Schools JavaScript Tutorial, men her anbefaler vi heller å følge kurset vårt på
                    Moodle.</li>
                <li><a href="https://www.w3schools.com/jsref/default.asp" target="_new">W3Schools JavaScript
                        Reference</a></li>

            </ul>
        </div>
    `;
}

function showGame() {
    closeHeaders();
    document.getElementById('divGame').innerHTML = /*html*/`
    <div class="innerCard">
        <div class="CardGame">
            <div class="part">
                <button onClick="head_L()">◀</button>
                <div id="imgHead">
                    <img src="img/head1.png"/>
                </div>
                <button onClick="head_R()">▶</button>
            </div>
            <div class="part">
                <button onClick="body_L()">◀</button>
                <div id="imgBody"><img src="img/body1.png"/></div>
                <button onClick="body_R()">▶</button>
            </div>
            <div class="part">
                <button onClick="legs_L()">◀</button>
                <div id="imgLegs"><img src="img/legs1.png"/></div>
                <button onClick="legs_R()">▶</button>
            </div>
        </div>
    </div>
    `;
}

var head = 1;
var body = 1;
var legs = 1;

function head_L() {
    if (head == 1) {
        document.getElementById('imgHead').innerHTML = /*html*/`<img src="img/head4.png" />`;
        head = 4;
    }
    else if (head == 2) {
        document.getElementById('imgHead').innerHTML = /*html*/`<img src="img/head1.png" />`;
        head = 1;
    }
    else if (head == 3) {
        document.getElementById('imgHead').innerHTML = /*html*/`<img src="img/head2.png" />`;
        head = 2;
    }
    else if (head == 4) {
        document.getElementById('imgHead').innerHTML = /*html*/`<img src="img/head3.png" />`;
        head = 3;
    }
}

function head_R() {
    if (head == 1) {
        document.getElementById('imgHead').innerHTML = /*html*/`<img src="img/head2.png" />`;
        head = 2;
    }
    else if (head == 2) {
        document.getElementById('imgHead').innerHTML = /*html*/`<img src="img/head3.png" />`;
        head = 3;
    }
    else if (head == 3) {
        document.getElementById('imgHead').innerHTML = /*html*/`<img src="img/head1.png" />`;
        head = 4;
    }
    else if (head == 4) {
        document.getElementById('imgHead').innerHTML = /*html*/`<img src="img/head1.png" />`;
        head = 1;
    }
}

function body_L() {
    if (body == 1) {
        document.getElementById('imgBody').innerHTML = /*html*/`<img src="img/body3.png" />`;
        body = 3;
    }
    else if (body == 2) {
        document.getElementById('imgBody').innerHTML = /*html*/`<img src="img/body1.png" />`;
        body = 1;
    }
    else if (body == 3) {
        document.getElementById('imgBody').innerHTML = /*html*/`<img src="img/body2.png" />`;
        body = 2;
    }
}

function body_R() {
    if (body == 1) {
        document.getElementById('imgBody').innerHTML = /*html*/`<img src="img/body2.png" />`;
        body = 2;
    }
    else if (body == 2) {
        document.getElementById('imgBody').innerHTML = /*html*/`<img src="img/body3.png" />`;
        body = 3;
    }
    else if (body == 3) {
        document.getElementById('imgBody').innerHTML = /*html*/`<img src="img/body1.png" />`;
        body = 1;
    }
}


function legs_L() {
    if (legs == 1) {
        document.getElementById('imgLegs').innerHTML = /*html*/`<img src="img/legs3.png" />`;
        legs = 3;
    }
    else if (legs == 2) {
        document.getElementById('imgLegs').innerHTML = /*html*/`<img src="img/legs1.png" />`;
        legs = 1;
    }
    else if (legs == 3) {
        document.getElementById('imgLegs').innerHTML = /*html*/`<img src="img/legs2.png" />`;
        legs = 2;
    }
}

function legs_R() {
    if (legs == 1) {
        document.getElementById('imgLegs').innerHTML = /*html*/`<img src="img/legs2.png" />`;
        legs = 2;
    }
    else if (legs == 2) {
        document.getElementById('imgLegs').innerHTML = /*html*/`<img src="img/legs3.png" />`;
        legs = 3;
    }
    else if (legs == 3) {
        document.getElementById('imgLegs').innerHTML = /*html*/`<img src="img/legs1.png" />`;
        legs = 1;
    }
}