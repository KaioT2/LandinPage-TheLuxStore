import { Router } from "express";
import { altera, exclui, novo, todos, um } from "../controles/controle_produto.mjs";

const rotas_produtos = Router();

rotas_produtos.post('/cadastrar', novo);
rotas_produtos.get('/listar', todos);
rotas_produtos.get('/listar/:id', um);
rotas_produtos.put('/editar', altera);
rotas_produtos.delete('/excluir', exclui);

export default rotas_produtos;