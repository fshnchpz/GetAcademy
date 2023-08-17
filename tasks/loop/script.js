

function html() {
    let html = /*HTML*/ `
    <div class="center"> <h1>Loop - for</h1> </div>
    <div class="divider"></div>
    <div class="center col" style="margin-top: 50px">
        <div id="numbers"></div>
    </div>
    <div class="divider"></div>
    <button onClick="printNumbers()">Print Nummere</button>
    `;

    document.getElementById('html').innerHTML = html;
}

function printNumbers() {
    let endValue = 20;
    for (let i = 2; i <= endValue; i += 2) {
        document.getElementById('numbers').innerHTML += /*HTML*/ `<li>${i}</li>`;
    }
}