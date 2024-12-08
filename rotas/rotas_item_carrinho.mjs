import { Router } from "express";
import { altera, exclui, novo, todos, um } from "../controles/controle_item_carrinho.mjs";

const rotas_item_carrinho = Router();

rotas_item_carrinho.post('/cadastrar', novo);
rotas_item_carrinho.get('/listar', todos);
rotas_item_carrinho.get('/listar/:id', um);
rotas_item_carrinho.put('/editar', altera);
rotas_item_carrinho.delete('/excluir', exclui);

export default rotas_item_carrinho;