let HTMLcode = document.getElementById('myHTML');
let selected_user = 'mario';
let selected_enemy = 'bowser';

let user_curhp = 200;
let user_maxhp = 200;
let enemy_curhp = 300;
let enemy_maxhp = 300;

let hp_mario = 200;
let hp_mario_max = 200;
let hp_peach = 100;
let hp_peach_max = 100;
let hp_luigi = 140;
let hp_luigi_max = 140;
let hp_yoshi = 80;
let hp_yoshi_max = 80;
let hp_bowser = 300;
let hp_bowser_max = 300;

let defaultATK = 10;
let BowserATK = 15;


function viewHTML() {
    let newhtml = /*HTML*/`
            <div class="Gamebox col"> 
                <div class="char_select">
                    <div class="select_user">
                        <div class="selectBox" onClick="select('mario')"><img src="img/mario.png" class="select_img"/></div>
                        <div class="selectBox" onClick="select('luigi')"><img src="img/luigi.png" class="select_img"/></div>
                        <div class="selectBox" onClick="select('peach')"><img src="img/peach.png" class="select_img"/></div>
                        <div class="selectBox" onClick="select('yoshi')"><img src="img/yoshi.png" class="select_img"/></div>
                    </div>
                    <div class="select_enemy">
                         <div class="selectBox"></div>
                        <div class="selectBox" onClick="select('bowser')"><img src="img/bowser.png" class="select_img"/></div>
                        <div class="selectBox"></div>
                        <div class="selectBox"></div>
                    </div>
                </div>
                <div class="divider"></div>
                <div class="game_display">
                    <div class="game_grid">
                    <div class="char_user center">
                        <img src="img/${selected_user}.png" class="char"/>
                    </div>
                    <div class="hp_user center">
                        <div class="hpTxt">HP: ${user_curhp}/${user_maxhp}</div>
                        <div class="hpbar">
                            <div class="hpbar_full" style="width: ${calcPerctoPixel(user_curhp,user_maxhp,219)}px"></div>
                        </div>
                    </div>
                    <div class="char_enemy center">
                        <img src="img/${selected_enemy}.png" class="char"/>
                    </div>
                    <div class="hp_enemy center">
                        <div class="hpTxt">HP: ${enemy_curhp}/${enemy_maxhp}</div>
                        <div class="hpbar">
                            <div class="hpbar_full" style="width: ${calcPerctoPixel(enemy_curhp,enemy_maxhp,219)}px"></div>
                        </div>
                    </div>
                    <div class="split col center">
                        <div onClick="heal('user')" class="shroom"></div>
                        <div onClick="attack()" class="fight"></div>
                        <div onClick="heal('enemy')" class="bowser_shroom"></div>
                    </div>
                </div>
                </div>
                <div class="game_stats">
                </div>
                <div class="buttons_panel">
                </div>
            </div>
        `;

    HTMLcode.innerHTML = newhtml;
}
function calcPerctoPixel(cur,max,max_pixel) {
    let pixels = 0;
    pixels = (parseFloat(max_pixel) * (parseFloat(cur) / parseFloat(max)));
    console.log(pixels);
    return pixels;
}

function select(char) {
    if (char == 'mario') {
        user_curhp = hp_mario;
        user_maxhp = hp_mario_max;
        selected_user = char;
        viewHTML();
        return;
    }
    else if (char == 'peach') {
        user_curhp = hp_peach;
        user_maxhp = hp_peach_max;
        selected_user = char;
        viewHTML();
        return;
    }
    else if (char == 'luigi') {
        user_curhp = hp_luigi;
        user_maxhp = hp_luigi_max;
        selected_user = char;
        viewHTML();
        return;
    }
    else if (char == 'yoshi') {
        user_curhp = hp_yoshi;
        user_maxhp = hp_yoshi_max;
        selected_user = char;
        viewHTML();
        return;
    }
    else if (char == 'bowser') {
        enemy_curhp = hp_bowser;
        enemy_maxhp = hp_bowser_max;
        selected_enemy = char;
        viewHTML();
        return;
    }
}

function attack() {
    if (user_curhp != 0 && enemy_curhp != 0) {
        user_curhp -= BowserATK;
        if (user_curhp < 0) { user_curhp = 0; }
        enemy_curhp -= defaultATK;
        if (enemy_curhp < 0) { enemy_curhp = 0; }

        if (selected_user == 'mario') {
            hp_mario = user_curhp;
        }
        else if (selected_user == 'peach') {
            hp_peach = user_curhp;
        }
        else if (selected_user == 'luigi') {
            hp_luigi = user_curhp;
        }
        else if (selected_user == 'yoshi') {
            hp_yoshi = user_curhp;
        }

        viewHTML();
    }
}

function heal(target) {
    if (target == 'user') {
        user_curhp += 10;
        if (user_curhp > user_maxhp) { user_curhp = user_maxhp; }

        if (selected_user == 'mario') {
            hp_mario = user_curhp;
        }
        else if (selected_user == 'peach') {
            hp_peach = user_curhp;
        }
        else if (selected_user == 'luigi') {
            hp_luigi = user_curhp;
        }
        else if (selected_user == 'yoshi') {
            hp_yoshi = user_curhp;
        }
    }
    if (target == 'enemy') {
        enemy_curhp += 10;
        if (enemy_curhp > enemy_maxhp) { enemy_curhp = enemy_maxhp; }
    }

    viewHTML();
}

viewHTML();