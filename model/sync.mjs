
import conexao from "../database/mysql.mjs";
import Categoria from "./categoria.mjs";
import Cliente from "./cliente.mjs";
import Venda from "./venda.mjs";
import Item_Venda from "./itemVenda.mjs";
import Produto from "./produto.mjs";
import Carrinho from "./carrinho.mjs";
import ItemCarrinho from "./item_carrinho.mjs";
import Endereco from "./endereco.mjs";


Categoria.hasMany(Produto);
Produto.belongsTo(Categoria);

Produto.hasMany(Item_Venda);
Item_Venda.belongsTo(Produto);

Venda.hasMany(Item_Venda);
Item_Venda.belongsTo(Venda);

Carrinho.hasOne(Venda);
Venda.belongsTo(Carrinho);

Cliente.hasMany(Venda);
Venda.belongsTo(Cliente);

Cliente.hasMany(Carrinho);
Carrinho.belongsTo(Cliente);

Produto.hasMany(ItemCarrinho);
ItemCarrinho.belongsTo(Produto);

Carrinho.hasMany(ItemCarrinho);
ItemCarrinho.belongsTo(Carrinho);

Cliente.hasMany(Endereco);
Endereco.belongsTo(Cliente);

conexao.sync();

export default conexao;