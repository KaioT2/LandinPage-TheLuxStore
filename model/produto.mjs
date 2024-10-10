import { DataTypes } from "sequelize";
import conexao from "../database/mysql.mjs";

const Produto = conexao.define('Produto', {
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING,
    preco: DataTypes.DECIMAL,
    rate: DataTypes.INTEGER,
    image_url: DataTypes.STRING,
});

Produto.sync();

export default Produto;