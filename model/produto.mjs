import { DataTypes } from "sequelize";
import conexao from "../database/mysql.mjs";

const Produto = conexao.define('Produto', {
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING(800),
    preco: DataTypes.DECIMAL,
    rate: DataTypes.INTEGER,
    image_url: DataTypes.STRING,
    quantidade: DataTypes.INTEGER
});


export default Produto;