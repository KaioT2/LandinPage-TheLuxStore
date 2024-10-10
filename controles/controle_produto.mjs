import Produto from "../model/produto.mjs";

async function novo(req, res){
    const criado =  await Produto.create({
        nome: req.body.nome,
        descricao: req.body.descricao,
        preco: req.body.preco,
        rate: req.body.rate,
        image_url: req.body.image_url,
    });
    res.json(criado);
}

async function todos (req, res){
    const todos = await Produto.findAll();
    res.json(todos);
}

async function um(req,res){
    const um = await Produto.findOne({
        where: {id: req.params.id}
    });
    res.json(um);
}

async function altera (req, res){
    const prod = await Produto.findOne({
        where: {id: req.body.id}
    });
    prod.nome = req.body.nome;
    prod.descricao = req.body.descricao;
    prod.preco = req.body.preco;
    prod.rate = req.body.rate;
    prod.image_url= req.body.image_url;

    await prod.save();
    res.json(prod);
}

async function exclui (req, res){
    const prod = await Produto.findOne({
        where: {id: req.body.id}
    });
    prod.nome = req.body.nome;
    prod.descricao = req.body.descricao;
    prod.preco = req.body.preco;
    prod.rate = req.body.rate;
    prod.image_url= req.body.image_url;

    await prod.destroy();
    res.json(prod);
}

export {novo, todos, altera,exclui, um};
