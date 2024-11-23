import Endereco from "../model/endereco.mjs";
import Cliente from "../model/cliente.mjs";

async function novo(req, res){
    const criado =  await Endereco.create({
        rua: req.body.rua,
        bairro: req.body.bairro,
        cidade: req.body.cidade,
        uf: req.body.uf,
        cep: req.body.cep,
        idCli: req.body.idCli
    });
    res.json(criado);
}

async function todos (req, res){
    const todos = await Endereco.findAll();
    res.json(todos);
}

async function um(req,res){
    const um = await Endereco.findOne({
        where: {id: req.params.id}
    });
    res.json(um);
}

async function altera (req, res){
    const end = await Endereco.findOne({
        where: {id: req.body.id}
    });
    end.rua = req.body.rua;
    end.bairro = req.body.bairro;
    end.cidade = req.body.cidade;
    end.uf = req.body.uf;
    end.cep = req.body.cep;
    end.idCli = req.body.idCli;

    await end.save();
    res.json(end);
}

async function exclui (req, res){
    const end = await Endereco.findOne({
        where: {id: req.body.id}
    });
    await end.destroy();
    res.json(end);
}

export {novo, todos, altera,exclui, um};
