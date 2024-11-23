import { DataTypes } from "sequelize";
import conexao from "../database/mysql.mjs";

const Carrinho = conexao.define('Carrinho', {
    total: DataTypes.DECIMAL
});

Carrinho.sync();

export default Carrinho;