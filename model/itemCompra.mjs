import { DataTypes } from "sequelize";
import conexao from "../database/mysql.mjs";

const ItemCompra = conexao.define('ItemCompra', {
    preco: DataTypes.DECIMAL,
    total: DataTypes.DECIMAL,
    quantidade: DataTypes.INTEGER
});

ItemCompra.sync();

export default ItemCompra;