"use strict";

let HTMLcode = document.getElementById('myHTML');
let squareCol = 'light';

function viewHTML() {
    let newhtml = /*HTML*/`
    <div id="board">
        ${getChessPieceRow('black')}
        ${getPawnRow('black')}
    `;

    for (let i = 0; i < 4; i++) { newhtml += getChessRow(); }

    newhtml += `
        ${getPawnRow('white')}
        ${getChessPieceRow('white')}
    </div>
        `;

    HTMLcode.innerHTML = newhtml;
}

function getPawnRow(pawnColor) {
    let HTML = ``;
    for (let i=0; i<8; i++) {
        HTML += `<div class="${squareCol}Square ${pawnColor}Piece">♟</div>`;
        if (squareCol == 'light') { squareCol = 'dark' } else { squareCol = 'light' }
        
        if (i == 7) {
            if (squareCol == 'light') { squareCol = 'dark'; } else { squareCol = 'light'; }
        }
    }
    return HTML;
}


function getChessPieceRow(pawnColor) {
    let HTML = ``;
    let Pieces = ['♜','♞','♝','♛','♚','♝','♞','♜'];

    for (let i=0; i<8; i++) {
        HTML += `<div class="${squareCol}Square ${pawnColor}Piece">${Pieces[i]}</div>`;
        if (squareCol == 'light') { squareCol = 'dark' } else { squareCol = 'light' }
        
        if (i == 7) {
            if (squareCol == 'light') { squareCol = 'dark'; } else { squareCol = 'light'; }
        }
    }
    return HTML;
}

function getChessRow() {
    let HTML = ``;
    for (let i=0; i<8; i++) {
        HTML += `<div class="${squareCol}Square"></div>`;
        if (squareCol == 'light') { squareCol = 'dark'; } else { squareCol = 'light'; }
        if (i == 7) {
            if (squareCol == 'light') { squareCol = 'dark'; } else { squareCol = 'light'; }
        }
    }

    return HTML;
}

viewHTML();

setTimeout(() => {
    /* code here */
}, timeoutmilliseconds);