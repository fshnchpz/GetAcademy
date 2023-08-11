function changeColorText(color,text){
    if (color != 'keep') {
        document.getElementById('textDiv').style.background = color;
    }
    if (text != 'keep') {
        document.getElementById('textBox').innerHTML = document.getElementById('text_input').value;
    }
}