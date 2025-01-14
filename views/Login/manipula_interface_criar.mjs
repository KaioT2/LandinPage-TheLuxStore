import { novoclientes, verificaClienteExistente, login } from "../Cliente/acessa_dados_cliente.mjs";

const iptNome = document.querySelector("#nome");
const iptTelefone = document.querySelector("#telefone");
const iptCpf = document.querySelector("#cpf");
const iptEmail = document.querySelector("#email");
const iptdataNasc = document.querySelector("#dataNasc");
const iptSenha = document.querySelector("#senha");

const btnCriar = document.querySelector("#btnCriar");

function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, ""); 

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
        return false; 
    }

    let soma = 0, resto;

    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) {
        return false;
    }

    soma = 0;
    
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) {
        return false;
    }

    return true;
}

async function criarConta() {
    document.querySelectorAll(".msg-erro").forEach(msg => msg.remove());

    let valid = true;

    function criarMensagemErro(campo, mensagem) {
        const msgErro = document.createElement("span");
        msgErro.className = "msg-erro";
        msgErro.style.color = "red";
        msgErro.style.fontSize = "0.9em";
        msgErro.textContent = mensagem;
        campo.parentNode.appendChild(msgErro);
    }

    if (!iptNome.value.trim()) {
        criarMensagemErro(iptNome, "Por favor, preencha o nome.");
        valid = false;
    }

    if (!iptTelefone.value.trim()) {
        criarMensagemErro(iptTelefone, "Por favor, preencha o telefone.");
        valid = false;
    }

    if (!iptCpf.value.trim() || !validarCPF(iptCpf.value)) {
        criarMensagemErro(iptCpf, "Por favor, preencha um CPF válido.");
        valid = false;
    }

    if (!iptEmail.value.trim()) {
        criarMensagemErro(iptEmail, "Por favor, preencha o email.");
        valid = false;
    }

    if (!iptdataNasc.value.trim()) {
        criarMensagemErro(iptdataNasc, "Por favor, preencha a data de nascimento.");
        valid = false;
    }

    if (!iptSenha.value.trim()) {
        criarMensagemErro(iptSenha, "Por favor, preencha a senha.");
        valid = false;
    }

    if (!valid) {
        return;
    }

    const clienteExistente = await verificaClienteExistente(iptEmail.value, iptCpf.value);
    if (clienteExistente) {
        alert("Usuário já existe!");
        return;
    }

    const obj = {
        nome: iptNome.value,
        telefone: iptTelefone.value,
        cpf: iptCpf.value,
        email: iptEmail.value,
        dataNasc: iptdataNasc.value,
        senha: iptSenha.value
    };

    await novoclientes(obj);

    await login({ email: iptEmail.value, senha: iptSenha.value });
    window.location.href = "../index.html";
}

btnCriar.addEventListener("click", criarConta);
