import itemVenda from "../model/itemVenda.mjs";
import venda from "../model/venda.mjs";
import Produto from "../model/produto.mjs";

async function novo(req, res){
    const criado =  await itemVenda.create({
        idVenda: req.params.idVenda,
        idProduto: req.params.idProduto,
        quantidade: req.params.quantidade,
        precoUn: req.params.precoUn,
        total: req.body.total,
    });
    res.json(criado);
}

async function todos (req, res){
    const todos = await itemVenda.findAll();
    res.json(todos);
}

async function um(req,res){
    const um = await itemVenda.findOne({
        where: {id: req.params.id}
    });
    res.json(um);
}

async function altera (req, res){
    const itemVend = await itemVenda.findOne({
        where: {id: req.body.id}
    });
    itemVend.idVenda = req.body.idVenda;
    itemVend.idProduto = req.body.idProduto;
    itemVend.quantidade = req.body.quantidade;
    itemVend.precoUn = req.body.precoUn;
    itemVend.total = req.body.total;

    await itemVend.save();
    res.json(itemVend);
}

async function exclui (req, res){
    const itemVend = await itemVenda.findOne({
        where: {id: req.body.id}
    });
    await itemVend.destroy();
    res.json(itemVend);
}

export {novo, todos, altera,exclui, um};
