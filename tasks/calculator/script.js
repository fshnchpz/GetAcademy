let HTMLcode = document.getElementById('myHTML');

let varNumber = 0
let varNumberString = '0'

function viewHTML() {
    let newhtml = /*HTML*/`
                <div class="calc">
                <div class="header">Kalkulator</div>
                <div class="display"><div>${displayNumber()}</div></div>
                <div class="memorybuttons">
                    <div class="inactive">MC</div>
                    <div class="inactive">MR</div>
                    <div class="inactive">M+</div>
                    <div class="inactive">M-</div>
                    <div class="inactive">MS</div>
                    <div class="inactive">M∨</div>
                </div>
                <div class="gridbuttons">
                    <div>%</div><div>CE</div><div>C</div><div>⌫</div>
                    <div>¹/ₓ</div><div>x²</div><div>√</div><div>÷</div>
                    <div class="num" onClick="digit(this.innerHTML)">7</div><div class="num" onClick="digit(this.innerHTML)">8</div><div class="num" onClick="digit(this.innerHTML)">9</div><div>⨯</div>
                    <div class="num" onClick="digit(this.innerHTML)">4</div><div class="num" onClick="digit(this.innerHTML)">5</div><div class="num" onClick="digit(this.innerHTML)">6</div><div>−</div>
                    <div class="num" onClick="digit(this.innerHTML)">1</div><div class="num" onClick="digit(this.innerHTML)">2</div><div class="num" onClick="digit(this.innerHTML)">3</div><div>+</div>
                    <div class="num" onClick="reverse()">±</div><div class="num" onClick="digit(this.innerHTML)">0</div><div class="num" onClick="digit(this.innerHTML)">.</div><div>=</div>
                </div>
            </div>
        `;

    HTMLcode.innerHTML = newhtml;
}

function displayNumber() {
    let numString = varNumberString.split('.');
    let thousand_parts = [];

    let numArray = numString[0].split('').reverse();

    for (let i=0; i< numArray.length; i+=3){
        let part = numArray.slice(i, i+3).reverse().join('');
        thousand_parts.unshift(part);
    } 

    let newNumString = thousand_parts.join(',');
    
    let displayNum
    
    if (numString.length > 1) {
        displayNum = newNumString + '.' + numString[1];
    } else {
        displayNum = newNumString;
    }

    return displayNum;
}

function digit(num) {
    console.log(`Digit click: ${num}`);

    let numString = varNumberString;
    let numArray = numString.split('');

    if (num == '.') {
        if (numArray.includes('.')){
            return;
        }
    }
    
    
    if (varNumberString == '0') {
        if (num == '.' ){
            numArray.push(num);
        }
        else {
            numArray.splice(0,1);
            numArray.push(num);
        }
    }
    numArray.push(num);

    let newString = numArray.join('');

    varNumberString = newString;
    varNumber = parseFloat(varNumberString);

    console.log(`varNumber: ${varNumber}`);
    console.log(`varNumberString: ${varNumberString}`);

    viewHTML();
}

function reverse(){
    varNumber = varNumber - (varNumber * 2);
    varNumberString = varNumber.toString();

    viewHTML();
}

viewHTML();