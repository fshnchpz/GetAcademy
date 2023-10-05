/* Model */



let Fornavn = 'Ellen';
let Etternavn = 'Irene';

/* Liste / Array  = [] */
let navnListe = ['Ellen', 'Irene']


let Email = 'Hei, jeg heter ';

Email = 'Hei, jeg heter ' + Fornavn + ' ' + Etternavn;
Email = "Hei, jeg heter " + Fornavn + ' ' + Etternavn;
Email = `Hei, jeg heter ${Fornavn} ${Etternavn}`;


/* navnListe.length = 2 */
for (egg of navnListe) {
    /* Innhold som gjentar */
    Email += egg + ' '


    /* slutt */
}


/* View */
function updateView() {
    let newhtml = /*HTML*/`
        <div class="center col">
            <div id="svar">${Email}</div>
            <button id="answer">Knapp</button>
        </div>
        `;

    document.getElementById('myHTML').innerHTML = newhtml;

}










/* Controller */

updateView(); /* jeg kaller på denne funksjonen */