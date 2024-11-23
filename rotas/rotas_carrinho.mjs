import { Router } from "express";
import { altera, exclui, novo, todos, um } from "../controles/controle_carrinho.mjs";

const rotas_carrinho = Router();

rotas_carrinho.post('/cadastrar', novo);
rotas_carrinho.get('/listar', todos);
rotas_carrinho.get('/listar/:id', um);
rotas_carrinho.put('/editar', altera);
rotas_carrinho.delete('/excluir', exclui);

export default rotas_carrinho;