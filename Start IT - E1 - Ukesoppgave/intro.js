//#region Theme Switch
var Theme = "Day";

function switchTheme() {
    if (Theme == "Day")
    {
        document.getElementById('aboutme').classList = [];
        document.getElementById('aboutme').classList.add('header');
        document.getElementById('aboutme').classList.add('header_night');
        
        document.getElementById('hobby').classList = [];
        document.getElementById('hobby').classList.add('header');
        document.getElementById('hobby').classList.add('header_night');
        
        document.getElementById('experience').classList = [];
        document.getElementById('experience').classList.add('header');
        document.getElementById('experience').classList.add('header_night');
        
        document.getElementById('theme').classList = [];
        document.getElementById('theme').classList.add('header');
        document.getElementById('theme').classList.add('header_night');

        document.getElementById('divider1').classList = [];
        document.getElementById('divider1').classList.add('divider');
        document.getElementById('divider1').classList.add('divider_night');
        document.getElementById('divider2').classList = [];
        document.getElementById('divider2').classList.add('divider');
        document.getElementById('divider2').classList.add('divider_night');

        document.getElementById('container').classList = [];
        document.getElementById('container').classList.add('container');
        document.getElementById('container').classList.add('container_night');

        document.getElementById('content').classList = [];
        document.getElementById('content').classList.add('content');
        document.getElementById('content').classList.add('content_night');

        document.getElementById('text').classList = [];
        document.getElementById('text').classList.add('text');
        document.getElementById('text').classList.add('text_night');
        document.getElementById('theme').innerHTML = "Theme: Night";
        Theme = "Night";
    }
    else {
        document.getElementById('aboutme').classList = [];
        document.getElementById('aboutme').classList.add('header');
        
        document.getElementById('hobby').classList = [];
        document.getElementById('hobby').classList.add('header');
        
        document.getElementById('experience').classList = [];
        document.getElementById('experience').classList.add('header');
        
        document.getElementById('theme').classList = [];
        document.getElementById('theme').classList.add('header');

        document.getElementById('divider1').classList = [];
        document.getElementById('divider1').classList.add('divider');
        document.getElementById('divider2').classList = [];
        document.getElementById('divider2').classList.add('divider');

        document.getElementById('container').classList = [];
        document.getElementById('container').classList.add('container');

        document.getElementById('content').classList = [];
        document.getElementById('content').classList.add('content');

        document.getElementById('text').classList = [];
        document.getElementById('text').classList.add('text');
        Theme = "Day";
        document.getElementById('theme').innerHTML = "Theme: Day";
    }
}
//#endregion

var divContent = 'aboutme';
loadContent('aboutme');

function loadContent(option) {
    if (option == 'aboutme') {
        document.getElementById('text').innerHTML = /*html*/`
            Jeg heter Johnny Dung Truong og jeg er 30 år gammel. <br>
            Jeg er født i norge og bor i Porsgrunn.<br>
            <br>
            Jeg liker å være kreativ med programmering og spill.<br>
            Har jobbet med diverse programmeringsspråk fra før av.<br>
        `;
    }
    else if (option == 'hobby') {
        document.getElementById('text').innerHTML = /*html*/`
            <b>Diverse</b>
            <ul>
                <li>Lage mat</li>
                <li>Spill utvikling</li>
                <li>Snakke Engelsk på nett</li>
            </ul>
            <b>Spill</b>
            <ul>
                <li>Final Fantasy XIV</li>
                <li>League of Legends</li>
                <li>Elite Dangerous</li>
                <li>Minecraft (Modpacks)</li>
            </ul>
        `;
    }
    else if (option == 'experience') {
        document.getElementById('text').innerHTML = /*html*/`
            <b>Koding</b>
            <ul>
                <li>HTML</li>
                <li>CSS (lite)</li>
                <li>JavaScript (lite)</li>
                <li>AJAX (lite)</li>
                <li>PHP</li>
                <li>SQL</li>
                <li>MySQL</li>
                <li>C# (lite)</li>
            </ul>
            <b>Spill Utivkling</b>
            <ul>
                <li>Game Design</li>
                <li>Art asset Design</li>
            </ul>
        `;
    }
    
}

