import urlBackEnd from "../constantes/urls.mjs";

async function getListaFuncionario() {
    const resposta = await fetch(urlBackEnd + '/funcionarios/listar');
    const funcionarios = await resposta.json();
    return funcionarios;
}

async function buscaUm(id) {
    const resposta = await fetch(urlBackEnd + '/funcionarios/listar/' + id);
    const funcionario = await resposta.json();
    return funcionario;
}

async function novo(obj) {
    const opt = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)
    };
    const resposta = await fetch(urlBackEnd + '/funcionarios/cadastrar', opt);
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
    const resposta = await fetch(urlBackEnd + '/funcionarios/editar', opt);
    const editado = await resposta.json();
    return editado;
}

async function exclui(indice) {
    const opt = {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: indice })
    };
    const resposta = await fetch(urlBackEnd + '/funcionarios/excluir', opt);
    const apagado = await resposta.json();
    return apagado;
}

async function login(cpf, senha) {
    const opt = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cpf, senha })
    };

    const resposta = await fetch(urlBackEnd + '/funcionarios/login', opt);

    if (!resposta.ok) {
        const erro = await resposta.json();
        throw new Error(erro.error || 'Erro no login');
    }
    
    const data = await resposta.json();
    localStorage.setItem('funcionarioId', data.id);
    return data;
}



async function logout() {
    const funcionarioId = localStorage.getItem('funcionarioId');
    if (!funcionarioId) {
        throw new Error('Usuário não está logado');
    }

    const opt = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: funcionarioId })
    };

    const resposta = await fetch(urlBackEnd + '/funcionarios/logout', opt);

    if (!resposta.ok) {
        const erro = await resposta.json();
        throw new Error(erro.error || 'Erro no logout');
    }

    const data = await resposta.json();
    localStorage.removeItem('funcionarioId');
    return data;
}


export { getListaFuncionario, buscaUm, novo, altera, exclui, login, logout };

