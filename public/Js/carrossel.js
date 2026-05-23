const carrossel = document.getElementById("carrossel");

let imagens = [];

if (carrossel) {
    imagens = carrossel.querySelectorAll("img");
}

let indice = 0;

function atualizar() {

    if (!carrossel) {
        return;
    }

    let valor = indice * 100;

    carrossel.style.transform = `translateX(-${valor}%)`;
}

function proxima() {

    if (imagens.length === 0) {
        return;
    }

    indice = (indice + 1) % imagens.length;

    atualizar();
}

function voltar() {

    if (imagens.length === 0) {
        return;
    }

    indice = (indice - 1 + imagens.length) % imagens.length;

    atualizar();
}

const btnVoltar = document.querySelector(".carrossel_btn_voltar");

const btnAvancar = document.querySelector(".carrossel_btn_avancar");

if (btnVoltar) {
    btnVoltar.addEventListener("click", voltar);
}

if (btnAvancar) {
    btnAvancar.addEventListener("click", proxima);
}

setInterval(proxima, 3000);

atualizar();