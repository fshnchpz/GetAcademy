let HTMLcode = document.getElementById('myHTML');

let ProvinceFilter = 'Vestfold';
let Fylker = ['Vestfold', 'Telemark'];

let Personer = [ 
    { navn:'Bernt', fylke: 'Vestfold'},
    { navn:'Egil', fylke: 'Vestfold'},
    { navn:'Svein', fylke: 'Telemark'},
];

function updateHTML() {
    let newhtml = /*HTML*/`
            <table class="codetable center">
                <tr>
                <th>Navn</th>
                <th>Fylke</th>
                </tr>
                <tr>
                    ${getPersonerRows()}
                </tr>
            </table>

            <div class="center col">
                Vis fra fylke:
                <select onChange="filterProvince(this.value)">
                    ${getProvinces()}
                </select>
                <div class="divider"></div>
                <div class="row">
                    Navn: <input id="inputPerson"/><br>
                    Fylke: <input id="inputFylke"/>
                </div>
                <button onClick="addPerson()">Legg til person</button>
                <button onClick="removeRandPerson()">Fjern en Person</button>
            </div>
        `;

    HTMLcode.innerHTML = newhtml;
}

function filterProvince(value) {
    ProvinceFilter = value;
    updateHTML();
}

function getProvinces() {
    let returnCode = ``;

    for (let i=0;i < Fylker.length; i++) {
        if (Fylker[i] == ProvinceFilter) {
            returnCode += `<option selected>${Fylker[i]}</option>`; 
        }
        else {
            returnCode += `<option>${Fylker[i]}</option>`; 
        }
        
    }

    return returnCode;
}

function getPersonerRows() {
    let returnCode = ``;

    for (let i=0;i < Personer.length; i++) {
        if (Personer[i].fylke == ProvinceFilter) {
            returnCode += `<tr><td>${Personer[i].navn}</td><td>${Personer[i].fylke}</td></tr>`; 
        }
    }

    return returnCode;
}

function addPerson() {
    let name = document.getElementById('inputPerson').value;
    let province = document.getElementById('inputFylke').value;

    document.getElementById('inputPerson').value = '';
    document.getElementById('inputFylke').value = '';

    if (!Fylker.includes(province,0)) {
        Fylker.push(province);
    }

    Personer.push({navn: name, fylke: province});

    updateHTML();
}

function removeRandPerson() {
    let remove_i = Math.floor(Math.random() * Personer.length);
    Personer.splice(remove_i,1);

    updateHTML();
}

updateHTML();