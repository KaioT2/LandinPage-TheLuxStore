
import conexao from "../database/mysql.mjs";
import Categoria from "./categoria.mjs";
import Cliente from "./cliente.mjs";
import Compra from "./compra.mjs";
import Item_compra from "./itemCompra.mjs";
import Produto from "./produto.mjs";

Categoria.hasMany(Produto);
Produto.belongsTo(Categoria);

Produto.haMany(Item_compra);
Item_compra.belongsTo(Produto);

Compra.hasMany(Item_compra);
Item_compra.belongsTo(Compra);

Cliente.hasMany(Compra);
Compra.belongsTo(Compra);

conexao.sync();

