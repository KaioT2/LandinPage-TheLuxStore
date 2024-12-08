import { DataTypes } from "sequelize";
import conexao from "../database/mysql.mjs";

const Venda = conexao.define('Venda', {
    total: DataTypes.DECIMAL,
    dataVenda: DataTypes.DATE,
    paymentIntent: DataTypes.STRING
});


export default Venda;