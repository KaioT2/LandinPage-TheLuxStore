import Cliente from "../model/cliente.mjs";

async function novo(req, res){
    const criado =  await Cliente.create({
        nome: req.body.nome,
        endereco: req.body.endereco,
        bairro: req.body.bairro,
        cidade: req.body.cidade,
        uf: req.body.uf,
        cep: req.body.cep,
        cpf: req.body.cpf,
        dataNasc: req.body.dataNasc,
        telefone: req.body.telefone,
        email: req.body.email,
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
    cli.endereco = req.body.endereco;
    cli.bairro = req.body.bairro;
    cli.cidade = req.body.cidade;
    cli.uf = req.body.uf;
    cli.cep = req.body.cep;
    cli.cpf = req.body.cpf;
    cli.dataNasc = req.body.dataNasc;
    cli.telefone = req.body.telefone;
    cli.email = req.body.email;

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
