import ItemCarrinho from "../model/ItemCarrinho.mjs";
import Carrinho from "..model/carrinho.mjs";
import Produto from "..model/Produto.mjs";

async function novo(req, res){
    const criado =  await ItemCarrinho.create({
        idProduto: req.body.idProduto,
        idCliente: req.body.idCliente,
        quantidade: req.body.quantidade
    });
    res.json(criado);
}

async function todos (req, res){
    const todos = await ItemCarrinho.findAll();
    res.json(todos);
}

async function um(req,res){
    const um = await ItemCarrinho.findOne({
        where: {id: req.params.id}
    });
    res.json(um);
}

async function altera (req, res){
    const itemCar = await ItemCarrinho.findOne({
        where: {id: req.body.id}
    });
    itemCar.idProduto = req.body.idProduto;
    itemCar.idCliente = req.body.idCliente;
    itemCar.quantidade = req.body.quantidade;

    await itemCar.save();
    res.json(itemCar);
}

async function exclui (req, res){
    const itemCar = await ItemCarrinho.findOne({
        where: {id: req.body.id}
    });
    await itemCar.destroy();
    res.json(itemCar);
}

export {novo, todos, altera,exclui, um};
