import { Router } from "express";
import { altera, exclui, novo, todos, um } from "../controles/controle_item_compra.mjs";

const rotas_ItensCompra = Router();

rotas_ItensCompra.post('/cadastrar', novo);
rotas_ItensCompra.get('/listar', todos);
rotas_ItensCompra.get('/listar/:id', um);
rotas_ItensCompra.put('/editar', altera);
rotas_ItensCompra.delete('/excluir', exclui);

export default rotas_ItensCompra;