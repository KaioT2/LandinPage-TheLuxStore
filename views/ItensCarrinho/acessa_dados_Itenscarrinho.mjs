import urlBackEnd from "../constantes/urls.mjs";

async function getListaitensCarrinho() {
    const resposta = await fetch(urlBackEnd + '/itensCarrinho/listar');
    const itensCarrinho = await resposta.json();
    return itensCarrinho;
}

async function buscaUmitensCarrinho(id){
    const resposta = await fetch(urlBackEnd + '/itensCarrinho/listar/' + id);
    const produto = await resposta.json();
    return produto;
}

async function novoitensCarrinho(obj) {
    const opt = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)
    };
    const resposta = await fetch(urlBackEnd + '/itensCarrinho/cadastrar', opt);
    const cadastrado = await resposta.json();
    return cadastrado;
}

async function alteraitensCarrinho(obj) {
    const opt = {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    };  
    const resposta = await fetch(urlBackEnd + '/itensCarrinho/editar', opt);
    const editado = await resposta.json();
    return editado;
}

async function excluiitensCarrinho(indice) {
    const opt = {
        method: 'delete',
        headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({id: indice})
    };
    const resposta = await fetch(urlBackEnd + '/itensCarrinho/excluir', opt);
    const apagado = await resposta.json();
    return apagado;
}

export { getListaitensCarrinho, buscaUmitensCarrinho, novoitensCarrinho, alteraitensCarrinho, excluiitensCarrinho };