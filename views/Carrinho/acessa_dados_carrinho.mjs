import urlBackEnd from "../constantes/urls.mjs";

async function getListaCarrinho() {
    const resposta = await fetch(urlBackEnd + '/carrinhos/listar');
    const carrinhos = await resposta.json();
    return carrinhos;
}

async function buscaUmCarrinho(id){
    const resposta = await fetch(urlBackEnd + '/carrinhos/listar/' + id);
    const produto = await resposta.json();
    return produto;
}

async function novoCarrinho(obj) {
    const opt = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)
    };
    const resposta = await fetch(urlBackEnd + '/carrinhos/cadastrar', opt);
    const cadastrado = await resposta.json();
    return cadastrado;
}

async function alteraCarrinho(obj) {
    const opt = {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    };  
    const resposta = await fetch(urlBackEnd + '/carrinhos/editar', opt);
    const editado = await resposta.json();
    return editado;
}

async function excluiCarrinho(indice) {
    const opt = {
        method: 'delete',
        headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({id: indice})
    };
    const resposta = await fetch(urlBackEnd + '/carrinhos/excluir', opt);
    const apagado = await resposta.json();
    return apagado;
}

export { getListaCarrinho, buscaUmCarrinho, novoCarrinho, alteraCarrinho, excluiCarrinho };