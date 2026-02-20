let total = 0;

function agregar(){
    total++;
    document.getElementById("contador").innerHTML = total;
}

function comprar(){

    let mensaje = "Hola! Quiero comprar " + total + " productos de Primaverita Naturales";

    let url = "https://wa.me/51999888777?text=" + encodeURIComponent(mensaje);

    window.open(url);
}
