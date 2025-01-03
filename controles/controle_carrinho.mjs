import Carrinho from "../model/carrinho.mjs";
import Cliente from "../model/cliente.mjs";

async function novo(req, res){
    const criado =  await Carrinho.create({
        total: req.body.total,
        ClienteId: req.body.idCliente
    });
    res.json(criado);
}

async function todos (req, res){
    const todos = await Carrinho.findAll();
    res.json(todos);
}

async function um(req,res){
    const um = await Carrinho.findOne({
        where: {id: req.params.id}
    });
    res.json(um);
}

async function altera (req, res){
    const cat = await Carrinho.findOne({
        where: {id: req.body.id}
    });
    cat.total = req.body.total;
    cat.idCliente = req.body.idCliente

    await cat.save();
    res.json(cat);
}

async function exclui (req, res){
    const cat = await Carrinho.findOne({
        where: {id: req.body.id}
    });
    await cat.destroy();
    res.json(cat);
}

async function excluiCarrinhoPorCliente(idCliente) {

    const carrinho = await Carrinho.findOne({
        where: { ClienteId: idCliente }
    });

    await carrinho.destroy();
}

export {novo, todos, altera, exclui, um, excluiCarrinhoPorCliente};