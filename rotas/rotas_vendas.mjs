import { Router } from "express";
import { altera, exclui, novo, todos, um } from "../controles/controle_venda.mjs";

const rotas_vendas = Router();

rotas_vendas.post('/cadastrar', novo);
rotas_vendas.get('/listar', todos);
rotas_vendas.get('/listar/:id', um);
rotas_vendas.put('/editar', altera);
rotas_vendas.delete('/excluir', exclui);

export default rotas_vendas;