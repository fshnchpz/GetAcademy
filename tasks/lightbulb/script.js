let BulbLit = false;

function toggleBulb() {
    if (!BulbLit) {
        document.getElementById('bulbBox').innerHTML = `<div class="bulbLit"></div>`;
        BulbLit = true;
    }
    else {
        document.getElementById('bulbBox').innerHTML = "";
        BulbLit = false;
    }
}