import Cliente from "../model/cliente.mjs";

async function novo(req, res){
    const criado =  await Cliente.create({
        nome: req.body.nome,
        cpf: req.body.cpf,
        dataNasc: req.body.dataNasc,
        telefone: req.body.telefone,
        email: req.body.email,
        senha: req.body.senha
    });
    res.json(criado);
}

async function todos (req, res){
    const todos = await Cliente.findAll();
    res.json(todos);
}

async function um(req,res){
    const um = await Cliente.findOne({
        where: {id: req.params.id}
    });
    res.json(um);
}

async function altera (req, res){
    const cli = await Cliente.findOne({
        where: {id: req.body.id}
    });
    cli.nome = req.body.nome;
    cli.cpf = req.body.cpf;
    cli.dataNasc = req.body.dataNasc;
    cli.telefone = req.body.telefone;
    cli.email = req.body.email;
    cli.senha = req.body.senha;

    await cli.save();
    res.json(cli);
}

async function exclui (req, res){
    const cli = await Cliente.findOne({
        where: {id: req.body.id}
    });
    await cli.destroy();
    res.json(cli);
}

export {novo, todos, altera,exclui, um};
