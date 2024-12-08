import ItemCarrinho from "../model/item_carrinho.mjs";
import Carrinho from "../model/carrinho.mjs";
import Produto from "../model/produto.mjs";
import Cliente from "../model/cliente.mjs";

async function novo(req, res){

    let carrinho = await Carrinho.findOne({
        where: {
            ClienteId:req.body.idCliente
        }
    })

    if(carrinho == null){
        carrinho = await Carrinho.create({
            total: 0,
            ClienteId:req.body.idCliente
        })
    }

    const criado =  await ItemCarrinho.create({
        ProdutoId: req.body.idProduto,
        CarrinhoId: carrinho.id,
        quantidade: req.body.quantidade
    });
    res.json(criado);
}

async function todos(req, res) {
    try {
        const todos = await ItemCarrinho.findAll({
            include: [
                {
                    model: Carrinho,
                    include: [
                        {
                            model: Cliente, // Certifique-se de importar o modelo Cliente
                            attributes: ['id', 'nome', 'email'], // Apenas os campos necessários
                        },
                    ],
                },
                {
                    model: Produto,
                    attributes: ['id', 'nome', 'preco', 'descricao'], // Apenas os campos necessários
                },
            ],
        });
        res.json(todos);
    } catch (error) {
        console.error("Erro ao buscar itens do carrinho:", error);
        res.status(500).json({ error: "Erro ao buscar itens do carrinho." });
    }
}

async function um(req, res) {
    try {
        const um = await ItemCarrinho.findOne({
            where: { id: req.params.id },
            include: [
                {
                    model: Carrinho,
                    include: [
                        {
                            model: Cliente,
                            attributes: ['id', 'nome', 'email'],
                        },
                    ],
                },
                {
                    model: Produto,
                    attributes: ['id', 'nome', 'preco', 'descricao'],
                },
            ],
        });

        if (!um) {
            return res.status(404).json({ error: "Item do carrinho não encontrado." });
        }

        res.json(um);
    } catch (error) {
        console.error("Erro ao buscar item do carrinho:", error);
        res.status(500).json({ error: "Erro ao buscar item do carrinho." });
    }
}


async function altera (req, res){
    const itemCar = await ItemCarrinho.findOne({
        where: {id: req.body.id}
    });
    itemCar.idProduto = req.body.idProduto;
    itemCar.idCarrinho = req.body.idCarrinho;
    itemCar.quantidade = req.body.quantidade;

    await itemCar.save();
    res.json(itemCar);
}

async function exclui (req, res){
    const itemCar = await ItemCarrinho.findOne({
        where: {id: req.body.id}
    });
    await itemCar.destroy();
    res.json(itemCar);
}

export {novo, todos, altera,exclui, um};
