import { DataTypes } from "sequelize";
import conexao from "../database/mysql.mjs";

const ItemVenda = conexao.define('ItemVenda', {
    preco: DataTypes.DECIMAL,
    total: DataTypes.DECIMAL,
    quantidade: DataTypes.INTEGER
});


export default ItemVenda;