import { DataTypes } from "sequelize";
import conexao from "../database/mysql.mjs";

const ItemCarrinho = conexao.define('ItemCarrinho', {
    quantidade: DataTypes.INTEGER
});

ItemCarrinho.sync();

export default ItemCarrinho;