import Categoria from "../model/categoria.mjs";

async function novo(req, res){
    const criado =  await Categoria.create({
        descricao: req.body.descricao
    });
    res.json(criado);
}

async function todos (req, res){
    const todos = await Categoria.findAll();
    res.json(todos);
}

async function um(req,res){
    const um = await Categoria.findOne({
        where: {id: req.params.id}
    });
    res.json(um);
}

async function altera (req, res){
    const cat = await Categoria.findOne({
        where: {id: req.body.id}
    });
    cat.descricao = req.body.descricao;

    await cat.save();
    res.json(cat);
}

async function exclui (req, res){
    const cat = await Categoria.findOne({
        where: {id: req.body.id}
    });
    await cat.destroy();
    res.json(cat);
}

export {novo, todos, altera,exclui, um};
