import { altera, buscaUm, exclui, getLista, novo } from "./acessa_dados_produto.mjs";
import { consultarCEP, calcularFrete, exibirFrete } from "../Frete/acessa_dados_frete.mjs"

async function inserirProdPrincipal() {
    const boxcontainers = document.querySelectorAll('.vitrinePrincipal');
    const dados = await getLista();

    // Divide a lista de produtos em duas partes, uma para cada vitrine
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

            // Preenchendo as estrelas de avaliação
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
            type.appendChild(rate);
            detalhesBox.appendChild(preco);

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
        const productId = new URLSearchParams(window.location.search).get('id');

        inserirProdCarrinho(productId);

        notificacao.classList.remove('oculto');
        notificacao.classList.add('visivel');

        setTimeout(() => {
            notificacao.classList.remove('visivel');
            notificacao.classList.add('oculto');
        }, 3000);
    });

}

function contarProdutosCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const quantidadeTotal = carrinho.reduce((total, produto) => total + produto.quantidadeSelecionada, 0);
    return quantidadeTotal;
}

function carrinhoVazio() {
    if (contarProdutosCarrinho() == 0) {
        const vazio = document.querySelector(".vazio");

        vazio.innerHTML = '<h2>Seu carrinho está vazio!</h2><span>Você ainda não possui itens no seu carrinho.</span><button type="button" class="btnVazio">Ver produtos</button>';

        if (document.querySelector(".btnVazio")) {
            const btnVazio = document.querySelector(".btnVazio");
            btnVazio.addEventListener("click", (event) => {
                event.preventDefault();
                window.location.href = `/index.html`;
            });
        }
    }
}

async function inserirProdCarrinho(id) {
    const produto = await buscaUm(id);
    const listaProd = document.querySelector('#listaProd');

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    const produtoExistente = carrinho.find(item => item.id === produto.id);
    if (!produtoExistente) {
        produto.quantidadeSelecionada = 1;
        carrinho.push(produto);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
    } else {
        produto.quantidadeSelecionada = produtoExistente.quantidadeSelecionada;
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
        if (i === produto.quantidadeSelecionada) option.selected = true;
        qtd.appendChild(option);
    }

    const subtotal = document.createElement("div");
    subtotal.className = "subtotal";

    const preco = document.createElement("h2");
    preco.className = "preco";
    preco.innerText = `R$ ${(produto.preco * produto.quantidadeSelecionada).toFixed(2)}`;

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
        carrinho.forEach(produto => inserirProdCarrinho(produto.id));
    }

    btnRemove.addEventListener("click", () => {
        carrinho = carrinho.filter(item => String(item.id) !== String(produto.id));
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        renderizarCarrinho();
        atualizaTotalCarrinho();
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
            atualizaTotalCarrinho();
        } else {
            alert("Por favor, insira um CEP válido.");
        }
    });

    qtd.addEventListener("change", () => {
        carrinho = carrinho.map(item => {
            if (item.id === produto.id) item.quantidadeSelecionada = parseInt(qtd.value);
            return item;
        });
        localStorage.setItem('carrinho', JSON.stringify(carrinho));

        preco.innerText = `R$ ${(produto.preco * qtd.value).toFixed(2)}`;
        atualizaTotalCarrinho();
    });

    atualizaTotalCarrinho();
}

async function atualizaTotalCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    let calculado = 0.0;
    let quantidadeTotal = 0;

    carrinho.forEach(produto => {
        const quantidadeElement = document.getElementById(`qtd-${produto.id}`);
        const quantidade = quantidadeElement ? parseInt(quantidadeElement.value) : 1;
        calculado += produto.preco * quantidade;
        quantidadeTotal += quantidade;
    });

    const valorFreteElement = document.querySelector('.valorFrete');
    if (document.querySelector('.valorFrete')) {
        let totFrete = valorFreteElement.innerText.replace("R$", "").replace("Frete: ", "");
        let frete = parseFloat(totFrete);
        calculado += frete;
    }

    const totalElement = document.querySelector(".total");
    if (totalElement) {
        totalElement.innerText = `Total: R$ ${calculado.toFixed(2)}`;
    }

    document.getElementById('quantidade-itens').innerText = `Nº Itens: ${quantidadeTotal}`;
    document.getElementById('total').innerText = `Total: R$ ${calculado.toFixed(2)}`;
}

function carregarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.forEach(produto => inserirProdCarrinho(produto.id));
    atualizaTotalCarrinho();
    carrinhoVazio();
}

if (document.getElementById('finalizarPedido')) {
    document.getElementById('finalizarPedido').addEventListener('click', () => {
        if (contarProdutosCarrinho() == 0) {
            alert("Carrinho vazio! Que tal ver algúns produtos?");
        }
        else {

            if (document.querySelector(".valorFrete")) {
                const frete = document.querySelector(".valorFrete").innerText.replace("Frete: R$ ", "").replace(",", ".");
                guardafrete(frete);
            } else {
                localStorage.setItem('valorFrete', 0.00);
            }

            carregarDadosPagamento();
            abrirPopup();

            document.getElementById('popupPedido').addEventListener('click', fecharPopup);
        }
    });
}

function abrirPopup() {
    document.getElementById('popupPedido').style.display = 'block';
}

function fecharPopup() {
    document.getElementById('popupPedido').style.display = 'none';
}

if (document.querySelector('.btnFinalizarCompra')) {
    document.querySelector('.btnFinalizarCompra').addEventListener('click', () => {
        iniciarCheckout();
        localStorage.removeItem('carrinho');
        localStorage.removeItem('valorFrete');
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

window.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;

    switch (path) {
        case "/index.html":
            inserirProdPrincipal();
            inserirProdDestaque();
            break;
        case "/Produto/paginaProduto.html":
            const productId = new URLSearchParams(window.location.search).get('id');
            if (productId) preencheTelaProd(productId);
            inserirProdDestaque();
            break;
        case "/Compra/paginaCarrinho.html":
            carregarCarrinho();
            break;
    }
});

function guardafrete(frete) {
    localStorage.setItem('valorFrete', frete);
}

function carregarDadosPagamento() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const totalProdutos = carrinho.reduce((total, item) => total + item.preco * item.quantidadeSelecionada, 0);
    const quantidadeTotal = carrinho.reduce((total, item) => total + item.quantidadeSelecionada, 0);
    const frete = parseFloat(localStorage.getItem('valorFrete') || '0');
    const totalCompra = totalProdutos + frete;

    const listaProdutos = document.querySelector('.produtos-fim');
    listaProdutos.innerHTML = "";

    carrinho.forEach(produto => {
        const item = document.createElement('li');
        item.className = 'produto-item';
        item.innerHTML = `
            <span class="nome-produto">${produto.nome}</span> - 
            <span class="quantidade-produto">${produto.quantidadeSelecionada}x</span> - 
            <span class="preco-produto">R$ ${(produto.preco * produto.quantidadeSelecionada).toFixed(2)}</span>
        `;
        listaProdutos.appendChild(item);
    });

    // Atualiza os dados na página de pagamento
    document.querySelector('.quantidadeFinal').innerHTML = `<strong>Nº Itens:</strong> ${quantidadeTotal}`;
    document.querySelector('.precoFinal').innerHTML = `<strong>Total:</strong> R$${totalCompra.toFixed(2)}`;
}