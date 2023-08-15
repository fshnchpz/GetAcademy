var ProductName = "Eple";
var ProductPrice = 350;
var ProductDiscount = 0;
var ActualPrice;

function changeName(value) {
    ProductName = value;
}
function changePrice(value) {
    ProductPrice = value;
}
function changeDiscount(value) {
    ProductDiscount = value;
}

function calcTotalPrice(Price,Discount) {
    let TotalPrice = 0;
    TotalPrice = Price - (Price * Discount / 100);

    return TotalPrice;
}

function GeneratePrice() {
    document.getElementById('textField').innerHTML = /*HTML*/ `
        Produktet: ${ProductName}<br>
        Vil koste deg nå: ${calcTotalPrice(ProductPrice,ProductDiscount)}<br>
    `;
}