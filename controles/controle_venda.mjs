import Venda from "../model/venda.mjs";
import Cliente from "../model/cliente.mjs";
import Carrinho from "../model/carrinho.mjs";

async function novo(req, res){
    const criado =  await Venda.create({
        total: req.body.total,
        dataVenda: req.body.dataVenda,
        idCliente: req.body.idCliente,
        paymentIntent: req.body.paymentIntent
    });
    res.json(criado);
}

async function todos (req, res){
    const todos = await Venda.findAll({include:Cliente});
    res.json(todos);
}

async function um(req,res){
    const um = await Venda.findOne({
        where: {id: req.params.id}
    });
    res.json(um);
}

async function altera (req, res){
    const vend = await Venda.findOne({
        where: {id: req.body.id}
    });
    vend.total = req.body.total;
    vend.dataVenda = req.body.dataVenda;
    vend.idCliente = req.body.idCliente;
    vend.paymentIntent = req.body.paymentIntent;

    await vend.save();
    res.json(vend);
}

async function exclui (req, res){
    const vend = await Venda.findOne({
        where: {id: req.body.id}
    });
    await vend.destroy();
    res.json(vend);
}

export {novo, todos, altera,exclui, um};
