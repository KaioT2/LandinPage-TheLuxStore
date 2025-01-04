import { DataTypes } from "sequelize";
import conexao from "../database/mysql.mjs";

const Funcionario = conexao.define('Funcionario',{
    nome: DataTypes.STRING,
    cargo: DataTypes.STRING,
    salario: DataTypes.DECIMAL(10,2),
    cpf: DataTypes.STRING,
    senha:DataTypes.STRING,
    isLogged:DataTypes.BOOLEAN,
});

export default Funcionario;