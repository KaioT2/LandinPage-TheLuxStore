import { Router } from "express";
import { altera, exclui, novo, todos, um } from "../controles/controle_item_venda.mjs";

const rotas_ItensVenda = Router();

rotas_ItensVenda.post('/cadastrar', novo);
rotas_ItensVenda.get('/listar', todos);
rotas_ItensVenda.get('/listar/:id', um);
rotas_ItensVenda.put('/editar', altera);
rotas_ItensVenda.delete('/excluir', exclui);

export default rotas_ItensVenda;