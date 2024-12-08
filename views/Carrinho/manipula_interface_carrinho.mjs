import { getListaitensCarrinho, excluiitensCarrinho } from "../Itenscarrinho/acessa_dados_Itenscarrinho.mjs";
import { buscaUmCarrinho, excluiCarrinho } from "../Carrinho/acessa_dados_carrinho.mjs";
import { inserirProdCarrinho } from "../Produto/manipula_interface_produto.mjs";

async function atualizaTotalCarrinho(/*idCliente*/) {
    const carrinhoItens = await getListaitensCarrinho();

    const itensCliente = carrinhoItens.filter(item => item.Carrinho.ClienteId === 1/*idCliente*/);
    
    let calculado = 0.0;
    let quantidadeTotal = 0;

    itensCliente.forEach(item => {
        const quantidadeElement = document.getElementById(`qtd-${item.id}`);
        const quantidade = quantidadeElement ? parseInt(quantidadeElement.value) : item.quantidade;
        calculado += item.Produto.preco * quantidade; // Supondo que 'Produto' está relacionado a ItemCarrinho
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

async function carregarCarrinho(/*idCliente*/) {
    try {
        const carrinhoItens = await getListaitensCarrinho();

        if (!Array.isArray(carrinhoItens)) {
            throw new Error("Dados do carrinho inválidos ou não são uma lista.");
        }

        if (carrinhoItens.length > 0) {
            const idCarrinho = carrinhoItens[0]?.CarrinhoId;
            guardaCarrinho(idCarrinho); // Armazena o ID do carrinho
        } else {
            console.warn("Nenhum item encontrado no carrinho.");
        }

        const itensCliente = carrinhoItens.filter(item => item?.Carrinho?.ClienteId === 1/*idCliente*/);
        
        console.log("Itens do cliente encontrados:", itensCliente);

        await Promise.all(itensCliente.map(async item => {
            if (item?.ProdutoId) {
                await inserirProdCarrinho(item.ProdutoId);
            } else {
                console.warn("Item inválido encontrado no carrinho:", item);
            }
        }));

        await atualizaTotalCarrinho();
        carrinhoVazio(itensCliente.length);
    } catch (error) {
        console.error("Erro ao carregar o carrinho:", error);
    }
}

async function limparCarrinho(idCarrinho) {
    try {
        const itensCarrinho = await getListaitensCarrinho();

        const itensDoCarrinho = itensCarrinho.filter(item => item.CarrinhoId === idCarrinho);

        for (const item of itensDoCarrinho) {
            await excluiitensCarrinho(item.id);
        }

        const carrinho = await buscaUmCarrinho(idCarrinho);
        if (carrinho) {
            await excluiCarrinho(idCarrinho);
        }

        console.log(`Carrinho (ID: ${idCarrinho}) e seus itens foram removidos com sucesso.`);
    } catch (error) {
        console.error(`Erro ao limpar o carrinho (ID: ${idCarrinho}):`, error);
        throw error;
    }
}

async function carrinhoVazio() {
    if (await contarProdutosCarrinho() == 0) {
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

async function contarProdutosCarrinho(/*idCliente*/) {
    const carrinhoItens = await getListaitensCarrinho();

    const itensCliente = carrinhoItens.filter(item => item.Carrinho.ClienteId === 1/*idCliente*/);

    const quantidadeTotal = itensCliente.reduce((total, item) => total + item.quantidade, 0);

    return quantidadeTotal;
}

function guardafrete(frete) {
    localStorage.setItem('valorFrete', frete);
}

let carrinho;
function guardaCarrinho(idcarrinho){
    carrinho = idcarrinho;
}

function pegaCarrinho(){
    return carrinho;
}

async function carregarDadosPagamento() {
    try {
        const carrinhoItens = await getListaitensCarrinho();
        const itensCliente = carrinhoItens.filter(item => item?.Carrinho?.ClienteId === 1); 
        if (!itensCliente.length) {
            console.warn("Carrinho vazio ou sem itens para o cliente.");
            return;
        }
        const totalProdutos = itensCliente.reduce((total, item) => {
            return total + (item.Produto.preco * item.quantidade);
        }, 0);

        const quantidadeTotal = itensCliente.reduce((total, item) => total + item.quantidade, 0);

        const valorFreteElement = document.querySelector('.valorFrete');
        console.log(valorFreteElement);

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

        // Atualiza os valores no DOM
        document.querySelector('.quantidadeFinal').innerHTML = `<strong>Nº Itens:</strong> ${quantidadeTotal}`;
        document.querySelector('.precoFinal').innerHTML = `<strong>Total:</strong> R$${totalCompra.toFixed(2)}`;
    } catch (error) {
        console.error("Erro ao carregar dados de pagamento:", error);
    }
}

export {atualizaTotalCarrinho, carregarCarrinho, limparCarrinho, guardafrete, guardaCarrinho, pegaCarrinho, carregarDadosPagamento, contarProdutosCarrinho, carrinhoVazio};