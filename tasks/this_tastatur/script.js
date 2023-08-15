function keyPress(keyP) {
    document.getElementById('textField').innerHTML += keyP.innerHTML;
}

function reset() {
    document.getElementById('textField').innerHTML = "";
}