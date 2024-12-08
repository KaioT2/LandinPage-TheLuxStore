import urlBackEnd from "../constantes/urls.mjs";

async function getListaclientes() {
    const resposta = await fetch(urlBackEnd + '/clientes/listar');
    const clientes = await resposta.json();
    return clientes;
}

async function buscaUmclientes(id){
    const resposta = await fetch(urlBackEnd + '/clientes/listar/' + id);
    const produto = await resposta.json();
    return produto;
}

async function novoclientes(obj) {
    const opt = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)
    };
    const resposta = await fetch(urlBackEnd + '/clientes/cadastrar', opt);
    const cadastrado = await resposta.json();
    return cadastrado;
}

async function alteraclientes(obj) {
    const opt = {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    };  
    const resposta = await fetch(urlBackEnd + '/clientes/editar', opt);
    const editado = await resposta.json();
    return editado;
}

async function excluiclientes(indice) {
    const opt = {
        method: 'delete',
        headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({id: indice})
    };
    const resposta = await fetch(urlBackEnd + '/clientes/excluir', opt);
    const apagado = await resposta.json();
    return apagado;
}

export { getListaclientes, buscaUmclientes, novoclientes, alteraclientes, excluiclientes };