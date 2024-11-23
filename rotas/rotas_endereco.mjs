import { Router } from "express";
import { altera, exclui, novo, todos, um } from "../controles/controle_endereco.mjs";

const rotas_endereco = Router();

rotas_endereco.post('/cadastrar', novo);
rotas_endereco.get('/listar', todos);
rotas_endereco.get('/listar/:id', um);
rotas_endereco.put('/editar', altera);
rotas_endereco.delete('/excluir', exclui);

export default rotas_endereco;