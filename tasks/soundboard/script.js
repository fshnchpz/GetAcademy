let HTMLcode = document.getElementById('myHTML');

function viewHTML() {
    let newhtml = /*HTML*/`
    <div class="center col">
        <div class="btn_sfx bounce-left" onclick="playsfx('bubbles')"><img src="img/speaker.svg" class="ico_speaker"/>
            <span class="sfx_txt">bubble.mp3</span>
            <audio id="bubbles" class="sound" src="sfx/bubbles.mp3"></audio>
        </div>
        <div class="btn_sfx bounce-left" onclick="playsfx('clay')"><img src="img/speaker.svg" class="ico_speaker"/>
            <span class="sfx_txt">clay.mp3</span>
            <audio id="clay" class="sound" src="sfx/clay.mp3"></audio>
        </div>
        <div class="btn_sfx bounce-left" onclick="playsfx('confetti')"><img src="img/speaker.svg" class="ico_speaker"/>
            <span class="sfx_txt">confetti.mp3</span>
            <audio id="confetti" class="sound" src="sfx/confetti.mp3"></audio>
        </div>
        <div class="btn_sfx bounce-left" onclick="playsfx('glimmer')"><img src="img/speaker.svg" class="ico_speaker"/>
            <span class="sfx_txt">glimmer.mp3</span>
            <audio id="glimmer" class="sound" src="sfx/glimmer.mp3"></audio>
        </div>
        <div class="btn_sfx bounce-left" onclick="playsfx('moon')"><img src="img/speaker.svg" class="ico_speaker"/>
            <span class="sfx_txt">moon.mp3</span>
            <audio id="moon" class="sound" src="sfx/moon.mp3"></audio>
        </div>
        <div class="btn_sfx bounce-left" onclick="playsfx('ufo')"><img src="img/speaker.svg" class="ico_speaker"/>
            <span class="sfx_txt">ufo.mp3</span>
            <audio id="ufo" class="sound" src="sfx/ufo.mp3"></audio>
        </div>
    </div>
    
    `;

    HTMLcode.innerHTML = newhtml;
}

function playsfx(sound) {
    document.getElementById(sound).play();
}
