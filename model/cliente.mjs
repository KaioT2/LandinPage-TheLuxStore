import { DataTypes } from "sequelize";
import conexao from "../database/mysql.mjs";

const Cliente = conexao.define('Cliente', {
    nome: DataTypes.STRING,
    endereco: DataTypes.STRING,
    bairro: DataTypes.STRING,
    cidade: DataTypes.STRING,
    uf: DataTypes.STRING,
    cep: DataTypes.STRING,
    cpf: DataTypes.STRING,
    dataNasc: DataTypes.DATE,
    telefone: DataTypes.STRING,
    email: DataTypes.STRING,
});

Cliente.sync();

export default Cliente;