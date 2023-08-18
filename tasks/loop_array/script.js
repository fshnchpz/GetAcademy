var cart = [];


function html() {
    let html = /*HTML*/ `
    <div class="center"> <h1>Loop - Array</h1> </div>
    <div class="divider"></div>
    <div class="center col" style="margin-top: 50px">
        <div id="output"></div>
    </div>
    <div class="divider"></div>
    <button onClick="loopmyArray()">Hvis innhold av min array</button>
    <h1>Legg til produkter til handlevogn</h1>
    <span>
        <button onClick="addItem(this.innerHTML)">Eple</button>
        <button onClick="addItem(this.innerHTML)">Appelsin</button>
        <button onClick="addItem(this.innerHTML)">Kiwi</button>
        <button onClick="addItem(this.innerHTML)">Banan</button>
        <button onClick="addItem(this.innerHTML)">Druer</button>
    </span>
    `;

    document.getElementById('html').innerHTML = html;
}

function loopmyArray() {
    document.getElementById('output').innerHTML = "<h2>Handlevogn:</h2>";

    for (let i=0; i < cart.length; i++) {
        document.getElementById('output').innerHTML += /*HTML*/ `${cart[i]} <br>`;
        console.log(cart[i]);
    }
}

function addItem(value){
    cart.push(value);
    loopmyArray();
}