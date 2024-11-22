import { Router } from "express";
import { altera, exclui, novo, todos, um } from "../controles/controle_categoria.mjs";

const rota_categorias = Router();

rota_categorias.post('/cadastrar', novo);
rota_categorias.get('/listar', todos);
rota_categorias.get('/listar/:id', um);
rota_categorias.put('/editar', altera);
rota_categorias.delete('/excluir', exclui);

export default rota_categorias;