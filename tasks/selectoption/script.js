let HTMLcode = document.getElementById('myHTML');


let listt = ['Velg', 'Mine Turer', 'Mine Favoritter'];
let currentSelected = 0;

function viewHTML() {
    let newhtml = /*HTML*/`
            <select id="dropdown" name="filterType" onChange="selectFilter(this)">
                ${getOptions()}
            </select>
            Currently Selected: ${currentSelected}
            <br>
            <button onClick="viewHTML()">Update HTML</button>
        `;

    HTMLcode.innerHTML = newhtml;
}

viewHTML();

function getOptions() {
    let code = ``;
    
    for (let i=0; i<listt.length; i++) {
        let selected = '';

        if (currentSelected == i) {
            selected = 'selected';
        }

        code += `<option value="${i}" ${selected}>${listt[i]}</option>`; 
    }

    return code;
}

function selectFilter(option) {
    currentSelected = option.value;
    viewHTML();
}