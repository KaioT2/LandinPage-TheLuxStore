import Cliente from "../model/cliente.mjs";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const SECRET_KEY = "sua-chave-secreta";

async function login(req, res) {
    const { email, senha } = req.body;

    const cliente = await Cliente.findOne({ where: { email } });
    if (!cliente) {
        return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const senhaValida = await bcrypt.compare(senha, cliente.senha);
    if (!senhaValida) {
        return res.status(401).json({ error: "Senha incorreta" });
    }

    cliente.isLogged = true;
    await cliente.save();

    const token = jwt.sign({ idCliente: cliente.id }, SECRET_KEY, { expiresIn: '1h' });
    localStorage.setItem('token', token);
    res.json({ message: "Login realizado com sucesso", token });
}

async function logout(req, res) {
    const { id } = req.body;

    const cliente = await Cliente.findOne({ where: { id } });
    if (!cliente) {
        return res.status(404).json({ error: "Usuário não encontrado" });
    }

    cliente.isLogged = false;
    await cliente.save();

    res.json({ message: "Logout realizado com sucesso" });
}

async function novo(req, res) {
    const hashedPassword = await bcrypt.hash(req.body.senha, 10); 

    const criado = await Cliente.create({
        nome: req.body.nome,
        cpf: req.body.cpf,
        dataNasc: req.body.dataNasc,
        telefone: req.body.telefone,
        email: req.body.email,
        senha: hashedPassword,
        isLogged: req.body.isLogged,
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
    cli.isLogged = req.body.isLogged;

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

function autenticarToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1]; // 'Bearer <token>'
    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    try {
        const payload = jwt.verify(token, SECRET_KEY);
        req.idCliente = payload.idCliente; // Adiciona o `idCliente` à requisição
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Token inválido' });
    }
}

export {novo, todos, altera,exclui, um, login, logout};
export default { autenticarToken };
