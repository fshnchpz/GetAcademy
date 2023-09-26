let HTMLcode = document.getElementById('myHTML');

let varNumber = 0
let varNumberString = '0'

let varInputNumb = 0
let varInputNumbString = '0'

let varInputHistory = []

function viewHTML() {
    let newhtml = /*HTML*/`
                <div class="calc">
                <div class="header">Kalkulator</div>
                <div class="display">
                    <div>${displayNumber()}</div>
                    <div class="inputHistory">${getHistory()}</div>
                </div>
                <div class="memorybuttons">
                    <div class="inactive">MC</div>
                    <div class="inactive">MR</div>
                    <div class="inactive">M+</div>
                    <div class="inactive">M-</div>
                    <div class="inactive">MS</div>
                    <div class="inactive">M∨</div>
                </div>
                <div class="gridbuttons">
                    <div onClick="mathOperator('%')">%</div><div onClick="resetInput()">CE</div><div onClick="fullReset()">C</div><div onClick="backspace()">⌫</div>
                    <div onClick="mathOperator('convertDec')">¹/ₓ</div><div onClick="mathOperator('exp')">x²</div><div onClick="mathOperator('sqrRoot')">√</div><div onClick="mathOperator('/')">÷</div>
                    <div class="num" onClick="digit(this.innerHTML)">7</div><div class="num" onClick="digit(this.innerHTML)">8</div><div class="num" onClick="digit(this.innerHTML)">9</div><div onClick="mathOperator('*')">⨯</div>
                    <div class="num" onClick="digit(this.innerHTML)">4</div><div class="num" onClick="digit(this.innerHTML)">5</div><div class="num" onClick="digit(this.innerHTML)">6</div><div onClick="mathOperator('-')">−</div>
                    <div class="num" onClick="digit(this.innerHTML)">1</div><div class="num" onClick="digit(this.innerHTML)">2</div><div class="num" onClick="digit(this.innerHTML)">3</div><div onClick="mathOperator('+')">+</div>
                    <div class="num" onClick="reverse()">±</div><div class="num" onClick="digit(this.innerHTML)">0</div><div class="num" onClick="digit(this.innerHTML)">.</div><div onClick="mathSum()">=</div>
                </div>
            </div>
        `;

    HTMLcode.innerHTML = newhtml;
}

function displayNumber() {
    let numString = varInputNumbString.split('.');
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

function getHistory() {
    let HistoryString = '';
    if (varInputHistory.length > 0) {
        for (let i=0; i<varInputHistory.length; i++) {
            HistoryString += varInputHistory[i];
        }
    }
    return HistoryString;
}

function digit(num) {
    console.log(`Digit click: ${num}`);

    let numString = varInputNumbString;
    let numArray = numString.split('');

    if (num == '.') {
        if (numArray.includes('.') || numArray == ""){
            return;
        }
    }
    if (num == '0') {
        if (numArray == "0"){
            return;
        }
    }
    
    if (varInputNumbString == '0') {
        if (num == '.' ){
            numArray.push(num);
        }
        else {
            numArray = [];
            numArray.push(num);
        }
    }
    else {
        numArray.push(num);
    }

    let newString = numArray.join('');

    varInputNumbString = newString;
    varInputNumb = parseFloat(varNumberString);

    // console.log(`varNumber: ${varNumber}`);
    // console.log(`varNumberString: ${varNumberString}`);

    viewHTML();
}

function reverse(){
    varInputNumb = varInputNumb - (varInputNumb * 2);
    varInputNumbString = varInputNumb.toString();

    viewHTML();
}

function fullReset() {
    varNumber = 0
    varNumberString = '0'
    varInputNumb = 0
    varInputNumbString = '0'
    varInputHistory = []

    viewHTML();
}
function resetInput() {
    varInputNumb = 0
    varInputNumbString = '0'

    viewHTML();
}

function backspace() {
    if (varInputNumbString == "0") {
        return;
    }
    let lastIndex = varInputNumbString.length - 1;
    
    let newStringArr = varInputNumbString.split('');
    newStringArr.splice((newStringArr.length - 1), 1);
    varInputNumbString = newStringArr.join('');
    varInputNumb = parseFloat(varNumberString);


    viewHTML();
}

function mathOperator(operator) {
    if (operator == '+' || operator == '-' || operator == '*' || operator == '/') {
        if (varInputHistory[varInputHistory.length-1] == operator) {
            return;
        }
        else {
            varNumber = parseFloat(varInputNumbString);
            varInputHistory.push(varInputNumbString);
            varInputHistory.push(operator);
            
            varInputNumb = 0;
            varInputNumbString = "0";

            viewHTML();
            return;
        }
    }
    else if (operator == '%') {
        if (parseFloat(varInputNumbString) > 0) {
            let PercentageValue = varNumber * (parseFloat(varInputNumbString)/100);

            varInputNumb = PercentageValue;
            varInputNumbString = PercentageValue.toString();
            viewHTML();
            return;
        }
    }
    else if (operator == 'exp') {
        let floatInput = parseFloat(varInputNumbString);
        varInputNumb = floatInput * floatInput;
        varInputNumbString = varInputNumb.toString();
        viewHTML();
        return;
    }
    else if (operator == 'convertDec') {
        let newInput = eval("1 / (" + varInputNumbString + ")");
        varInputHistory = ["Fraction/Decimal: 1 / (" + varInputNumbString + ")"]
        varInputNumb = newInput;
        varInputNumbString = varInputNumb.toString();
        viewHTML();
        varInputHistory = [];
        return;
    }
}

function mathSum() {
    varInputHistory.push(varInputNumbString);

    let result = eval(varInputHistory.join(' '));

    varNumber = result;
    varNumberString = result.toString();
    varInputNumb = result;
    varInputNumbString = result.toString();
    varInputHistory.push('=');

    viewHTML();
    varInputHistory = [];
}

viewHTML();