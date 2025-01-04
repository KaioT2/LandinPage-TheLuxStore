import { altera, buscaUm, exclui, getListaFuncionario, novo } from "./acessa_dados_funcionario.mjs";

let indiceSelecionado = -1;

async function salvar() {
    const iptNome = document.getElementById('nome');
    const iptCargo = document.getElementById('cargo');
    const iptSalario = document.getElementById('salario');
    const iptCpf = document.getElementById('cpf');
    const iptSenha = document.getElementById('senha');

    if (!iptNome.value == null || !iptCargo.value == null || !iptSalario.value == null || !iptCpf.value == null || !iptSenha.value == null) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    const salario = parseFloat(iptSalario.value);
    if (isNaN(salario) || salario < 1412) {
        alert("O salário deve ser maior ou igual a 1412!");
        return;
    }

    const obj = {
        nome: iptNome.value,
        cargo: iptCargo.value ,
        salario: salario,
        cpf: iptCpf.value,
        senha:iptSenha.value
    };

    await novo(obj);

    document.forms[0].reset();
    desenhaTabela();
}

async function editar() {
    const iptId = document.getElementById('id');
    const iptNome = document.getElementById('nome');
    const iptCargo = document.getElementById('cargo');
    const iptSalario = document.getElementById('salario');
    const iptCpf = document.getElementById('cpf');
    const iptSenha = document.getElementById('senha');
    const obj = {
        "id": iptId.value,
        "nome": iptNome.value,
        "cargo": iptCargo.value,
        "salario": iptSalario.value,
        "cpf": iptCpf.value,
        "senha": iptSenha.value
    };
    await altera(obj);
    document.forms[0].reset();
    desenhaTabela();
    iptId.value = "";
}

function decideSalvarEditar(event) {
    event.preventDefault();
    if(document.getElementById('id').value){
        editar();
    } else {
        salvar();
    }
}

async function excluir(event) {
    const indice = event.target.getAttribute('data-id');
    await exclui(indice);
    desenhaTabela();
}

async function preencheDadosParaEdicao(event) {
    const id = event.target.getAttribute('data-id');
    const funcionario = await buscaUm(id);
    document.getElementById('id').value = funcionario.id;
    document.getElementById('nome').value = funcionario.nome;
    document.getElementById('cargo').value = funcionario.cargo;
    document.getElementById('salario').value = funcionario.salario;
    document.getElementById('cpf').value = funcionario.cpf;
    document.getElementById('senha').value = funcionario.senha;
}

async function desenhaTabela() {
    const tbody = document.getElementById('tbody1');
    tbody.innerHTML = '';
    const dados = await getListaFuncionario();
    for (let i = 0; i < dados.length; i++) {
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');
        const td4 = document.createElement('td');
        const td5 = document.createElement('td');
        const td6 = document.createElement('td');

        const btEd = document.createElement('button');
        const btEx = document.createElement('button');
        
        btEd.innerText = 'Editar';
        btEd.setAttribute('data-id', dados[i].id);
        btEd.setAttribute('class', "intra-button");
        btEd.addEventListener('click', preencheDadosParaEdicao);

        btEx.innerText = 'Excluir';
        btEx.setAttribute('data-id', dados[i].id);
        btEx.setAttribute('class', "intra-button");
        btEx.addEventListener('click', excluir);

        td1.innerText = dados[i].nome;
        td2.innerText = dados[i].cargo;
        td3.innerText = dados[i].salario;
        td4.innerText = dados[i].cpf;
        td5.innerText = dados[i].senha;
        td6.append(btEd, btEx);

        tr.append(td1, td2, td3, td4, td5,td6);

        tr.addEventListener('click', () => selecionarLinha(i));
        
        if (i === indiceSelecionado) {
            tr.style.backgroundColor = '#f6f6f6'; 
        }

        tbody.append(tr);
    }
    
}

function selecionarLinha(indice) {
    indiceSelecionado = indice;
    desenhaTabela();
}

const btnCadastrar = document.getElementById('btnCadastrar');
btnCadastrar.addEventListener('click', decideSalvarEditar);

window.addEventListener('load', desenhaTabela);