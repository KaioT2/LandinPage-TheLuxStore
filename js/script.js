const produtos = document.getElementsById("img");
const img = documet.querySelectorAll("produtos-item-main");

let idx = 0;

function carrosel(){
    idx++;

    if(idx >= img.length-1){
        idx = 0;
    }

    produtos.style.transform = `translateX(${-idx*920}px)`;
}

setInterval(carrosel,1800);