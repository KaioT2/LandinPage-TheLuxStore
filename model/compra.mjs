import { DataTypes } from "sequelize";
import conexao from "../database/mysql.mjs";

const Compra = conexao.define('Compra', {
    total: DataTypes.DECIMAL,
    dataVenda: DataTypes.DATE
});

Compra.sync();

export default Compra;