let HTMLcode = document.getElementById('myHTML');
let pkmn_user = "None";
let pkmn_user_spr = "";
let pkmn_user_type = "";
let pkmn_enemy = "None";
let pkmn_enemy_spr = "";
let pkmn_enemy_type = "";
let pkmn_text = "Select your pokemon";


function viewHTML() {
    let newhtml = /*HTML*/`
            <div class="game_app">
                ${pkmn_enemy_type}
                <div id="pkmn_sprite_front">${pkmn_enemy_spr}</div>
                <div id="pkmn_sprite_back">${pkmn_user_spr}</div>
                ${pkmn_user_type}
            </div>
            <div class="divider"></div>
            <div class="center">
                <div id="textbox" class="textbox center">${pkmn_text}</div>
            </div>
            <div class="game_sel center">
                <div class="pkmn_sel_box center">  
                    <div class="pkmn_sel center">  
                        <button onclick="switchPKMN('venusaur')" class="venusaur"></button>
                    </div>
                </div>
                <div class="pkmn_sel_box center">  
                    <div class="pkmn_sel center">  
                        <button onclick="switchPKMN('blastoise')" class="blastoise"></button>
                    </div>
                </div>
                <div class="pkmn_sel_box center">  
                    <div class="pkmn_sel center">  
                        <button onclick="switchPKMN('charizard')" class="charizard"></button>
                    </div>
                </div>
            </div>
        `;

    HTMLcode.innerHTML = newhtml;
}

function switchPKMN(pkmn) {
    pkmn_user = pkmn;
    if (pkmn == "venusaur"){
        pkmn_user_type = `<div class="type_user pkmn_type_ico grass">Grass</div>`;
    }
    if (pkmn == "blastoise"){
        pkmn_user_type = `<div class="type_user pkmn_type_ico water">Water</div>`;
    }
    if (pkmn == "charizard"){
        pkmn_user_type = `<div class="type_user pkmn_type_ico fire">Fire</div>`;
    }

    wildEncounter();
    updateSprite();
}
function wildEncounter() {
    let id = Math.floor(Math.random() * 3)
    if (id == 0) {
        pkmn_enemy = "venusaur";
        pkmn_enemy_type = `<div class="type_enemy pkmn_type_ico grass">Grass</div>`;
    }
    else if (id == 1) {
        pkmn_enemy = "blastoise";
        pkmn_enemy_type = `<div class="type_enemy pkmn_type_ico water">Water</div>`;
    }
    else if (id == 2) {
        pkmn_enemy = "charizard";
        pkmn_enemy_type = `<div class="type_enemy pkmn_type_ico fire">Fire</div>`;
    }
}

function updateSprite() {
    if (pkmn_user != "None") {
        pkmn_user_spr = `<img src="img/${pkmn_user}_b.gif" class="pkmn"/>`;
    }
    if (pkmn_enemy != "None") {
        pkmn_enemy_spr = `<img src="img/${pkmn_enemy}.gif" class="pkmn"/>`;
    }

    if (pkmn_user == "venusaur") {
        if (pkmn_enemy == "venusaur") { pkmn_text = "The fight is a draw"; }
        if (pkmn_enemy == "blastoise") { pkmn_text = "VENUSAUR used Solar Beam<br>It's super effective!<br>You WIN!"; }
        if (pkmn_enemy == "charizard") { pkmn_text = "VENUSAUR used Solar Beam<br>It's not effective!<br>You LOSE!"; }
    }
    if (pkmn_user == "blastoise") {
        if (pkmn_enemy == "blastoise") { pkmn_text = "The fight is a draw"; }
        if (pkmn_enemy == "charizard") { pkmn_text = "BLASTOISE used Hydro Pump<br>It's super effective!<br>You WIN!"; }
        if (pkmn_enemy == "venusaur") { pkmn_text = "BLASTOISE used Hydro Pump<br>It's not effective!<br>You LOSE!"; }
    }
    if (pkmn_user == "charizard") {
        if (pkmn_enemy == "charizard") { pkmn_text = "The fight is a draw"; }
        if (pkmn_enemy == "venusaur") { pkmn_text = "CHARIZARD used Fire Blast<br>It's super effective!<br>You WIN!"; }
        if (pkmn_enemy == "blastoise") { pkmn_text = "CHARIZARD used Fire Blast<br>It's not effective!<br>You LOSE!"; }
    }
    viewHTML();
}

viewHTML();