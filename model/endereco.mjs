import { DataTypes } from "sequelize";
import conexao from "../database/mysql.mjs";

const Endereco = conexao.define('Endereco', {
    rua: DataTypes.STRING,
    bairro: DataTypes.STRING,
    cidade: DataTypes.STRING,
    uf: DataTypes.STRING,
    cep: DataTypes.STRING
});


export default Endereco;