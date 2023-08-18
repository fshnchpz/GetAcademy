var Number1;
var Number2;

Number1 = Math.floor(Math.random() * 9);
Number2 = Math.floor(Math.random() * 9);

function html() {
    let html = /*HTML*/ `
    <div class="center"> <h1>Loop - While</h1> </div>
    <div class="divider"></div>
    <div class="center col" style="margin-top: 50px">
        <div id="numbers">${Number1} : ${Number2}</div>
    </div>
    <div class="divider"></div>
    <button onClick="generateNumbers()">Generer Nummere til de er like</button>
    `;

    document.getElementById('html').innerHTML = html;
}

function generateNumbers() {
    console.log('Generating Numbers');
    let iterDbg = 0;

    while (Number1 != Number2) {
        Number1 = Math.floor(Math.random() * 9);
        console.log('Generated: N1: ' + Number1);
        Number2 = Math.floor(Math.random() * 9);
        console.log('Generated: N2: ' + Number2);
        html();
        iterDbg++;
        console.log('Iteration: ' + iterDbg);
    }
}
