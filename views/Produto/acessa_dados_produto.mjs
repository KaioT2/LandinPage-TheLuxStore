import urlBackEnd from "../constantes/urls.mjs";

async function getLista() {
    const resposta = await fetch(urlBackEnd + '/produtos/listar');
    const produtos = await resposta.json();
    return produtos;
}

async function buscaUm(id){
    const resposta = await fetch(urlBackEnd + '/produtos/listar/' + id);
    const produto = await resposta.json();
    return produto;
}

async function novo(obj) {
    const opt = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)
    };
    const resposta = await fetch(urlBackEnd + '/produtos/cadastrar', opt);
    const cadastrado = await resposta.json();
    return cadastrado;
}

async function altera(obj) {
    const opt = {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    };  
    const resposta = await fetch(urlBackEnd + '/produtos/editar', opt);
    const editado = await resposta.json();
    return editado;
}

async function exclui(indice) {
    const opt = {
        method: 'delete',
        headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({id: indice})
    };
    const resposta = await fetch(urlBackEnd + '/produtos/excluir', opt);
    const apagado = await resposta.json();
    return apagado;
}

export { getLista, buscaUm, novo, altera, exclui };