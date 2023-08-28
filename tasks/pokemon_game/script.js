let HTMLcode = document.getElementById("myHTML");
let MovesHTML = "";
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
let firstSwitch = true;
let game_ready = true;
let user_dead = "";
let enemy_dead = "";

let game_state = "in_battle";

let pkmn_party = [
    {"id":"venusaur","name":"Venusaur","type":["Grass"],"curHP":270, "maxHP":270,"attack":152,"defense":153,"sp_atk":184,"sp_def":184,"speed":148,"moves":["Solar Beam"]},
    {"id":"blastoise","name":"Blastoise","type":["Water"],"curHP":268, "maxHP":268,"attack":153,"defense":184,"sp_atk":157,"sp_def":193,"speed":144,"moves":["Hydro Pump"]},
    {"id":"charizard","name":"Charizard","type":["Fire"],"curHP":266, "maxHP":266,"attack":155,"defense":144,"sp_atk":200,"sp_def":157,"speed":184,"moves":["Fire Blast"]},
    {"id":"Flygon","name":"Flygon","type":["Ground","Dragon"],"curHP":270, "maxHP":270,"attack":184,"defense":148,"sp_atk":148,"sp_def":148,"speed":184,"moves":["Dragon Rush"]},
    {"id":"Rotom-frost","name":"Rotom","type":["Electric","Ice"],"curHP":210, "maxHP":210,"attack":121,"defense":197,"sp_atk":193,"sp_def":197,"speed":159,"moves":["Thunder","Blizzard"]}
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
  MovesHTML = "";
  let TypesHTML = getTypes();
  if (game_ready && user_dead != "fainted") {
    loadMovesHTML();
  }
  if (game_state == "in_battle") {
    let newhtml = /*HTML*/ `
            <div class="game_app">
                ${TypesHTML}
                <div id="pkmn_sprite_front">${getSprite(enemy_sel,false)}</div>
                <div id="pkmn_sprite_back">${getSprite(party_sel,true)}</div>

                <div class="user_info">
                    <div class="rel">
                        <div class="user_pkmn_name">${pkmn_party[party_sel].name}</div>
                        <div class="user_hpfield"></div>
                        <div class="hp_bar_user" style="width: ${getPixelPerc(76,pkmn_party[party_sel].curHP,pkmn_party[party_sel].maxHP)}px;"></div>
                        <div class="user_HP_num">${pkmn_party[party_sel].curHP} / ${pkmn_party[party_sel].maxHP}</div>
                    </div>
                </div>
                <div class="enemy_info">
                    <div class="rel">
                        <div class="enemy_pkmn_name">${enemy_party[enemy_sel].name}</div>
                        <div class="enemy_hpfield"></div>
                        <div class="hp_bar_enemy" style="width: ${getPixelPerc(76,enemy_party[enemy_sel].curHP,enemy_party[enemy_sel].maxHP)}px;"></div>
                        <div class="enemy_HP_num">${enemy_party[enemy_sel].curHP} / ${enemy_party[enemy_sel].maxHP}</div>
                    </div>
                </div>
                <div class="moves_Cont">
                    ${MovesHTML}
                </div>
            </div>
            <div class="divider"></div>
            <div class="center">
            <div class="textboxo">
                <div id="textbox" class="textbox center">${pkmn_text}</div>
                </div>
            </div>
            <div class="game_sel center">
                ${pkmn_party_html}
            </div>
        `;
    HTMLcode.innerHTML = newhtml;
  }
}
function loadMovesHTML() {
    if (!game_ready){
        MovesHTML = "";
    }
    else{
        let PKMN = pkmn_party[party_sel];
        MovesHTML = "";
        for (i=0; i<PKMN.moves.length; i++) {
    
            let fMove = data_moves.find((tMove) => tMove.id === PKMN.moves[i]);
            let SpecialVar = "";
            if (fMove.Special) {
                SpecialVar = 'special';
            } else {
                SpecialVar = 'physical';
            }
            MovesHTML += /*HTML*/`
                <div class="move_outer ${fMove.mType}" onClick="useMove('${i}',false)">
                    <div class="move_box">
                        <div class="move_name">${fMove.id}</div><div class="move_power">${fMove.Power}</div><div class="move_type"><div class="pkmn_type_icox ${fMove.mType}">${fMove.mType}</div></div><div class="move_damage"><img src="img/move-${SpecialVar}.png"></div>
                    </div> 
                </div>
            `;
        }
    }
}

function switchPKMN(pkmn) {
    viewHTML();
    if (!game_ready){
        return;
    }
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
  
  if (pkmn_party[party_sel].curHP > 0) {
    user_dead = "";
  }

  wildEncounter();
  viewHTML();
  if (switched) {
    if (firstSwitch){
        firstSwitch = false;
    }
    else {
        useMove(0,true);
    }
  }
}
function anim_hurt(isPlayer) {
    if (isPlayer){
        if (document.getElementById('pk_user').style.opacity != 0) {
        document.getElementById('pk_user').style.opacity = 0;
    } else {
        document.getElementById('pk_user').style.opacity = 100;
    }
    } else 
    if (document.getElementById('pk_enemy').style.opacity != 0) {
        document.getElementById('pk_enemy').style.opacity = 0;
    } else {
        document.getElementById('pk_enemy').style.opacity = 100;
    }
}

function useMove(move_index, switched) {
    
    viewHTML();
    if (!game_ready){
        return;
    }
    let rand = Math.floor(Math.random() * enemy_party[enemy_sel].moves.length);
    
  if (pkmn_party[party_sel].curHP > 0 || enemy_party[enemy_sel].curHP > 0) {
    if (!switched) {
        if (enemy_party[enemy_sel].speed > pkmn_party[party_sel].speed){
            firstSwitch = false;
            game_ready = false;
            PKMN_Msgboard(`Opponent ${enemy_party[enemy_sel].name} moves first ...`);
            setTimeout(funcDamage,2000,enemy_party[enemy_sel],pkmn_party[party_sel],enemy_party[enemy_sel].moves[rand]);
            setTimeout(PKMN_Msgboard,3000,`Your ${pkmn_party[party_sel].name} moves next ...`);
            setTimeout(funcDamage,5000,pkmn_party[party_sel], enemy_party[enemy_sel], pkmn_party[party_sel].moves[move_index]);
            setTimeout(readyGame,5500);
            setTimeout(viewHTML,5600);
        }
        else
        {
            firstSwitch = false;
            game_ready = false;
            PKMN_Msgboard(`Your ${pkmn_party[party_sel].name} moves first ...`);
            setTimeout(funcDamage,2000,pkmn_party[party_sel], enemy_party[enemy_sel], pkmn_party[party_sel].moves[move_index]);
            setTimeout(PKMN_Msgboard,3000,`Opponent ${enemy_party[enemy_sel].name} moves next ...`);
            setTimeout(funcDamage,5000,enemy_party[enemy_sel],pkmn_party[party_sel],enemy_party[enemy_sel].moves[rand]);
            setTimeout(readyGame,5500);
            setTimeout(viewHTML,5600);
        }
    }
    else
    {
        game_ready = false;
        PKMN_Msgboard(`Opponent ${enemy_party[enemy_sel].name} moves first ...`);
        setTimeout(funcDamage,2000,enemy_party[enemy_sel],pkmn_party[party_sel],enemy_party[enemy_sel].moves[rand]);
        setTimeout(readyGame,2500);
        setTimeout(viewHTML,2600);
    }
  }
}

function readyGame(){
    game_ready = true;
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
        return`<img src="img/${pkmn_party[id].id.toLowerCase()}_b.gif" class="pkmn_user ${user_dead}" id="pk_user"/>`;
    } else {
        return `<img src="img/${enemy_party[id].id.toLowerCase()}.gif" class="pkmn_enemy ${enemy_dead}" id="pk_enemy"/>`;
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
    let Accuracy = aMove.Accuracy;
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
    let RNG = Math.random(Math.random()* 100);

    if (Accuracy >= RNG) {
        if (TypeEffMult(MoveType,EnemyTypes) < 1) {
            pkmn_text = `${(Attacker.name.toUpperCase())} used ${aMove.id} for ${DMG} damage.<br> It's not effective`;
        } else if (TypeEffMult(MoveType,EnemyTypes) > 1){
            pkmn_text = `${(Attacker.name.toUpperCase())} used ${aMove.id} for ${DMG} damage.<br> It's super effective!`;
        } else {
            pkmn_text = `${(Attacker.name.toUpperCase())} used ${aMove.id} for ${DMG} damage !`;
        }
            if (DMG != 0){
                if (Defender === pkmn_party[party_sel]) {
                    setTimeout(anim_hurt,100,true);
                    setTimeout(anim_hurt,200,true);
                    setTimeout(anim_hurt,300,true);
                    setTimeout(anim_hurt,400,true);
                } else {
                    setTimeout(anim_hurt,200,false);
                    setTimeout(anim_hurt,300,false);
                    setTimeout(anim_hurt,400,false);
                    setTimeout(anim_hurt,500,false);
                }
            }
            Defender.curHP -= DMG; 

        if (Defender.curHP < 0) {
            Defender.curHP = 0;
    
            setTimeout(PKMN_Msgboard, 2000,`${Defender.name.toUpperCase()} has fainted !`);

            if (Defender === pkmn_party[party_sel]) {
                user_dead = "fainted";
                firstSwitch = true;
            } else {
                enemy_dead = "fainted";
            }
        }
    } else {
        pkmn_text = `${(Attacker.name.toUpperCase())} used ${aMove.id} but missed !`;
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
  let box = 0;

  for (let i = 0; i < pkmn_inParty; i++) {
    if (pkmn_party[i].curHP <= 0) {
        pkmn_party_html += /*HTML*/ `
            <div class="pkmn_sel_box center">  
                <div class="pkmn_sel center">  
                    <div onclick="switchPKMN('${i}')" class="switch">
                        <img class="fainted" src="img/party/${pkmn_party[i].id.toLowerCase()}.png"/>
                    </div>
                </div>
            </div>
            `;
        } else {
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
  if (box == 6) {
    pkmn_party_html += '<br>';
    box = 0;
  }
  else {
    box++;
  }
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
    if (box == 6) {
        pkmn_party_html += '<br>';
        box = 0;
      }
      else {
        box++;
      }
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
function TypeEffMult(Type,onType) {
    let DMGInc = 1;
    let DMGDec = 1;
    let DMGNull = 1;
    let DMG = 1;

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

    return DMG;
}