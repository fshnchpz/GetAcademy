
let HTMLcode = document.getElementById('myHTML');
var geocoder;

viewHTML();

function weather_img(symbol_code) {
    let string = "";

    switch (symbol_code) {
        case 'clearsky_day':
            string = "01d";
            break;
        case 'fair_day':
            string = "02d";
            break;
        case 'partlycloudy_day':
            string = "03d";
            break;
        case 'cloudy':
            string = "04";
            break;
        case 'rainshowers_day':
            string = "05d";
            break;
        case 'rainshowersandthunder_day':
            string = "06d";
            break;
        case 'sleetshowers_day':
            string = "07d";
            break;
        case 'snowshowers_day':
            string = "08d";
            break;
        case 'rain':
            string = "09";
            break;
        case 'heavyrain':
            string = "10";
            break;
        case 'heavyrainandthunder':
            string = "11";
            break;
        case 'sleet':
            string = "12";
            break;
        case 'snow':
            string = "13";
            break;
        case 'snowandthunder':
            string = "14";
            break;
        case 'fog':
            string = "15";
            break;
        case 'sleetshowersandthunder_day':
            string = "20d";
            break;
        case 'snowshowersandthunder_day':
            string = "21d";
            break;
        case 'rainandthunder':
            string = "22";
            break;
        case 'sleetandthunder':
            string = "23";
            break;
        case 'lightrainshowersandthunder_day':
            string = "24d";
            break;
        case 'heavyrainshowersandthunder_day':
            string = "25d";
            break;
        case 'lightssleetshowersandthunder_day':
            string = "26d";
            break;
        case 'heavysleetshowersandthunder_day':
            string = "27d";
            break;
        case 'lightssnowshowersandthunder_day':
            string = "28d";
            break;
        case 'heavysnowshowersandthunder_day':
            string = "29d";
            break;
        case 'lightrainandthunder':
            string = "30";
            break;
        case 'lightsleetandthunder':
            string = "31";
            break;
        case 'heavysleetandthunder':
            string = "32";
            break;
        case 'lightsnowandthunder':
            string = "33";
            break;
        case 'heavysnowandthunder':
            string = "34";
            break;
        case 'lightrainshowers_day':
            string = "40d";
            break;
        case 'heavyrainshowers_day':
            string = "41d";
            break;
        case 'lightsleetshowers_day':
            string = "42d";
            break;
        case 'heavysleetshowers_day':
            string = "43d";
            break;
        case 'lightsnowshowers_day':
            string = "44d";
            break;
        case 'heavysnowshowers_day':
            string = "45d";
            break;
        case 'lightrain':
            string = "46";
            break;
        case 'lightsleet':
            string = "47";
            break;
        case 'heavysleet':
            string = "48";
            break;
        case 'lightsnow':
            string = "49";
            break;
        case 'heavysnow':
            string = "50";
            break;
        default:
            string = "missing";
            break;
    }

    if (string == "missing") {
        string = string + '.png';
    } else {
        string = string + '.svg';
    }

    return string;
}

function viewHTML() {
    let newhtml = /*HTML*/`
        <div class="myLocation">
        <div class="divider"></div>
        <div class="log">
        <h3>Orket ikke programmere inn 100+ switch cases for værmelding bilder. Så har bare rundt 50.<br>
        Bruker Latitude + longitude som parameter. Klarte ikke få til google maps api til å vise hvilke by. Den hadde så mange array objekter.
        <br>
        Brukte masse tid på å finne ut av react.js jquery og axios. For en eller annen grunn får jeg bare feil med import & require.</h3>
        </div>
        <div class="divider"></div>

        <div id="forecast1" class="forecast center">
                <h2>I dag (nå)</h2>
                <div class="celsius">${Temperature1} °C</div>
                <div class="weather_symbol col"><img src="icons/${weather_img(weather1)}" class="weather_img"/>
                Neste 6 timer</div>
        </div>
        <div class="divider"></div>

        <div id="forecast2" class="forecast center">
                <h2>I morgen (kl.12)</h2>
                <div class="celsius">${Temperature2} °C</div>
                <div class="weather_symbol col"><img src="icons/${weather_img(weather3)}" class="weather_img"/>
                Neste 6 timer</div>
        </div>
        <div class="divider"></div>

        <div id="forecast3" class="forecast center">
                <h2>Over i morgen (kl.12)</h2>
                <div class="celsius">${Temperature3} °C</div>
                <div class="weather_symbol col"><img src="icons/${weather_img(weather3)}" class="weather_img"/>
                Neste 6 timer</div>
        </div>
        `;

    HTMLcode.innerHTML = newhtml;
}



