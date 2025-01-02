import { login } from "../Cliente/acessa_dados_cliente.mjs";

const iptEmail = document.querySelector("#email");
const iptSenha = document.querySelector("#senha");
const btnLogin = document.querySelector("#btnLogin");

async function executarLogin() {
    let msgEmail = document.querySelector("#msg-email");
    if (msgEmail) msgEmail.remove();

    let msgSenha = document.querySelector("#msg-senha");
    if (msgSenha) msgSenha.remove();

    let valid = true;

    if (!iptEmail.value.trim()) {
        msgEmail = document.createElement("span");
        msgEmail.id = "msg-email";
        msgEmail.style.color = "red";
        msgEmail.style.fontSize = "0.9em";
        msgEmail.textContent = "Por favor, preencha o email.";
        iptEmail.insertAdjacentElement("afterend", msgEmail);
        valid = false;
    }

    if (!iptSenha.value.trim()) {
        msgSenha = document.createElement("span");
        msgSenha.id = "msg-senha";
        msgSenha.style.color = "red";
        msgSenha.style.fontSize = "0.9em";
        msgSenha.textContent = "Por favor, preencha a senha.";
        iptSenha.insertAdjacentElement("afterend", msgSenha);
        valid = false;
    }

    if (valid) {
        const obj = {
            email: iptEmail.value,
            senha: iptSenha.value
        };

        await login(obj);
    }
}

btnLogin.addEventListener("click", executarLogin);

[iptEmail, iptSenha].forEach(input => {
    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            executarLogin();
        }
    });
});

