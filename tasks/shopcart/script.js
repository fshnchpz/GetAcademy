let HTMLcode = document.getElementById("myHTML");
let Cart = [];

function viewHTML() {
  let newhtml = /*HTML*/ `
  <h3>Trykk på feltet for å legge til i handleliste. Evt trykk igjen for å endre.</h3>
    <table class="myList">
        <tr>
            <th>Produkt</th>
            <th>Slett</th>
        </tr>`;

    for (let i=0; i<Cart.length; i++) {
        newhtml += /*HTML*/ `<tr>
        <td><input id="item" value="${Cart[i]}" type="text" onChange="list_edit(${i},this.value)"/></td>
        <td><button onClick="list_delete(${i})">X</button></td></tr>`;
    }
    
    newhtml += /*HTML*/ `
    <tr><td><input id="item" value="" type="text" onChange="list_add(this.value)"/></td><td></td></tr>
    `;

  HTMLcode.innerHTML = newhtml;
}
viewHTML();

/* Controller */
function list_add(value) {
  Cart.push(value);
  viewHTML();
}
function list_edit(i,value) {
    Cart[i] = value;
    viewHTML();
}

function list_delete(i) {
    Cart.splice(i,1);
    viewHTML();
}