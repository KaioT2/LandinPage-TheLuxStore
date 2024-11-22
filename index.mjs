import 'dotenv/config';
import express from 'express';
import Stripe from 'stripe';

import rotas_produtos from './rotas/rotas_produtos.mjs';
import rotas_categorias from './rotas/rotas_categorias.mjs';
import rotas_compras from './rotas/rotas_compras.mjs';
import rotas_clientes from './rotas/rotas_clientes.mjs';
import rotas_itensCompra from './rotas/rotas_itensCompras.mjs';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const app = express();

app.use(express.json());

app.use('/categorias', rotas_categorias);
app.use('/clientes', rotas_clientes);
app.use('/compras', rotas_compras);
app.use('/itensCompras', rotas_itensCompra);
app.use('/produtos', rotas_produtos);

app.use(express.static('views'));

app.post('/checkout', async (req, res) => {
    try {
        const { preco } = req.body;

        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'brl',
                        product_data: {
                            name: 'Compra The Lux Style'
                        },
                        unit_amount: Math.round(preco * 100) 
                    },
                    quantity: 1
                }
            ],
            payment_method_types: ['card', 'boleto'],
            mode: 'payment',
            shipping_address_collection: {
                allowed_countries: ['BR', 'US']
            },
            success_url: `${process.env.BASE_URL}/complete?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.BASE_URL}/cancel`
        });

        console.log(session);
        res.json({ url: session.url });
    } catch (error) {
        console.error('Erro na criação da sessão de pagamento:', error);
        res.status(500).send('Erro ao criar sessão de pagamento');
    }
});


app.get('/complete', async (req, res) => {

    const result = Promise.all([
        stripe.checkout.sessions.retrieve(req.query.session_id, { expand: ['payment_intent.payment_method'] }),
        stripe.checkout.sessions.listLineItems(req.query.session_id)
    ])

    console.log(JSON.stringify(await result));

   res.redirect('/Compra/paginaPosCompra.html');
});
    
app.get('/cancel', (req, res) => {
    res.redirect('/index.html');
});

app.listen(80, () => {
    console.log('Servidor escutando na porta 80');
});
