import ItemCompra from "../model/itemCompra.mjs";
import Compra from "../model/compra.mjs";
import Produto from "../model/produto.mjs";

async function novo(req, res){
    const criado =  await itemCompra.create({
        idCompra: req.params.idCompra,
        idProduto: req.params.idProduto,
        quantidade: req.params.quantidade,
        precoUn: req.params.precoUn,
        total: req.body.total,
    });
    res.json(criado);
}

async function todos (req, res){
    const todos = await itemCompra.findAll();
    res.json(todos);
}

async function um(req,res){
    const um = await itemCompra.findOne({
        where: {id: req.params.id}
    });
    res.json(um);
}

async function altera (req, res){
    const itemComp = await itemCompra.findOne({
        where: {id: req.body.id}
    });
    itemComp.idCompra = req.body.idCompra;
    itemComp.idProduto = req.body.idProduto;
    itemComp.quantidade = req.body.quantidade;
    itemComp.precoUn = req.body.precoUn;
    itemComp.total = req.body.total;

    await itemComp.save();
    res.json(itemComp);
}

async function exclui (req, res){
    const itemComp = await itemCompra.findOne({
        where: {id: req.body.id}
    });
    await itemComp.destroy();
    res.json(itemComp);
}

export {novo, todos, altera,exclui, um};
