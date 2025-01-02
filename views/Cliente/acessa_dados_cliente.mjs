import urlBackEnd from "../constantes/urls.mjs";

async function login(obj) {
    try {
        const response = await fetch('/clientes/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Erro no login');
        }

        const data = await response.json();

        localStorage.setItem('token', data.token); 
        window.location.href = '../index.html'; 
        return data.message; 
    } catch (error) {
        console.error('Erro no login:', error);
        throw error;
    }
}

async function logout(obj) {
    try {
        const response = await fetch('/clientes/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        });
        localStorage.clear();
        window.location.href = '../Login/paginaLogin.html'; 

    } catch (error) {
        console.error('Erro ao realizar logout:', error);
    }
}


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

async function verificaClienteExistente(email, cpf) {
    const clientes = await getListaclientes();
    return clientes.some(cliente => cliente.email === email || cliente.cpf === cpf);
}

export { getListaclientes, buscaUmclientes, novoclientes, alteraclientes, excluiclientes, login, logout, verificaClienteExistente };