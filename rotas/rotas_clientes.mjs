import { Router } from "express";
import { altera, exclui, novo, todos, um } from "../controles/controle_cliente.mjs";

const rota_clientes = Router();

rota_clientes.post('/cadastrar', novo);
rota_clientes.get('/listar', todos);
rota_clientes.get('/listar/:id', um);
rota_clientes.put('/editar', altera);
rota_clientes.delete('/excluir', exclui);

export default rota_clientes;