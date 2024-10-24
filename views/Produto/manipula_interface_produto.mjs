import { altera, buscaUm, exclui, getLista, novo } from "./acessa_dados_produto.mjs";
import {consultarCEP, calcularFrete, exibirFrete} from "../Frete/acessa_dados_frete.mjs"

async function inserirProdPrincipal() {
    const boxcontainers = document.querySelectorAll('.vitrinePrincipal'); 
    const dados = await getLista();

    boxcontainers.forEach(function (boxcont) {
        for (let i = 0; i < dados.length; i++) {
            const swiper_slide = document.createElement('div');
            swiper_slide.classList.add('swiper-slide');

            const id = document.createElement('input');
            id.setAttribute('type', "hidden");
            id.setAttribute('id', "id");
            id.value = dados[i].id;

            const containerProduto = document.createElement('div');
            containerProduto.classList.add('container-produto');

            const a = document.createElement('a');
            a.setAttribute('href', "#");
            a.setAttribute('data-id', dados[i].id);

            const div = document.createElement('div');

            const imgProduto = document.createElement('div');
            imgProduto.classList.add('img-produto');

            const img = document.createElement('img');

            const detalhesProduto = document.createElement('div');
            detalhesProduto.classList.add('detalhes-produto');

            const type = document.createElement('div');
            type.classList.add('type');

            const nomeProduto = document.createElement('p');
            nomeProduto.classList.add('nome-produto');

            const detalhes = document.createElement('span');
            detalhes.classList.add('detalhes');

            const rate = document.createElement('span');
            rate.classList.add('rate'); 

            const preco = document.createElement('span');
            preco.classList.add('preco');

            const src = dados[i].image_url;
            img.setAttribute('src', src);

            id.innerText = dados[i].id;
            nomeProduto.innerText = dados[i].nome;
            detalhes.innerText = dados[i].descricao;

            let aux = "";
            let cont, cont2;
            for (cont = 0; cont < dados[i].rate; cont++) {
                aux += "&#9733;";
            }
            for (cont2 = cont; cont2 < 5; cont2++) {
                aux += "&#9734;";
            }

            rate.innerHTML = `${aux} ${dados[i].rate}`;
            preco.innerText = `\$${dados[i].preco}`;

            boxcont.appendChild(swiper_slide);

            swiper_slide.appendChild(containerProduto);
            swiper_slide.appendChild(id);
            containerProduto.appendChild(a);
            a.appendChild(div);

            div.appendChild(imgProduto);
            imgProduto.appendChild(img);

            div.appendChild(detalhesProduto);
            detalhesProduto.appendChild(type);
            type.appendChild(nomeProduto);
            type.appendChild(detalhes);
            type.appendChild(rate);
            detalhesProduto.appendChild(preco);

            a.addEventListener('click', function (event) {
                event.preventDefault();
                const productId = this.getAttribute('data-id');
                preencheTelaProd(productId);

                window.location.href = `/Produto/paginaProduto.html?id=${productId}`;
            });
        }
    });
}

async function inserirProdDestaque() {
    const boxcontainers = document.querySelectorAll('.vitrineDestaque'); 
    const dados = await getLista();

    boxcontainers.forEach(function (boxcont) {
        for (let i = 0; i < dados.length; i++) {
            const swiper_slide = document.createElement('div');
            swiper_slide.classList.add('swiper-slide');

            const id = document.createElement('input');
            id.setAttribute('type', "hidden");
            id.setAttribute('id', "id");
            id.value = dados[i].id;

            const container = document.createElement('div');
            container.classList.add('container');

            const box = document.createElement('a');
            box.classList.add('box');
            box.setAttribute('href', "../Produto/paginaProduto.html");
            box.setAttribute('data-id', dados[i].id);

            const div = document.createElement('div');

            const slideImg = document.createElement('div');
            slideImg.classList.add('slide-img');

            const img = document.createElement('img');

            const overlay = document.createElement('div');
            overlay.classList.add('overlay');

            const btnComprar = document.createElement('span');
            btnComprar.classList.add('btn-comprar');

            const detalhesBox = document.createElement('div');
            detalhesBox.classList.add('detalhes-box');

            const type = document.createElement('div');
            type.classList.add('type');

            const nomeProduto = document.createElement('p');
            nomeProduto.classList.add('nome-produto');

            const detalhes = document.createElement('span');
            detalhes.classList.add('detalhes');

            const rate = document.createElement('span');
            rate.classList.add('rate'); 

            const preco = document.createElement('span');
            preco.classList.add('preco');

            const src = dados[i].image_url;
            img.setAttribute('src', src);

            id.innerText = dados[i].id;
            nomeProduto.innerText = dados[i].nome;
            detalhes.innerText = dados[i].descricao;

            let aux = "";
            let cont, cont2;
            for (cont = 0; cont < dados[i].rate; cont++) {
                aux += "&#9733;";
            }
            for (cont2 = cont; cont2 < 5; cont2++) {
                aux += "&#9734;";
            }

            rate.innerHTML = `${aux} ${dados[i].rate}`;
            preco.innerText = `\$${dados[i].preco}`;

            boxcont.appendChild(swiper_slide);

            swiper_slide.appendChild(container);
            swiper_slide.appendChild(id);
            container.appendChild(box);
            box.appendChild(div);

            div.appendChild(slideImg);
            slideImg.appendChild(img);
            slideImg.appendChild(overlay);
            overlay.appendChild(btnComprar);

            div.appendChild(detalhesBox);
            detalhesBox.appendChild(type);
            type.appendChild(nomeProduto);
            type.appendChild(detalhes);
            type.appendChild(rate);
            detalhesBox.appendChild(preco);

            btnComprar.innerText = "Comprar agora";

            box.addEventListener('click', function (event) {
                event.preventDefault();
                const productId = this.getAttribute('data-id');
                preencheTelaProd(productId);

                window.location.href = `/Produto/paginaProduto.html?id=${productId}`;
            });
        }
    });
}

async function preencheTelaProd(id) {
    const produto = await buscaUm(id);  

    const imgPrincipal = document.getElementsByClassName("img-principal");
    if (imgPrincipal.length > 0) {
        imgPrincipal[0].setAttribute("src", produto.image_url);
    }

    const imgPreview = document.getElementsByClassName("img-preview");
    if (imgPreview.length > 0) {
        imgPreview[0].setAttribute("src", produto.image_url);
    }

    const nomeProd = document.getElementsByClassName("nome-prod");
    if (nomeProd.length > 0) {
        nomeProd[0].innerText = produto.nome;
    }

    const rate = document.getElementsByClassName("rate");
    if (rate.length > 0) {


            let aux = "";
            let cont, cont2;
            for (cont = 0; cont < produto.rate; cont++) {
                aux += "&#9733;";
            }
            for (cont2 = cont; cont2 < 5; cont2++) {
                aux += "&#9734;";
            }


        rate[0].innerHTML = aux +" "+ produto.rate; 
    }

    const detalhes = document.getElementsByClassName("detalhes");
    if (detalhes.length > 0) {
        detalhes[0].innerText = produto.descricao;
    }


    const valor = document.getElementsByClassName("valor");
    if (valor.length > 0) {
        valor[0].innerText = `\$${produto.preco}`;
    }

    console.log(produto);  

    const btnCalcularFrete = document.querySelector("#calcularFrete");
    btnCalcularFrete.addEventListener("click", async () => {
        const cepInput = document.querySelector("#cep").value;
        if (cepInput) {
            const endereco = await consultarCEP(cepInput);
            const frete = calcularFrete(cepInput);
            exibirFrete(endereco, frete);
        }
    });
}

window.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname;

    if (currentPage === "/index.html") {
        inserirProdPrincipal();
        inserirProdDestaque();
    } else if (currentPage === "/Produto/paginaProduto.html") {
        const params = new URLSearchParams(window.location.search);
        const productId = params.get('id');
        if (productId) {
            preencheTelaProd(productId);
        }
    } 
});
