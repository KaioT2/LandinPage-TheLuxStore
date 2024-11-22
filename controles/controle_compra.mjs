import Compra from "../model/compra.mjs";
import Cliente from "../model/cliente.mjs";

async function novo(req, res){
    const criado =  await Compra.create({
        total: req.body.total,
        dataCompra: req.body.dataCompra,
        idCliente: req.body.idCliente,
    });
    res.json(criado);
}

async function todos (req, res){
    const todos = await Compra.findAll();
    res.json(todos);
}

async function um(req,res){
    const um = await Compra.findOne({
        where: {id: req.params.id}
    });
    res.json(um);
}

async function altera (req, res){
    const comp = await Compra.findOne({
        where: {id: req.body.id}
    });
    comp.total = req.body.total;
    comp.dataCompra = req.body.dataCompra;
    comp.idCliente = req.body.idCliente;

    await comp.save();
    res.json(comp);
}

async function exclui (req, res){
    const comp = await Compra.findOne({
        where: {id: req.body.id}
    });
    await comp.destroy();
    res.json(comp);
}

export {novo, todos, altera,exclui, um};
