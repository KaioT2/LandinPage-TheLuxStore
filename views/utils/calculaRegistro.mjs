import { getListaProduto } from "../Produto/acessa_dados_produto.mjs";
import { getListaFuncionario } from "../Funcionario/acessa_dados_funcionario.mjs";
import { getListaclientes } from "../Cliente/acessa_dados_cliente.mjs";

const pfcProd = document.querySelector("#pfcProd");
const pfcFunc = document.querySelector("#pfcFunc");
const pfcCli = document.querySelector("#pfcCli");

async function calculaRegistro() {
    try {
        const [produtos, funcionarios, clientes] = await Promise.all([
            getListaProduto(),
            getListaFuncionario(),
            getListaclientes()
        ]);

        pfcProd.innerText = produtos.length+" produtos cadastrados";
        pfcFunc.innerText = funcionarios.length +" funcionarios cadastrados";
        pfcCli.innerText = clientes.length+" clientes cadastrados";
    } catch (error) {
        console.error("Erro ao carregar os dados:", error);
    }
}

window.addEventListener("load", calculaRegistro);