function turnLight(off1, off2, on1, on2){
    document.getElementById(off1).classList.remove("active");
    document.getElementById(off2).classList.remove("active");
    document.getElementById(on1).classList.add("active");
    document.getElementById(on2).classList.add("active");
}