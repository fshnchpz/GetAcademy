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
let ball_HTML = `<div class="pkball_box"></div>`;

let game_state = "in_battle";
let battle_state = "wild";

let pkmn_party = [];
pkmn_party = JSON.parse(JSON.stringify(data_pkmn));
let enemy_party = [];
enemy_party = JSON.parse(JSON.stringify(pkmn_party));
let pkmn_party_html = "";

function viewHTML() {
  loadPartyHTML();
  MovesHTML = "";
  ball_HTML = "";
  let TypesHTML = getTypes();
  if (game_ready && user_dead != "fainted") {
    loadMovesHTML();
    loadPokeballHTML();
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
                    ${ball_HTML}
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
function loadPokeballHTML() {

    ball_HTML = /*HTML*/ `
        
    `;
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


function getPixelPerc(org_pix, min, max) {
    let NewPixels = org_pix;
    NewPixels = Math.floor((org_pix) * (min/max));
    return NewPixels;
}


function getSprite(id, isUser) {
    if (isUser) {
        return`<img src="https://img.pokemondb.net/sprites/black-white/anim/back-normal/${pkmn_party[id].id.toLowerCase()}.gif" class="pkmn_user ${user_dead}" id="pk_user"/>`;
    } else {
        return `<img src="https://img.pokemondb.net/sprites/black-white/anim/normal/${enemy_party[id].id.toLowerCase()}.gif" class="pkmn_enemy ${enemy_dead}" id="pk_enemy"/>`;
    }
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
    let RNG = Math.floor(Math.random() * 100);
    console.log(Accuracy + ' / ' + RNG);
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
                        <img class="fainted" src="https://img.pokemondb.net/sprites/black-white/normal/${pkmn_party[i].id.toLowerCase()}.png"/>
                    </div>
                </div>
            </div>
            `;
        } else {
    pkmn_party_html += /*HTML*/ `
        <div class="pkmn_sel_box center">  
            <div class="pkmn_sel center">  
                <div onclick="switchPKMN('${i}')" class="switch">
                    <img src="https://img.pokemondb.net/sprites/black-white/normal/${pkmn_party[i].id.toLowerCase()}.png"/>
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

viewHTML();