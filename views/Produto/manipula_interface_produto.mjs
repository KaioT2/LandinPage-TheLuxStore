import { buscaUm, getLista } from "./acessa_dados_produto.mjs";
import { consultarCEP, calcularFrete, exibirFrete } from "../Frete/acessa_dados_frete.mjs";
import { getListaitensCarrinho, novoitensCarrinho, alteraitensCarrinho, excluiitensCarrinho } from "../Itenscarrinho/acessa_dados_Itenscarrinho.mjs";
import { atualizaTotalCarrinho, carregarCarrinho, limparCarrinho, guardafrete, pegaCarrinho, carregarDadosPagamento, contarProdutosCarrinho, carrinhoVazio, confereCliente } from "../Carrinho/manipula_interface_carrinho.mjs";
import { decodeToken } from "../utils/decode.mjs";

async function inserirProdPrincipal() {
    const boxcontainers = document.querySelectorAll('.vitrinePrincipal');
    const dados = await getLista();

    const metade = Math.ceil(dados.length / 2);
    const produtosVitrine1 = dados.slice(0, metade);
    const produtosVitrine2 = dados.slice(metade);

    const vitrines = [produtosVitrine1, produtosVitrine2];

    vitrines.forEach((produtos, index) => {
        const boxcont = boxcontainers[index];

        produtos.forEach((produto) => {
            const swiper_slide = document.createElement('div');
            swiper_slide.classList.add('swiper-slide');

            const id = document.createElement('input');
            id.setAttribute('type', "hidden");
            id.setAttribute('id', "id");
            id.value = produto.id;

            const containerProduto = document.createElement('div');
            containerProduto.classList.add('container-produto');

            const a = document.createElement('a');
            a.setAttribute('href', "#");
            a.setAttribute('data-id', produto.id);

            const div = document.createElement('div');

            const imgProduto = document.createElement('div');
            imgProduto.classList.add('img-produto');

            const img = document.createElement('img');
            img.setAttribute('src', produto.image_url);

            const detalhesProduto = document.createElement('div');
            detalhesProduto.classList.add('detalhes-produto');

            const type = document.createElement('div');
            type.classList.add('type');

            const nomeProduto = document.createElement('p');
            nomeProduto.classList.add('nome-produto');
            nomeProduto.innerText = produto.nome;

            const rate = document.createElement('span');
            rate.classList.add('rate');

            const preco = document.createElement('span');
            preco.classList.add('preco');
            preco.innerText = `R$${produto.preco}`;

            let aux = "";
            for (let i = 0; i < produto.rate; i++) aux += "&#9733;";
            for (let i = produto.rate; i < 5; i++) aux += "&#9734;";
            rate.innerHTML = `${aux} ${produto.rate}`;

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
            type.appendChild(rate);
            detalhesProduto.appendChild(preco);

            a.addEventListener('click', function (event) {
                event.preventDefault();
                const productId = this.getAttribute('data-id');
                preencheTelaProd(productId);
                window.location.href = `${window.location.origin}/Produto/paginaProduto.html?id=${productId}`;
            });
        });
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

            const rate = document.createElement('span');
            rate.classList.add('rate');

            const preco = document.createElement('span');
            preco.classList.add('preco');

            const src = dados[i].image_url;
            img.setAttribute('src', src);

            id.innerText = dados[i].id;
            nomeProduto.innerText = dados[i].nome;

            let aux = "";
            let cont, cont2;
            for (cont = 0; cont < dados[i].rate; cont++) {
                aux += "&#9733;";
            }
            for (cont2 = cont; cont2 < 5; cont2++) {
                aux += "&#9734;";
            }

            rate.innerHTML = `${aux} ${dados[i].rate}`;
            preco.innerText = `R$${dados[i].preco}`;

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
            type.appendChild(preco);
            type.appendChild(rate);


            btnComprar.innerText = "Comprar agora";

            box.addEventListener('click', function (event) {
                event.preventDefault();
                const productId = this.getAttribute('data-id');
                preencheTelaProd(productId);

                window.location.href = `${window.location.origin}/Produto/paginaProduto.html?id=${productId}`;

            });
        }
    });
}

async function preencheTelaProd(id) {
    const produto = await buscaUm(id);

    document.title = "Comprar " + produto.nome;

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


        rate[0].innerHTML = aux + " " + produto.rate;
    }

    const detalhes = document.getElementsByClassName("detalhes");
    if (detalhes.length > 0) {
        detalhes[0].innerText = produto.descricao;
    }


    const valor = document.getElementsByClassName("valor");
    if (valor.length > 0) {
        valor[0].innerText = `R$${produto.preco}`;
    }

    const btnCalcularFrete = document.querySelector("#calcularFrete");
    btnCalcularFrete.addEventListener("click", async () => {
        const cepInput = document.querySelector("#cep").value;
        if (cepInput) {
            const endereco = await consultarCEP(cepInput);
            const frete = calcularFrete(cepInput);
            exibirFrete(endereco, frete);
        }
    });

    const btnAddCarrinho = document.querySelector(".btnAddCarrinho");
    const notificacao = document.getElementById("notificacao");
    const botaoCarrinhoNotfica = document.querySelector("#notificacao > button");

    botaoCarrinhoNotfica.addEventListener("click", function (event) {
        event.preventDefault();
        window.location.href = `/Compra/paginaCarrinho.html`;
    });

    btnAddCarrinho.addEventListener("click", (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Você precisa estar logado para adicionar produtos ao carrinho.");
            return;
        } else {

            const productId = new URLSearchParams(window.location.search).get('id');
            inserirProdCarrinho(productId);

            notificacao.classList.remove('oculto');
            notificacao.classList.add('visivel');

            setTimeout(() => {
                notificacao.classList.remove('visivel');
                notificacao.classList.add('oculto');
            }, 3000);
        }
    });
}

async function inserirProdCarrinho(idProduto) {

    const token = localStorage.getItem('token');
    if (!token) {
        alert("Você precisa estar logado para adicionar produtos ao carrinho.");
        return;
    }

    const {idCliente} = decodeToken(token);

    const listaProd = document.querySelector('#listaProd');

    const produto = await buscaUm(idProduto);

    let carrinhoItens = await getListaitensCarrinho();

    carrinhoItens = carrinhoItens.filter(item => item?.Carrinho?.Cliente?.id === idCliente);

    let itemExistente = carrinhoItens.find(item => item.Produto.id === produto.id);

    if (!itemExistente) {
        itemExistente = await novoitensCarrinho({
            idProduto,
            idCliente,
            quantidade: 1
        });

        carrinhoItens.push(itemExistente);
    }

    const itemProduto = document.createElement("li");
    itemProduto.className = "produto";

    const imgProduto = document.createElement("img");
    imgProduto.src = produto.image_url;

    const detalheProd = document.createElement("div");
    detalheProd.className = "detalhe-prod";

    const nomeProd = document.createElement("h2");
    nomeProd.className = "nomeProd";
    nomeProd.innerText = produto.nome;

    const quantidades = document.createElement("div");
    quantidades.className = "quantidades";

    const quantidade = document.createElement("span");
    quantidade.innerText = "Quantidade";

    const qtd = document.createElement("select");
    qtd.id = `qtd-${produto.id}`;
    qtd.className = "qtd";

    for (let i = 1; i <= produto.quantidade; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.innerText = i;
        if (i === itemExistente.quantidade) option.selected = true;
        qtd.appendChild(option);
    }

    const subtotal = document.createElement("div");
    subtotal.className = "subtotal";

    const preco = document.createElement("h2");
    preco.className = "preco";
    preco.innerText = `R$ ${(produto.preco * itemExistente.quantidade).toFixed(2)}`;

    const parcelas = document.createElement("div");
    parcelas.className = "parcelas";

    const imgCartao = document.createElement("img");
    imgCartao.src = "../images/cartao.png";

    const qtdParcelas = document.createElement("span");
    qtdParcelas.innerText = "até 10x sem juros";

    const btnRemove = document.createElement("button");
    btnRemove.className = "remove";

    const imgLixo = document.createElement("img");
    imgLixo.src = "../images/lixeira.png";
    btnRemove.appendChild(imgLixo);

    function renderizarCarrinho() {
        listaProd.innerHTML = "";
        carrinhoItens.forEach(item => inserirProdCarrinho(item.ProdutoId, idCliente));
    }

    btnRemove.addEventListener("click", async () => {
        await excluiitensCarrinho(itemExistente.id);

        carrinhoItens = carrinhoItens.filter(item => item.id !== itemExistente.id);
        renderizarCarrinho();
        await atualizaTotalCarrinho(idCliente);
        carrinhoVazio();
    });

    listaProd.appendChild(itemProduto);
    itemProduto.appendChild(imgProduto);
    itemProduto.appendChild(detalheProd);
    detalheProd.appendChild(nomeProd);

    itemProduto.appendChild(quantidades);
    quantidades.appendChild(quantidade);
    quantidades.appendChild(qtd);

    itemProduto.appendChild(subtotal);
    subtotal.appendChild(preco);
    subtotal.appendChild(parcelas);
    parcelas.appendChild(imgCartao);
    parcelas.appendChild(qtdParcelas);
    itemProduto.appendChild(btnRemove);

    const btnCalcularFrete = document.querySelector("#calcularFrete");
    btnCalcularFrete.addEventListener("click", async () => {
        const cepInput = document.querySelector("#cep").value.trim();
        if (cepInput) {
            const endereco = await consultarCEP(cepInput);
            const frete = await calcularFrete(cepInput);
            exibirFrete(endereco, frete);
            atualizaTotalCarrinho(idCliente);
        } else {
            alert("Por favor, insira um CEP válido.");
        }
    });

    qtd.addEventListener("change", async () => {
        const novaQuantidade = parseInt(qtd.value);
        itemExistente.quantidade = novaQuantidade;
        await alteraitensCarrinho({
            id: itemExistente.id,
            idProduto,
            idCarrinho: itemExistente.CarrinhoId,
            quantidade: novaQuantidade
        });
        preco.innerText = `R$ ${(produto.preco * novaQuantidade).toFixed(2)}`;
        await atualizaTotalCarrinho(idCliente);
    });

    await atualizaTotalCarrinho(idCliente);
}

if (document.getElementById('finalizarPedido')) {
    document.getElementById('finalizarPedido').addEventListener('click', async () => {
        if (contarProdutosCarrinho() == 0) {
            alert("Carrinho vazio! Que tal ver alguns produtos?");
        } else {
            try {
                if (document.querySelector(".valorFrete")) {
                    const frete = document.querySelector(".valorFrete").innerText.replace("Frete: R$ ", "").replace(",", ".");
                    guardafrete(frete);
                } else {
                    localStorage.setItem('valorFrete', 0.00);
                }
                carregarDadosPagamento();
                abrirPopup();

            } catch (error) {
                console.error("Erro ao finalizar pedido:", error);
                alert("Ocorreu um erro ao finalizar o pedido. Tente novamente.");
            }
        }

        document.getElementById('popupPedido').addEventListener('click', fecharPopup);
    });
}

function abrirPopup() {
    document.getElementById('popupPedido').style.display = 'block';
}

function fecharPopup() {
    document.getElementById('popupPedido').style.display = 'none';
}

if (document.querySelector('.btnFinalizarCompra')) {
    document.querySelector('.btnFinalizarCompra').addEventListener('click', async () => {
        iniciarCheckout();
        await limparCarrinho(pegaCarrinho());
    });
}

async function iniciarCheckout() {
    const precoElemento = document.querySelector('.precoFinal');
    const precoTexto = precoElemento.innerText.replace('Total: R$', '').replace(',', '.');
    const precoFinal = parseFloat(precoTexto);

    const response = await fetch('/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ preco: precoFinal })
    });

    const data = await response.json();
    if (data.url) {
        window.location.href = data.url;
    } else {
        console.error('Erro ao redirecionar para o checkout');
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    const path = window.location.pathname;

    switch (path) {
        case "/index.html":
            await inserirProdPrincipal();
            await inserirProdDestaque();
            break;
        case "/Produto/paginaProduto.html":
            const productId = new URLSearchParams(window.location.search).get('id');
            if (productId) {
                await preencheTelaProd(productId);
            }
            await inserirProdDestaque();
            break;
        case "/Compra/paginaCarrinho.html":
            confereCliente();
            const token = localStorage.getItem('token');
            const { idCliente } = decodeToken(token);
            await carregarCarrinho(idCliente);
            break;
        default:
            console.warn(`Nenhuma ação associada ao caminho: ${path}`);
            break;
    }
});

export { inserirProdCarrinho };