
import conexao from "../database/mysql.mjs";
import Categoria from "./categoria.mjs";
import Cliente from "./cliente.mjs";
import Compra from "./compra.mjs";
import Item_compra from "./itemCompra.mjs";
import Produto from "./produto.mjs";
import Carrinho from "./carrinho.mjs";
import ItemCarrinho from "./item_carrinho.mjs";
import Endereco from "./endereco.mjs";


Categoria.hasMany(Produto);
Produto.belongsTo(Categoria);

Produto.haMany(Item_compra);
Item_compra.belongsTo(Produto);

Compra.hasMany(Item_compra);
Item_compra.belongsTo(Compra);

Compra.hasOne(Carrinho);
Carrinho.belongsTo(Compra);

Cliente.hasMany(Compra);
Compra.belongsTo(Compra);

Cliente.hasMany(Carrinho);
Carrinho.belongsTo(Cliente);

Produto.hasMany(ItemCarrinho);
ItemCarrinho.belongsTo(Produto);

Carrinho.hasMany(ItemCarrinho);
ItemCarrinho.belongsTo(Carrinho);

Cliente.hasMany(Endereco);
Endereco.belongsTo(Cliente);

conexao.sync();

