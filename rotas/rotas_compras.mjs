import { Router } from "express";
import { altera, exclui, novo, todos, um } from "../controles/controle_compra.mjs";

const rotas_compras = Router();

rotas_compras.post('/cadastrar', novo);
rotas_compras.get('/listar', todos);
rotas_compras.get('/listar/:id', um);
rotas_compras.put('/editar', altera);
rotas_compras.delete('/excluir', exclui);

export default rotas_compras;