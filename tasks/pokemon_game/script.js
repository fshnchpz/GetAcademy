let HTMLcode = document.getElementById("myHTML");
let pkmn_user = "None";
let pkmn_user_spr = "";
let pkmn_user_type = "";
let pkmn_enemy = "None";
let pkmn_enemy_spr = "";
let pkmn_enemy_type = "";
let pkmn_text = "Select your pokemon";
let party_sel = 0;
let previous_sel = 0;
let enemy_sel = 0;

let game_state = "in_battle";

let pkmn_party = [
    {"id":"venusaur","type":["Grass"],"curHP":270, "maxHP":270,"attack":152,"defense":153,"sp_atk":184,"sp_def":184,"speed":148,"moves":["Solar Beam"]},
    {"id":"blastoise","type":["Water"],"curHP":268, "maxHP":268,"attack":153,"defense":184,"sp_atk":157,"sp_def":193,"speed":144,"moves":["Hydro Pump"]},
    {"id":"charizard","type":["Fire"],"curHP":266, "maxHP":266,"attack":155,"defense":144,"sp_atk":200,"sp_def":157,"speed":184,"moves":["Fire Blast"]},
    {"id":"Flygon","type":["Ground","Dragon"],"curHP":270, "maxHP":270,"attack":184,"defense":148,"sp_atk":148,"sp_def":148,"speed":184,"moves":["Dragon Rush"]},
    {"id":"Rotom-frost","type":["Electric","Ice"],"curHP":210, "maxHP":210,"attack":121,"defense":197,"sp_atk":193,"sp_def":197,"speed":159,"moves":["Thunder","Blizzard"]}
];
const data_moves = [
    { "id":"Solar Beam", "Power": 120, "mType":"Grass", "Special":true,"Accuracy":100},
    { "id":"Solar Blade", "Power": 125, "mType":"Grass", "Special":false,"Accuracy":100},
    { "id":"Hydro Pump", "Power": 110, "mType":"Water", "Special":true,"Accuracy":80},
    { "id":"Liquidation", "Power": 85, "mType":"Water", "Special":false,"Accuracy":100},
    { "id":"Fire Blast", "Power": 110, "mType":"Fire", "Special":true,"Accuracy":85},
    { "id":"Flare Blitz", "Power": 120, "mType":"Fire", "Special":false,"Accuracy":100},
    
    { "id":"Thunder", "Power": 110, "mType":"Electric", "Special":true,"Accuracy":70},
    { "id":"Volt Tackle", "Power": 120, "mType":"Electric", "Special":false,"Accuracy":100},

    { "id":"Blizzard", "Power": 110, "mType":"Ice", "Special":true,"Accuracy":70},
    { "id":"Ice Hammer", "Power": 100, "mType":"Ice", "Special":false,"Accuracy":90},
    
    { "id":"Thunder", "Power": 110, "mType":"Electric", "Special":true,"Accuracy":70},
    { "id":"Volt Tackle", "Power": 120, "mType":"Electric", "Special":false,"Accuracy":100},
    
    { "id":"Dragon Pulse", "Power": 85, "mType":"Dragon", "Special":true,"Accuracy":70},
    { "id":"Dragon Rush", "Power": 120, "mType":"Dragon", "Special":false,"Accuracy":75},
    
    { "id":"Psychic", "Power": 90, "mType":"Psychic", "Special":true,"Accuracy":100},
    { "id":"Psychic Fangs", "Power": 85, "mType":"Psychic", "Special":false,"Accuracy":100}
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
    let switched = false;
  pkmn_user = pkmn_party[pkmn].id;
  pkmn_user_type = `
  <div class="type_user">
    <div class="pkmn_type_ico ${pkmn_party[pkmn].type[0]}">${pkmn_party[pkmn].type[0]}</div>
    <div class="pkmn_type_ico ${pkmn_party[pkmn].type}">${pkmn_party[pkmn].type}</div>
  </div>
  `;
  party_sel = pkmn;
  if (previous_sel != pkmn){
    switched = true;
  }
  previous_sel = pkmn;

  wildEncounter();
  if (pkmn_party[party_sel].curHP > 0 || enemy_party[enemy_sel].curHP > 0) {
    if (enemy_party[enemy_sel].speed > pkmn_party[party_sel].speed || switched){
        PKMN_Msgboard(`Opponent ${enemy_party[enemy_sel].id} moves first ...`);
        setTimeout(funcDamage,2000,enemy_party[enemy_sel],pkmn_party[party_sel],enemy_party[enemy_sel].moves[0]);
        setTimeout(PKMN_Msgboard,3000,`Your ${pkmn_party[party_sel].id} moves next ...`);
        setTimeout(funcDamage,5000,pkmn_party[party_sel], enemy_party[enemy_sel], pkmn_party[party_sel].moves[0]);
    }
    else
    {
        PKMN_Msgboard(`Your ${pkmn_party[party_sel].id} moves first ...`);
        setTimeout(funcDamage,2000,pkmn_party[party_sel], enemy_party[enemy_sel], pkmn_party[party_sel].moves[0]);
        setTimeout(PKMN_Msgboard,3000,`Opponent ${enemy_party[enemy_sel].id} moves next ...`);
        setTimeout(funcDamage,5000,enemy_party[enemy_sel],pkmn_party[party_sel],enemy_party[enemy_sel].moves[0]);
    }
  }
  
  
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
        return`<img src="img/${pkmn_party[id].id.toLowerCase()}_b.gif" class="pkmn_user"/>`;
    } else {
        return `<img src="img/${enemy_party[id].id.toLowerCase()}.gif" class="pkmn_enemy"/>`;
    }
}
function funcDamage(Attacker, Defender, Move_id) {
    if (Defender.curHP <= 0 || Attacker.curHP <= 0) {
        return;
    }

    let DMG = 0;
    let aMove = data_moves.find((tMove) => tMove.id === Move_id);
    let MoveType = aMove.mType;
    let isPhys = aMove.Special;
    let Power = aMove.Power;
    let iStabMult = 1;
    let ATK_Stat;
    let DEF_Stat;
    let Critical = 1;
    let Level = 50;
    let EnemyTypes = [];
    EnemyTypes = Defender.type;

    let HP = Math.floor(0.01 * (2 * 78 + 31) * 50) + 50 + 10

    if (isPhys) {
        ATK_Stat = Attacker.attack;
        DEF_Stat = Defender.defense;
    }
    else{
        ATK_Stat = Attacker.sp_atk;
        DEF_Stat = Attacker.sp_def;
    }
    
    for (i=0; i<Attacker.type.length; i++){
        if (Attacker.type[i] == MoveType) {
            iStabMult = 1.5;
        }
    }
    let randomNumber = Math.floor((Math.random() * 15) + 1);
  
    DMG = Math.floor(((((2 * Level) + 10)/250) * (ATK_Stat/DEF_Stat) * (Power) + 2) * iStabMult);
    
    DMG = TypeEffectiveness(DMG,MoveType,EnemyTypes);
    Defender.curHP -= DMG; 
    
    
    pkmn_text = `${(Attacker.id.toUpperCase())} hit ${(Defender.id.toUpperCase())} for ${DMG} damage !`;

    
    if (Defender.curHP < 0) {
        Defender.curHP = 0;

        setTimeout(PKMN_Msgboard, 2000,`${Defender.id.toUpperCase()} has fainted !`);
    }
    
    viewHTML();
}

function PKMN_Msgboard(text) {
    pkmn_text = text;
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
                    <img src="img/party/${pkmn_party[i].id.toLowerCase()}.png"/>
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
