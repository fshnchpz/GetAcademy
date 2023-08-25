let HTMLcode = document.getElementById("myHTML");
let pkmn_user = "None";
let pkmn_user_spr = "";
let pkmn_user_type = "";
let pkmn_enemy = "None";
let pkmn_enemy_spr = "";
let pkmn_enemy_type = "";
let pkmn_text = "Select your pokemon";
let party_sel = 0;

let game_state = "in_battle";

let pkmn_party = [
    {"id":"venusaur","type":"Grass","curHP":80, "maxHP":80,"attack":82,"defense":83,"sp_atk":100,"sp_def":100,"speed":80},
    {"id":"blastoise","type":"Water","curHP":79, "maxHP":79,"attack":83,"defense":100,"sp_atk":85,"sp_def":105,"speed":78},
    {"id":"charizard","type":"Fire","curHP":78, "maxHP":78,"attack":84,"defense":78,"sp_atk":109,"sp_def":85,"speed":100}
];
let enemy_party = [];
enemy_party = pkmn_party;
let pkmn_party_html = "";

function viewHTML() {
  loadPartyHTML();
  if (game_state == "in_battle") {
    let newhtml = /*HTML*/ `
            <div class="game_app">
                ${pkmn_enemy_type}
                <div id="pkmn_sprite_front">${pkmn_enemy_spr}</div>
                <div id="pkmn_sprite_back">${pkmn_user_spr}</div>
                ${pkmn_user_type}

                <div class="user_info">
                    <div class="rel">
                        <div class="user_pkmn_name">${pkmn_user}</div>
                        <div class="user_hpfield"></div>
                        <div class="hp_bar_user"></div>
                        <div class="user_HP_num">${pkmn_party[party_sel].curHP} / ${pkmn_party[party_sel].maxHP}</div>
                    </div>
                </div>
                <div class="enemy_info">
                    <div class="rel">
                    </div>
                </div>
            </div>
            <div class="divider"></div>
            <div class="center">
                <div id="textbox" class="textbox center">${pkmn_text}</div>
            </div>
            <div class="game_sel center">
                ${pkmn_party_html}
            </div>
        `;
    HTMLcode.innerHTML = newhtml;
  }
}

function switchPKMN(pkmn) {
  pkmn_user = pkmn_party[pkmn].id;
  pkmn_user_type = `<div class="type_user pkmn_type_ico ${pkmn_party[pkmn].type}">${pkmn_party[pkmn].type}</div>`;
  party_sel = pkmn;

  wildEncounter();
  updateSprite();
}
function wildEncounter() {
  let id = Math.floor(Math.random() * 3);
  
    pkmn_enemy = pkmn_party[id].id;
    pkmn_enemy_type = `<div class="type_enemy pkmn_type_ico ${enemy_party[id].type}">${enemy_party[id].type}</div>`;
}

function updateSprite() {
  if (pkmn_user != "None") {
    pkmn_user_spr = `<img src="img/${pkmn_user}_b.gif" class="pkmn_user"/>`;
  }
  if (pkmn_enemy != "None") {
    pkmn_enemy_spr = `<img src="img/${pkmn_enemy}.gif" class="pkmn_enemy"/>`;
  }

  if (pkmn_user == "venusaur") {
    if (pkmn_enemy == "venusaur") {
      pkmn_text = "The fight is a draw";
    }
    if (pkmn_enemy == "blastoise") {
      pkmn_text =
        "VENUSAUR used Solar Beam<br>It's super effective!<br>You WIN!";
    }
    if (pkmn_enemy == "charizard") {
      pkmn_text =
        "VENUSAUR used Solar Beam<br>It's not effective!<br>You LOSE!";
    }
  }
  if (pkmn_user == "blastoise") {
    if (pkmn_enemy == "blastoise") {
      pkmn_text = "The fight is a draw";
    }
    if (pkmn_enemy == "charizard") {
      pkmn_text =
        "BLASTOISE used Hydro Pump<br>It's super effective!<br>You WIN!";
    }
    if (pkmn_enemy == "venusaur") {
      pkmn_text =
        "BLASTOISE used Hydro Pump<br>It's not effective!<br>You LOSE!";
    }
  }
  if (pkmn_user == "charizard") {
    if (pkmn_enemy == "charizard") {
      pkmn_text = "The fight is a draw";
    }
    if (pkmn_enemy == "venusaur") {
      pkmn_text =
        "CHARIZARD used Fire Blast<br>It's super effective!<br>You WIN!";
    }
    if (pkmn_enemy == "blastoise") {
      pkmn_text =
        "CHARIZARD used Fire Blast<br>It's not effective!<br>You LOSE!";
    }
  }
  viewHTML();
}

function loadPartyHTML() {
  let pkmn_inParty = pkmn_party.length;
  let empty_boxes = 6 - (pkmn_inParty + 1);
  pkmn_party_html = "";

  for (let i = 0; i < pkmn_inParty; i++) {
    pkmn_party_html += /*HTML*/ `
        <div class="pkmn_sel_box center">  
            <div class="pkmn_sel center">  
                <div onclick="switchPKMN('${i}')" class="switch">
                    <img src="img/party/${pkmn_party[i].id}.png"/>
                </div>
            </div>
        </div>
  `;
  }
  for (let i = 0; i < empty_boxes; i++) {
    pkmn_party_html += /*HTML*/ `
        <div class="pkmn_sel_box center">  
            <div class="pkmn_sel center">  
                <div onclick="switchPKMN('')" class="switch">
                </div>
            </div>
        </div>
    `;
  }
}

viewHTML();
