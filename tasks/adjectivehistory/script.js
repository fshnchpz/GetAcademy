var Age = "___";
var Brand = "___";
var Color = "___";

function ViewHTML() {
    document.getElementById('container').innerHTML = /*HTML*/ `
        <div class="center"> <h1>Adjektiv Historie</h1> </div>
        <div class="divider"></div>
            <div class="center" id="textField">In my garage, I have this <span id="age">${Age}</span> car from <span id="brand">${Brand}</span>. It used to be red, but then I painted it <span id="color">${Color}</span> the other day.</div>
        <div class="divider"></div>
        <div class="col center" style="margin-top: 20px">
            <div class="keyboardBox">
                <div class="keyboard_btn" onClick="setAge(this.innerHTML)">new</div>
                <div class="keyboard_btn" onClick="setAge(this.innerHTML)">old</div>
            </div>
            <div class="keyboardBox">
                <div class="keyboard_btn" onClick="setBrand(this.innerHTML)">BMW</div>
                <div class="keyboard_btn" onClick="setBrand(this.innerHTML)">Mazda</div>
                <div class="keyboard_btn" onClick="setBrand(this.innerHTML)">Honda</div>
                <div class="keyboard_btn" onClick="setBrand(this.innerHTML)">Toyota</div>
            </div>
            <div class="keyboardBox">
                <div class="keyboard_btn" onClick="setColor(this.innerHTML)">black</div>
                <div class="keyboard_btn" onClick="setColor(this.innerHTML)">green</div>
                <div class="keyboard_btn" onClick="setColor(this.innerHTML)">pink</div>
                <div class="keyboard_btn" onClick="setColor(this.innerHTML)">purple</div>
            </div>
        </div>
    `;
}

function setAge(input) {
    Age = input;
    ViewHTML();
}
function setBrand(input) {
    Brand = input;
    ViewHTML();
}
function setColor(input) {
    Color = input;
    ViewHTML();
}