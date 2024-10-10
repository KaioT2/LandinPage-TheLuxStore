import { Sequelize } from "sequelize";

const conexao = new Sequelize({
    database: 'dbtheluxstyle',
    username: 'root',
    password: '',
    dialect: 'mysql',
    host: 'localhost',
    port: 3306
})

export default conexao;