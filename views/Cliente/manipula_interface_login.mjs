import { login } from "./acessa_dados_cliente.mjs";


const btnLogin = document.querySelector("#btnLogin");

btnLogin.addEventListener("click", async () => {
    const iptEmail = document.querySelector("#email");
    const iptSenha = document.querySelector("#senha");  

    const obj = {
        "email": iptEmail.value,
        "senha": iptSenha.value
    };

    await login(obj);
});
