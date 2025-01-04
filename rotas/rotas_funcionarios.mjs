import {Router} from "express";
import { altera, exclui, novo, todos, um, login, logout } from "../controles/controle_funcionarios.mjs";

const rotas_funcionarios=Router();

rotas_funcionarios.post('/cadastrar', novo);
rotas_funcionarios.get('/listar', todos);
rotas_funcionarios.get('/listar/:id', um);
rotas_funcionarios.put('/editar', altera);
rotas_funcionarios.delete('/excluir', exclui);

rotas_funcionarios.post('/login', login);  
rotas_funcionarios.post('/logout', logout); 

export default rotas_funcionarios;

