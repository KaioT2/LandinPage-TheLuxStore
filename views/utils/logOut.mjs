import { logout } from "../Cliente/acessa_dados_cliente.mjs";
import { decodeToken } from "./decode.mjs";

const btLogOut = document.querySelector("#btLogOut");

btLogOut.addEventListener("click", async () => {
    const token = localStorage.getItem('token');
    if(token){
        const { idCliente } = decodeToken(token);

        const obj = {
            "id": idCliente
        };

        await logout(obj);
    }else{
        alert("Você não está logado!")
        return
    }
});