"use strict";

let HTMLcode = document.getElementById('myHTML');

function viewHTML() {
    let newhtml = /*HTML*/`
            <div id="flagg">
                ${getNorwegianFlag()}
            </div>
        `;

    HTMLcode.innerHTML = newhtml;
}

function getNorwegianFlag() {
    let HTMLCode = '';
    let columns = 22;
    let rows = 16;

    for (let Y = 0; Y < rows; Y++) {
        for (let X = 0; X < columns; X++) {
            if (Y >= 0 && Y <= 5 || Y >= 10) {
                if (X >= 0 && X <= 5 || X >= 10) {
                    HTMLCode += createDivClass('red');
                }
                if (X == 6 || X == 9) {
                    HTMLCode += createDivClass('');
                }
                if (X == 7 || X == 8) {
                    HTMLCode += createDivClass('blue');
                }
            }
            if (Y == 6 || Y == 9) {
                if (X >= 0 && X <= 6 || X >= 9) {
                    HTMLCode += createDivClass('');
                }
                if (X == 7 || X == 8) {
                    HTMLCode += createDivClass('blue');
                }
            }
            if (Y == 7 || Y == 8) {
                HTMLCode += createDivClass('blue');
            }
        }
    }

    return HTMLCode;
}

function createDivClass(cssStyle) {
    return `<div class="${cssStyle}"></div>`;
}

viewHTML();