let HTMLcode = document.getElementById('myHTML');
let Score = 0;
let button_opacity = ["opacity: 0.3", "opacity: 0.3", "opacity: 0.3", "opacity: 0.3"];
let animArray = [];
let answerArray = [];
let roundArray = [];
let Started = false;
let Lost = false;
let Go = false;
let Round = 0;
let userRound = 0;
let anim_Round = 0;
let bReady = true;

function viewHTML() {
    let newhtml = "";
    
    if (Lost) {
        newhtml = /*HTML*/`
        <div class="col center">
            <div class="circle">
                <div class="inner">
                    <div class="simonbutton yellow" id="0" style="${button_opacity[0]}"></div>
                    <div class="simonbutton blue" id="1" style="${button_opacity[1]}"></div>
                    <div class="simonbutton red" id="2" style="${button_opacity[2]}"></div>
                    <div class="simonbutton green" id="3" style="${button_opacity[3]}"></div>
                    <div class="start" onClick="">You LOSE!</div>
                </div>
            </div>
            <div id="score" class="col"><div>Score</div><div>${Score}</div></div>
        </div>
        `;
    }
    else if (Go) {
        newhtml = /*HTML*/`
        <div class="col center">
            <div class="circle">
                <div class="inner">
                    <div class="simonbutton yellow" id="0" style="${button_opacity[0]}" onClick="simon_click(0)"></div>
                    <div class="simonbutton blue" id="1" style="${button_opacity[1]}" onClick="simon_click(1)"></div>
                    <div class="simonbutton red" id="2" style="${button_opacity[2]}" onClick="simon_click(2)"></div>
                    <div class="simonbutton green" id="3" style="${button_opacity[3]}" onClick="simon_click(3)"></div>
                    <div class="go" onClick="">Go</div>
                </div>
            </div>
            <div id="score" class="col"><div>Score</div><div>${Score}</div></div>
        </div>
        `;
    }
    else if (!Started) {
        newhtml = /*HTML*/`
        <div class="col center">
            <div class="circle">
                <div class="inner">
                    <div class="simonbutton yellow" id="0" style="${button_opacity[0]}"></div>
                    <div class="simonbutton blue" id="1" style="${button_opacity[1]}"></div>
                    <div class="simonbutton red" id="2" style="${button_opacity[2]}"></div>
                    <div class="simonbutton green" id="3" style="${button_opacity[3]}"></div>
                    <div class="start" onClick="start()">START</div>
                </div>
            </div>
            <div id="score" class="col"><div>Score</div><div>${Score}</div></div>
        </div>
        `;
    } else {
        newhtml = /*HTML*/`
        <div class="col center">
            <div class="circle">
                <div class="inner">
                    <div class="simonbutton yellow" id="0" style="${button_opacity[0]}" onClick="simon_click(0)"></div>
                    <div class="simonbutton blue" id="1" style="${button_opacity[1]}" onClick="simon_click(1)"></div>
                    <div class="simonbutton red" id="2" style="${button_opacity[2]}" onClick="simon_click(2)"></div>
                    <div class="simonbutton green" id="3" style="${button_opacity[3]}" onClick="simon_click(3)"></div>
                </div>
            </div>
            <div id="score" class="col"><div>Score</div><div>${Score}</div></div>
        </div>
        `;
    }

    HTMLcode.innerHTML = newhtml;
}

viewHTML();

/* Controller */
function start(){
    Started = true;
    bReady = false;
    Round = 0;
    Score = 0;
    animArray = [];
    answerArray = [];
    roundArray = [];
    addRound();
}
function addRound(){
    if (Lost) {
        return;
    }
    
    Round++;
    let rand_index = Math.floor(Math.random() * 4);
    answerArray.push(rand_index);
    animArray = answerArray;
    roundArray = answerArray;
    userRound = 0;
    anim_Round = 0;
    animate_array();
}
function animate_array() {
    if (Lost) {
        return;
    }

    button_opacity = ["opacity: 0.3", "opacity: 0.3", "opacity: 0.3", "opacity: 0.3"];
    viewHTML();

    if (anim_Round < animArray.length) {
        bReady = false;

        setTimeout(() => {
            let index = answerArray[anim_Round];
            button_opacity[index] = "opacity: 1";
            viewHTML();
            anim_Round++;

            setTimeout(() => {
                animate_array();
            }, 300);

        }, 300);
    }
    else{
        bReady = true;
        userRound = 0;
        Go = true;
        viewHTML();
        return;
    }
}

function simon_click(index){
    if (!bReady || Lost) {
        return;
    }
    
    Go = false;
    viewHTML();

    if (userRound < answerArray.length) {

        button_opacity = ["opacity: 0.3", "opacity: 0.3", "opacity: 0.3", "opacity: 0.3"];
        button_opacity[index] = "opacity: 1";
        viewHTML();

        if (index == answerArray[userRound]) {
            if (userRound == (answerArray.length - 1)){

                userRound = 0;
                Score++;
                viewHTML(); 
                setTimeout(() => {
                    button_opacity = ["opacity: 0.3", "opacity: 0.3", "opacity: 0.3", "opacity: 0.3"];
                    viewHTML(); 
                }, 200);

                setTimeout(() => {
                    addRound();
                }, 1000);
            }
            else {
                bReady = false;
                setTimeout(() => {
                    button_opacity = ["opacity: 0.3", "opacity: 0.3", "opacity: 0.3", "opacity: 0.3"];
                    viewHTML(); 
                    bReady = true;
                }, 200);
                
            }
            userRound++;
            
        }
        else {
            lose();
        }
    }
    else {
    }
    
}

function lose(){
    bReady = false;
    Lost = true;
    viewHTML();
}