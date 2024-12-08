import { DataTypes } from "sequelize";
import conexao from "../database/mysql.mjs";

const Cliente = conexao.define('Cliente', {
    nome: DataTypes.STRING,
    cpf: DataTypes.STRING,
    dataNasc: DataTypes.DATE,
    telefone: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING,
    isLogged:DataTypes.BOOLEAN
});


export default Cliente;