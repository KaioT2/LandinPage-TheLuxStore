import { getListaitensCarrinho, excluiitensCarrinho } from "../Itenscarrinho/acessa_dados_Itenscarrinho.mjs";
import { buscaUmCarrinho, excluiCarrinho } from "../Carrinho/acessa_dados_carrinho.mjs";
import { inserirProdCarrinho } from "../Produto/manipula_interface_produto.mjs";
import { decodeToken } from "../utils/decode.mjs";

async function atualizaTotalCarrinho(idCliente) {
    const carrinhoItens = await getListaitensCarrinho();

    const itensCliente = carrinhoItens.filter(item => item.Carrinho.ClienteId === idCliente);
    
    let calculado = 0.0;
    let quantidadeTotal = 0;

    itensCliente.forEach(item => {
        const quantidadeElement = document.getElementById(`qtd-${item.id}`);
        const quantidade = quantidadeElement ? parseInt(quantidadeElement.value) : item.quantidade;
        calculado += item.Produto.preco * quantidade;
        quantidadeTotal += quantidade;
    });

    const valorFreteElement = document.querySelector('.valorFrete');
    if (valorFreteElement) {
        const totFrete = valorFreteElement.innerText.replace("R$", "").replace("Frete: ", "").trim();
        const frete = parseFloat(totFrete) || 0.0;
        calculado += frete;
    }

    const totalElement = document.querySelector(".total");
    if (totalElement) {
        totalElement.innerText = `Total: R$ ${calculado.toFixed(2)}`;
    }

    const quantidadeItensElement = document.getElementById('quantidade-itens');
    if (quantidadeItensElement) {
        quantidadeItensElement.innerText = `Nº Itens: ${quantidadeTotal}`;
    }

    const totalCarrinhoElement = document.getElementById('total');
    if (totalCarrinhoElement) {
        totalCarrinhoElement.innerText = `Total: R$ ${calculado.toFixed(2)}`;
    }
}

async function carregarCarrinho(idCliente) {
    try {
        const carrinhoItens = await getListaitensCarrinho();

        if (!Array.isArray(carrinhoItens)) {
            throw new Error("Dados do carrinho inválidos ou não são uma lista.");
        }

        if (carrinhoItens.length > 0) {
            const idCarrinho = carrinhoItens[0]?.CarrinhoId;
            guardaCarrinho(idCarrinho); 
        } else {
            console.warn("Nenhum item encontrado no carrinho.");
        }
        
        const itensCliente = carrinhoItens.filter(item => item?.Carrinho?.Cliente?.id === idCliente);
        
        if(itensCliente.length > 0) {
            console.log("Itens do cliente encontrados:", itensCliente);

            await Promise.all(itensCliente.map(async item => {
                if (item?.ProdutoId) {
                    await inserirProdCarrinho(item.ProdutoId);
                } else {
                    console.warn("Item inválido encontrado no carrinho:", item);
                }
            }));

        await atualizaTotalCarrinho(idCliente);
        carrinhoVazio(itensCliente.length);
        }else{
            await atualizaTotalCarrinho(idCliente);
            carrinhoVazio(itensCliente.length);
        }
    } catch (error) {
        console.error("Erro ao carregar o carrinho:", error);
    }
}

async function limparCarrinho(idCarrinho) {
    try {

        const carrinho = await buscaUmCarrinho(idCarrinho);
        if (carrinho) {
            await excluiCarrinho(idCarrinho);
        }

        const itensCarrinho = await getListaitensCarrinho();

        const itensDoCarrinho = itensCarrinho.filter(item => item.CarrinhoId === idCarrinho);

        for (const item of itensDoCarrinho) {
            await excluiitensCarrinho(item.id);
        }

        console.log(`Carrinho (ID: ${idCarrinho}) e seus itens foram removidos com sucesso.`);
    } catch (error) {
        console.error(`Erro ao limpar o carrinho (ID: ${idCarrinho}):`, error);
        throw error;
    }
}

async function carrinhoVazio() {
    const token = localStorage.getItem('token');
    const { idCliente } = decodeToken(token); 

    if (await contarProdutosCarrinho(idCliente) == 0) {
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

async function contarProdutosCarrinho(idCliente) {
    const carrinhoItens = await getListaitensCarrinho();

    const itensCliente = carrinhoItens.filter(item => item.Carrinho.ClienteId === idCliente);

    const quantidadeTotal = itensCliente.reduce((total, item) => total + item.quantidade, 0);

    return quantidadeTotal;
}

function guardafrete(frete) {
    localStorage.setItem('valorFrete', frete);
}

var carrinho;
function guardaCarrinho(idcarrinho){
    carrinho = idcarrinho;
    console.log(carrinho);
}

function pegaCarrinho(){
    return carrinho;
}

async function carregarDadosPagamento(idCliente) {
    try {
        const carrinhoItens = await getListaitensCarrinho();
        const itensCliente = carrinhoItens.filter(item => item?.Carrinho?.ClienteId === idCliente); 
        if (!itensCliente.length) {
            console.warn("Carrinho vazio ou sem itens para o cliente.");
            return;
        }
        const totalProdutos = itensCliente.reduce((total, item) => {
            return total + (item.Produto.preco * item.quantidade);
        }, 0);

        const quantidadeTotal = itensCliente.reduce((total, item) => total + item.quantidade, 0);

        const valorFreteElement = document.querySelector('.valorFrete');

        let frete=0;
        if(document.querySelector(".valorFrete")){
             frete = document.querySelector(".valorFrete").innerText.replace("Frete: R$ ", "").replace(",", ".");
        }
        const totalCompra = totalProdutos + parseFloat(frete);

        const listaProdutos = document.querySelector('.produtos-fim');
        listaProdutos.innerHTML = "";

        itensCliente.forEach(item => {
            const produto = item.Produto;
            const itemElemento = document.createElement('li');
            itemElemento.className = 'produto-item';
            itemElemento.innerHTML = `
                <span class="nome-produto">${produto.nome}</span> - 
                <span class="quantidade-produto">${item.quantidade}x</span> - 
                <span class="preco-produto">R$ ${(produto.preco * item.quantidade).toFixed(2)}</span>
            `;
            listaProdutos.appendChild(itemElemento);
        });

        document.querySelector('.quantidadeFinal').innerHTML = `<strong>Nº Itens:</strong> ${quantidadeTotal}`;
        document.querySelector('.precoFinal').innerHTML = `<strong>Total:</strong> R$${totalCompra.toFixed(2)}`;
    } catch (error) {
        console.error("Erro ao carregar dados de pagamento:", error);
    }
}

function confereCliente() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert("Você precisa estar logado para acessar esta página.");
        window.location.href = "../Login/PaginaLogin.html"; 
        return false;
    }
    return decodeToken(token);
}

export {atualizaTotalCarrinho, carregarCarrinho, limparCarrinho, guardafrete, guardaCarrinho, pegaCarrinho, carregarDadosPagamento, contarProdutosCarrinho, carrinhoVazio, confereCliente};