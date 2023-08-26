let HTMLcode = document.getElementById("myHTML");
let pkmn_user = "None";
let pkmn_user_spr = "";
let pkmn_user_type = "";
let pkmn_enemy = "None";
let pkmn_enemy_spr = "";
let pkmn_enemy_type = "";
let pkmn_text = "Select your pokemon";
let party_sel = 0;
let enemy_sel = 0;

let game_state = "in_battle";

let pkmn_party = [
    {"id":"venusaur","type":["Grass"],"curHP":155, "maxHP":155,"attack":82,"defense":83,"sp_atk":100,"sp_def":100,"speed":80,"moves":["Solar Beam"]},
    {"id":"blastoise","type":["Water"],"curHP":154, "maxHP":154,"attack":83,"defense":100,"sp_atk":85,"sp_def":105,"speed":78,"moves":["Hydro Pump"]},
    {"id":"charizard","type":["Fire"],"curHP":153, "maxHP":153,"attack":84,"defense":78,"sp_atk":109,"sp_def":85,"speed":100,"moves":["Fire Blast"]}
];
let enemy_party = [];
enemy_party = JSON.parse(JSON.stringify(pkmn_party));
let pkmn_party_html = "";

function viewHTML() {
  loadPartyHTML();
  let TypesHTML = getTypes();
  if (game_state == "in_battle") {
    let newhtml = /*HTML*/ `
            <div class="game_app">
                ${TypesHTML}
                <div id="pkmn_sprite_front">${getSprite(enemy_sel,false)}</div>
                <div id="pkmn_sprite_back">${getSprite(party_sel,true)}</div>

                <div class="user_info">
                    <div class="rel">
                        <div class="user_pkmn_name">${pkmn_party[party_sel].id}</div>
                        <div class="user_hpfield"></div>
                        <div class="hp_bar_user" style="width: ${getPixelPerc(76,pkmn_party[party_sel].curHP,pkmn_party[party_sel].maxHP)}px;"></div>
                        <div class="user_HP_num">${pkmn_party[party_sel].curHP} / ${pkmn_party[party_sel].maxHP}</div>
                    </div>
                </div>
                <div class="enemy_info">
                    <div class="rel">
                        <div class="enemy_pkmn_name">${enemy_party[enemy_sel].id}</div>
                        <div class="enemy_hpfield"></div>
                        <div class="hp_bar_enemy" style="width: ${getPixelPerc(76,enemy_party[enemy_sel].curHP,enemy_party[enemy_sel].maxHP)}px;"></div>
                        <div class="enemy_HP_num">${enemy_party[enemy_sel].curHP} / ${enemy_party[enemy_sel].maxHP}</div>
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
  pkmn_user_type = `
  <div class="type_user">
    <div class="pkmn_type_ico ${pkmn_party[pkmn].type[0]}">${pkmn_party[pkmn].type[0]}</div>
    <div class="pkmn_type_ico ${pkmn_party[pkmn].type}">${pkmn_party[pkmn].type}</div>
  </div>
  `;
  party_sel = pkmn;

  wildEncounter();
  updateSprite();
}
function wildEncounter() {
    let id = enemy_sel;

    pkmn_enemy = pkmn_party[id].id;
}

function getPixelPerc(org_pix, min, max) {
    let NewPixels = org_pix;
    NewPixels = Math.floor((org_pix) * (min/max));
    return NewPixels;
}


function getTypes() {
    let HTML = "";
    let id = party_sel;
    let e_id = enemy_sel;

    HTML += `<div class="type_user">`;
    for (let i=0; i<pkmn_party[id].type.length; i++) {
        HTML += `<div class="pkmn_type_ico ${pkmn_party[id].type[i]}">${pkmn_party[id].type[i]}</div>`;
    }
    HTML += `</div>`;

    HTML += `<div class="type_enemy">`;
    for (let i=0; i<enemy_party[e_id].type.length; i++) {
        HTML += `<div class="pkmn_type_ico ${enemy_party[e_id].type[i]}">${enemy_party[e_id].type[i]}</div>`;
    }

    HTML += `</div>`;
    return HTML;
}
function getSprite(id, isUser) {
    if (isUser) {
        return`<img src="img/${pkmn_party[id].id}_b.gif" class="pkmn_user"/>`;
    } else {
        return `<img src="img/${enemy_party[id].id}.gif" class="pkmn_enemy"/>`;
    }
}
function updateSprite() {
    let DMG = 0;
    let MoveType = pkmn_party[party_sel].type[0];
    let isPhys = false;
    let Power = 80;
    let iStabMult = 1;
    let ATK_Stat;
    let DEF_Stat;
    let Critical = 1;
    let Level = 50;
    let EnemyTypes = [];
    EnemyTypes = enemy_party[enemy_sel].type;

    let HP = Math.floor(0.01 * (2 * 78 + 31) * 50) + 50 + 10

    if (isPhys) {
        ATK_Stat = pkmn_party[party_sel].attack;
        DEF_Stat = enemy_party[enemy_sel].defense;
    }
    else{
        ATK_Stat = pkmn_party[party_sel].sp_atk;
        DEF_Stat = enemy_party[enemy_sel].sp_def;
    }
    
    for (i=0; i<pkmn_party[party_sel].type.length; i++){
        if (pkmn_party[party_sel].type[i] == MoveType) {
            iStabMult = 1.5;
        }
    }
    let randomNumber = Math.floor((Math.random() * 15) + 1);
  
    DMG = Math.floor(((((2 * Level) + 10)/250) * (ATK_Stat/DEF_Stat) * (Power) + 2) * iStabMult);
    
    DMG = TypeEffectiveness(DMG,MoveType,EnemyTypes);
    enemy_party[enemy_sel].curHP -= DMG; 
    
    pkmn_text = `You hit ${(enemy_party[enemy_sel].id.toUpperCase())} for ${DMG} damage !`; 
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
                <div onclick="" class="">
                </div>
            </div>
        </div>
    `;
  }
}
switchPKMN(0);
viewHTML();

function TypeEffectiveness(DMG, Type,onType) {
    let DMGInc = 1;
    let DMGDec = 1;
    let DMGNull = 1;
    let newDMG = 0;

    for (let i=0; i < onType.length; i++){
        if (onType[i] == "Normal") { //Defense Type
            if (Type == "Ghost") { //Offense Type
                DMGNull = 0; 
            }
            if (Type == "Fighting") { //Offense Type
                DMGInc *= 2;
            }
        }
        
        if (onType[i] == "Fire") { //Defense Type
            if (Type == "Water") { //Offense Type
                DMGInc *= 2; 
            }
            if (Type == "Ground") { //Offense Type
                DMGInc *= 2; 
            }
            if (Type == "Rock") { //Offense Type
                DMGInc *= 2; 
            }

            if (Type == "Fire") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Grass") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Ice") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Bug") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Steel") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Fairy") { //Offense Type
                DMGDec *= 2; 
            }
        }

        if (onType[i] == "Water") { //Defense Type
            if (Type == "Fire") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Water") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Ice") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Steel") { //Offense Type
                DMGDec *= 2; 
            }

            if (Type == "Electric") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Grass") { //Offense Type
                DMGInc *= 2;
            }
        }

        if (onType[i] == "Electric") { //Defense Type
            if (Type == "Electric") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Flying") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Steel") { //Offense Type
                DMGDec *= 2; 
            }

            if (Type == "Ground") { //Offense Type
                DMGInc *= 2;
            }
        }

        if (onType[i] == "Grass") { //Defense Type
            if (Type == "Water") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Electric") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Grass") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Ground") { //Offense Type
                DMGDec *= 2; 
            }

            if (Type == "Fire") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Ice") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Poison") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Flying") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Bug") { //Offense Type
                DMGInc *= 2;
            }
        }

        if (onType[i] == "Ice") { //Defense Type
            if (Type == "Ice") { //Offense Type
                DMGDec *= 2; 
            }

            if (Type == "Fire") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Fighting") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Rock") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Steel") { //Offense Type
                DMGInc *= 2;
            }
        }

        if (onType[i] == "Fighting") { //Defense Type
            if (Type == "Bug") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Rock") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Dark") { //Offense Type
                DMGDec *= 2; 
            }

            if (Type == "Flying") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Psychic") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Fairy") { //Offense Type
                DMGInc *= 2;
            }
        }

        if (onType[i] == "Poison") { //Defense Type
            if (Type == "Grass") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Fighting") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Poison") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Bug") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Fairy") { //Offense Type
                DMGDec *= 2; 
            }

            if (Type == "Ground") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Psychic") { //Offense Type
                DMGInc *= 2;
            }
        }

        if (onType[i] == "Ground") { //Defense Type
            if (Type == "Electric") { //Offense Type
                DMGNull = 0; 
            }

            if (Type == "Poison") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Rock") { //Offense Type
                DMGDec *= 2; 
            }
            
            if (Type == "Water") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Grass") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Ice") { //Offense Type
                DMGInc *= 2;
            }
        }

        if (onType[i] == "Flying") { //Defense Type
            if (Type == "Ground") { //Offense Type
                DMGNull = 0; 
            }

            if (Type == "Grass") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Fighting") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Bug") { //Offense Type
                DMGDec *= 2; 
            }
            
            if (Type == "Electric") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Ice") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Rock") { //Offense Type
                DMGInc *= 2;
            }
        }

        if (onType[i] == "Psychic") { //Defense Type
            if (Type == "Fighting") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Psychic") { //Offense Type
                DMGDec *= 2; 
            }
            
            if (Type == "Bug") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Ghost") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Dark") { //Offense Type
                DMGInc *= 2;
            }
        }

        if (onType[i] == "Bug") { //Defense Type
            if (Type == "Grass") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Fighting") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Ground") { //Offense Type
                DMGDec *= 2; 
            }
            
            if (Type == "Fire") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Flying") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Rock") { //Offense Type
                DMGInc *= 2;
            }
        }

        if (onType[i] == "Rock") { //Defense Type
            if (Type == "Normal") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Fire") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Poison") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Flying") { //Offense Type
                DMGDec *= 2; 
            }
            
            if (Type == "Water") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Grass") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Fighting") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Ground") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Steel") { //Offense Type
                DMGInc *= 2;
            }
        }

        if (onType[i] == "Ghost") { //Defense Type
            if (Type == "Normal") { //Offense Type
                DMGNull = 0; 
            }
            if (Type == "Fighting") { //Offense Type
                DMGNull = 0; 
            }

            if (Type == "Poison") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Bug") { //Offense Type
                DMGDec *= 2; 
            }
            
            if (Type == "Ghost") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Dark") { //Offense Type
                DMGInc *= 2;
            }
        }

        if (onType[i] == "Dragon") { //Defense Type
            if (Type == "Fire") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Water") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Electric") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Grass") { //Offense Type
                DMGDec *= 2; 
            }
            
            if (Type == "Ice") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Dragon") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Fairy") { //Offense Type
                DMGInc *= 2;
            }
        }

        if (onType[i] == "Dark") { //Defense Type
            if (Type == "Psychic") { //Offense Type
                DMGNull = 0; 
            }

            if (Type == "Ghost") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Dark") { //Offense Type
                DMGDec *= 2; 
            }
            
            if (Type == "Fighting") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Bug") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Fairy") { //Offense Type
                DMGInc *= 2;
            }
        }

        if (onType[i] == "Steel") { //Defense Type
            if (Type == "Poison") { //Offense Type
                DMGNull = 0; 
            }

            if (Type == "Normal") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Grass") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Ice") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Flying") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Psychic") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Bug") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Rock") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Dragon") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Steel") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Fairy") { //Offense Type
                DMGDec *= 2; 
            }
            
            if (Type == "Fire") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Fighting") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Ground") { //Offense Type
                DMGInc *= 2;
            }
        }

        if (onType[i] == "Fairy") { //Defense Type
            if (Type == "Dragon") { //Offense Type
                DMGNull = 0; 
            }

            if (Type == "Fighting") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Bug") { //Offense Type
                DMGDec *= 2; 
            }
            if (Type == "Dark") { //Offense Type
                DMGDec *= 2; 
            }
            
            if (Type == "Poison") { //Offense Type
                DMGInc *= 2;
            }
            if (Type == "Steel") { //Offense Type
                DMGInc *= 2;
            }
        }
    }

    DMG = Math.floor(DMG * DMGInc);
    DMG = Math.floor(DMG / DMGDec);
    DMG = Math.floor(DMG * DMGNull);
    newDMG = DMG;

    return newDMG;
}
