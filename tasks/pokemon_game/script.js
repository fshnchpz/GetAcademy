let HTMLcode = document.getElementById("myHTML");
let game_holder_div = document.getElementById("game_holder");
let belowCanvas_div = document.getElementById("afterCanvas");
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
let bag_items = [
    {"name":"pokeball","amount":25,"catch_rate":10.0},
    {"name":"greatball","amount":10,"catch_rate":15.0},
    {"name":"ultraball","amount":5,"catch_rate":20.0},
    {"name":"masterball","amount":1,"catch_rate":100.0}
];

let game_state = "in_battle";
let battle_state = "wild";

let pkmn_party = [];
let pkmn_filter = JSON.parse(JSON.stringify(data_pkmn));
let filtered = pkmn_filter.filter((p) => p.name == 'Pikachu');
pkmn_party = filtered;
pkmn_party = JSON.parse(JSON.stringify(pkmn_party));

let enemy_party = [];
enemy_party.push(getRandomPKMN());
//enemy_party = JSON.parse(JSON.stringify(data_pkmn));
let pkmn_party_html = "";

const canvas_black = canvas.getContext('2d');

function viewHTML() {
    if (!canvasReady) {
        canvas_black.fillStyle = "black";
        canvas_black.fillRect(0,0,2000,2000);
    }

  loadPartyHTML();
  MovesHTML = "";
  ball_HTML = "";
  let TypesHTML = getTypes();
  if (game_ready && user_dead != "fainted") {
    loadMovesHTML();
    loadPokeballHTML();
  }
  if (game_state == "in_battle") {
    let newhtml = ``;
    if (!canvasReady) {
        newhtml += /*HTML*/ `
                    <div class="game_app">
                        ${TypesHTML}
                        <div id="pkmn_sprite_front">${getSprite(enemy_sel,false)}</div>
                        <div id="pkmn_sprite_back">${getSprite(party_sel,true) ? getSprite(party_sel,true) : ""}</div>

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
                                <div class="enemy_pkmn_name">${enemy_party.length > 0 ? enemy_party[enemy_sel].name : ""}</div>
                                <div class="enemy_hpfield"></div>
                                <div class="hp_bar_enemy" style="width: ${enemy_party.length > 0 ? getPixelPerc(76,enemy_party[enemy_sel].curHP,enemy_party[enemy_sel].maxHP) : 0}px;"></div>
                                <div class="enemy_HP_num">${enemy_party.length > 0 ? enemy_party[enemy_sel].curHP : 0} / ${enemy_party.length > 0 ? enemy_party[enemy_sel].maxHP : 0}</div>
                            </div>
                        </div>
                        <div class="moves_Cont">
                            ${MovesHTML}
                        </div>
                        <div class="pkball_box" id="pkball_box">
                            <img src="img/bag.png"/>
                        </div>
                        <div class="pkball_cont" id="pkball_cont">
                            ${ball_HTML}
                        </div>
                    </div>
            `;
            document.getElementById('canvas_blank').style.opacity = '80%';
    }
    else {
        document.getElementById('canvas_blank').style.opacity = '0%';
    }
        game_holder_div.innerHTML = newhtml;

        belowCanvas_div.innerHTML = /*HTML*/`
            <div class="divider"></div>
            <div class="center">
                <div class="textboxo">
                    <div id="textbox" class="textbox center">${pkmn_text}</div>
                </div>
            </div>
            <div class="center">
                <div class="game_sel center">
                    ${pkmn_party_html}
                </div>
            </div>
    `;

    if (game_ready && user_dead != "fainted" && !canvasReady) {
        document.getElementById("pkball_box").addEventListener("mouseover", pkball_over);
        document.getElementById("pkball_box").addEventListener("mouseout", pkball_out);
        document.getElementById("pkball_cont").addEventListener("mouseover", pkball_over);
        document.getElementById("pkball_cont").addEventListener("mouseout", pkball_out);
    }
  }
  else if (game_state == "loading" && !canvasReady) {
    let newhtml = /*HTML*/ `
                <div class="game_app">
                    <div class="loading"></div>
                </div>
        `;
        game_holder_div.innerHTML = newhtml;

        belowCanvas_div.innerHTML = /*HTML*/`
        
            <div class="divider"></div>
            <div class="center">
                <div class="textboxo">
                    <div id="textbox" class="textbox center">${pkmn_text}</div>
                </div>
            </div>
            <div class="center">
                <div class="game_sel center">
                    ${pkmn_party_html}
                </div>
            </div>
        `;
  }
}

function pkball_over() {
     document.getElementById("pkball_cont").style.visibility = "visible";
     document.getElementById("pkball_cont").style.transform = "translateX(55px)";
}

function pkball_out() {
    document.getElementById("pkball_cont").style.transform = "translateX(-500px)";
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
function loadingScreen(newEncounter){
    readyGame = false;
    game_state = "loading";
    PKMN_Msgboard('Loading ...');
    viewHTML();
    setTimeout(function() {
        game_state = "in_battle";
        if (newEncounter == true) {
            wildEncounter();
        }
        readyGame = true;
        viewHTML();
    }, 2000);
}
function loadPokeballHTML() {

    ball_HTML = /*HTML*/ ``;
    
    for (i=0; i<bag_items.length; i++) {
        
        ball_HTML += /*HTML*/`
        <div class="pkball">
            <img src="img/ball_${bag_items[i].name}.png" onClick="catch_pkmn(${i})" class="pkball_img"/>
            <div class="pkball_num">${bag_items[i].amount}</div>
        </div>
        `;
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


function getPixelPerc(org_pix, min, max) {
    let NewPixels = org_pix;
    NewPixels = Math.floor((org_pix) * (min/max));
    return NewPixels;
}


function getSprite(id, isUser) {
    if (isUser) {
        return`<img src="https://img.pokemondb.net/sprites/black-white/anim/back-normal/${pkmn_party[id].id.toLowerCase()}.gif" class="pkmn_user ${user_dead}" id="pk_user"/>`;
    } else {
        if (enemy_party.length > 0) {
        return `<img src="https://img.pokemondb.net/sprites/black-white/anim/normal/${enemy_party[id].id.toLowerCase()}.gif" class="pkmn_enemy ${enemy_dead}" id="pk_enemy"/>`;
        } else {
            return ``;
        }
        
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

    if (enemy_party.length > 0) {
        HTML += `<div class="type_enemy">`;
        for (let i=0; i<enemy_party[e_id].type.length; i++) {
            HTML += `<div class="pkmn_type_ico ${enemy_party[e_id].type[i]}">${enemy_party[e_id].type[i]}</div>`;
        }
         HTML += `</div>`;
    }
    else
    {
    }

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
                enemy_party.splice(enemy_sel,1);
                enemy_sel = 0;
                enemy_dead = "fainted";
                //setTimeout(loadingScreen, 3000, true);
                setTimeout(() => {
                    game_ready = true;
                    canvasReady = true;
                    viewHTML();
                }, 3000);
            }
        }
    } else {
        pkmn_text = `${(Attacker.name.toUpperCase())} used ${aMove.id} but missed !`;
    }
    
    
    game_ready = true;
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
        pkmn_party_html.toLowerCase += '<br>';
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
    if (pkmn_party[party_sel].curHP < 1 || enemy_party[enemy_sel].curHP < 1) {
        return;
    }
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
            setTimeout(() => {
                game_ready = false;
                viewHTML();
            }, 2001);
            setTimeout(PKMN_Msgboard,3000,`Your ${pkmn_party[party_sel].name} moves next ...`);
            setTimeout(funcDamage,5000,pkmn_party[party_sel], enemy_party[enemy_sel], pkmn_party[party_sel].moves[move_index]);
            setTimeout(() => {
                game_Ready = true;
                viewHTML();
            }, 6000);
        }
        else
        {
            firstSwitch = false;
            game_ready = false;
            PKMN_Msgboard(`Your ${pkmn_party[party_sel].name} moves first ...`);
            setTimeout(funcDamage,2000,pkmn_party[party_sel], enemy_party[enemy_sel], pkmn_party[party_sel].moves[move_index]);
            setTimeout(() => {
                game_ready = false;
                viewHTML();
            }, 2001);
            setTimeout(PKMN_Msgboard,3000,`Opponent ${enemy_party[enemy_sel].name} moves next ...`);
            setTimeout(funcDamage,5000,enemy_party[enemy_sel],pkmn_party[party_sel],enemy_party[enemy_sel].moves[rand]);
            setTimeout(() => {
                game_Ready = true;
                viewHTML();
            }, 6000);
        }
    }
    else
    {
        game_ready = false;
        PKMN_Msgboard(`Opponent ${enemy_party[enemy_sel].name} moves first ...`);
        setTimeout(funcDamage,2000,enemy_party[enemy_sel],pkmn_party[party_sel],enemy_party[enemy_sel].moves[rand]);
        setTimeout(() => {
            game_Ready = true;
            viewHTML();
        }, 2500);
    }
  }
}

function readyGame(){
    game_ready = true;
}

function wildEncounter() {
    battle_state = "wild";
    game_state = "in_battle";
    enemy_party = [];
    let wild_pkmn = getRandomPKMN();

    while (pkmn_party.some(e => e.name == wild_pkmn.name)) {
        wild_pkmn = getRandomPKMN();
    }

    enemy_dead = "alive";
    enemy_party.push(wild_pkmn);
    enemy_party = JSON.parse(JSON.stringify(enemy_party));

    let id = enemy_sel;

    pkmn_enemy = pkmn_party[id].id;
    viewHTML();
}

function getRandomPKMN(){
    let pkmn_array = JSON.parse(JSON.stringify(data_pkmn));
    let rand_index = Math.floor(Math.random() * pkmn_array.length);

    let rand_pkmn = JSON.parse(JSON.stringify(pkmn_array[rand_index]));
    return rand_pkmn;
}

function catch_pkmn(ball) {
    if (battle_state != "wild") {
        PKMN_Msgboard('You can only use pokeballs on wild pokemon!');
        return;
    }
    let pokeball = bag_items[ball];
    if (bag_items[ball].amount < 1) {
        PKMN_Msgboard('You do not own more of this pokeball');
        return;
    }

    bag_items[ball].amount--;

    let enemy = enemy_party[enemy_sel];
    let multiplier = 1;
    let HP_Percent = (enemy.curHP / enemy.maxHP) * 100
    let chanceToCatch;
    if (HP_Percent <= 50) {
        multiplier = 1.5;
    } else if (HP_Percent <= 25) {
        multiplier = 2;
    } else if (HP_Percent <= 5) {
        multiplier = 3;
    }
    chanceToCatch = pokeball.catch_rate * multiplier;

    let rng = Math.round(Math.random() * 100);
    if (chanceToCatch > rng) {
        pkmn_party.push(enemy);
        pkmn_party = JSON.parse(JSON.stringify(pkmn_party));
        pkmn_party[pkmn_party.length-1].curHP = pkmn_party[pkmn_party.length-1].maxHP;

        enemy_party[enemy_sel].curHP = 0;
        enemy_party = [];
        PKMN_Msgboard('You successfully caught the ' + enemy.name.toUpperCase());
        setTimeout(function() {
            canvasReady = true;
            viewHTML();
        }, 1500);
    }
    else {
        PKMN_Msgboard(enemy.name.toUpperCase() + ' broke out of the pokeball!');
    }

    viewHTML();
}


function checkEncounter() {
    let metEncounter = false;
  
    for (let i = 0; i < encounters.length; i++) {
      const e = encounters[i];
      if (
        rectCollision({
          rect1: player,
          rect2: {
            ...e,
            position: {
              x: e.position.x,
              y: (e.position.y-16) + Character_speed,
            },
          },
        })
      ) {
        /* Walked into Grass for Encounter chance */
  
        metEncounter = true;
        break;
      }
    }
    if (metEncounter && canEncounter){
      let EncounterChance = 2;
      if (Math.floor(Math.random() * 300) < EncounterChance) {
        
        console.log('Meeting Encounter')
        canEncounter = false;
        setTimeout(() => {
          canEncounter = true;
        }, 250);

        wildEncounter();
        canvasReady = false;
        viewHTML();
      }
  
      
    }
    
    return metEncounter;
  }

loadingScreen(true);
viewHTML();