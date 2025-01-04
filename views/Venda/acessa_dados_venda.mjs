import urlBackEnd from "../constantes/urls.mjs";

async function getLista() {
    const resposta = await fetch(urlBackEnd + '/vendas/listar');
    const vendas = await resposta.json();
    return vendas;
}

async function buscaUm(id){
    const resposta = await fetch(urlBackEnd + '/vendas/listar/' + id);
    const venda = await resposta.json();
    return venda;
}

async function novo(obj) {
    const opt = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)
    };
    const resposta = await fetch(urlBackEnd + '/vendas/cadastrar', opt);
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
    const resposta = await fetch(urlBackEnd + '/vendas/editar', opt);
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
    const resposta = await fetch(urlBackEnd + '/vendas/excluir', opt);
    const apagado = await resposta.json();
    return apagado;
}

export { getLista, buscaUm, novo, altera, exclui };