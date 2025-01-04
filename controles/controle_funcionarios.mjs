import Funcionario from "../model/funcionario.mjs";

async function login(req, res) {
    const { cpf, senha } = req.body;

    const funcionario = await Funcionario.findOne({ where: { cpf } });
    if (!funcionario) {
        return res.status(404).json({ error: "Usuário e/ou senha incorretos" });
    }

    if (senha !== funcionario.senha) {
        return res.status(401).json({ error: "Usuário e/ou senha incorretos" });
    }

    funcionario.isLogged = true;
    await funcionario.save();

    res.json({ 
        message: "Login realizado com sucesso",
        id: funcionario.id
    });
}


async function logout(req, res) {
    const { id } = req.body;

    const funcionario = await Funcionario.findOne({ where: { id } });
    if (!funcionario) {
        return res.status(404).json({ error: "Usuário não encontrado" });
    }

    if (!funcionario.isLogged) {
        return res.status(400).json({ error: "Usuário já está deslogado" });
    }

    funcionario.isLogged = false;
    await funcionario.save();

    res.json({ message: "Logout realizado com sucesso" });
}


async function novo(req, res) {
    const criado = await Funcionario.create({
        nome: req.body.nome,
        cargo: req.body.cargo,
        salario: req.body.salario,  
        cpf: req.body.cpf,
        senha: req.body.senha,
        isLogged: false
    });
    res.json(criado);
}

async function todos(req, res) {
    const todos = await Funcionario.findAll();
    res.json(todos);
}

async function um(req, res) {
    const um = await Funcionario.findOne({
        where: { id: req.params.id }
    });
    res.json(um);
}

async function altera(req, res) {
    const altera = await Funcionario.findOne({ 
        where: { id: req.body.id } 
    });

    altera.nome = req.body.nome;
    altera.cargo = req.body.cargo;
    altera.salario = req.body.salario;
    altera.cpf = req.body.cpf;
    altera.senha = req.body.senha;

    const alterado = await altera.save();
    res.json(alterado);
}

async function exclui(req, res) {
    const exclui = await Funcionario.findOne({ where: { id: req.body.id } });
    await exclui.destroy();
    res.json(exclui);
}

export { novo, todos, altera, exclui, um, login, logout };
