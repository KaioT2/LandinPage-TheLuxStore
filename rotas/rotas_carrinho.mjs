import { Router } from "express";
import {novo, todos, altera, exclui, um, excluiCarrinhoPorCliente} from "../controles/controle_carrinho.mjs";

const rotas_carrinho = Router();

rotas_carrinho.post('/cadastrar', novo);
rotas_carrinho.get('/listar', todos);
rotas_carrinho.get('/listar/:id', um);
rotas_carrinho.delete('/excluirPorCliente/:ClienteId', excluiCarrinhoPorCliente);
rotas_carrinho.put('/editar', altera);
rotas_carrinho.delete('/excluir', exclui);

export default rotas_carrinho;