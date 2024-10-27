import 'dotenv/config';
import express from 'express';
import Stripe from 'stripe';
import rotas_produtos from './rotas/rotas_produtos.mjs';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const app = express();

app.use(express.json());
app.use('/produtos', rotas_produtos);
app.use(express.static('views'));

app.post('/checkout', async (req, res) => {
    try {
        const { preco } = req.body; // Recebe o valor enviado pelo frontend

        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'brl',
                        product_data: {
                            name: 'Compra The Lux Style'
                        },
                        unit_amount: Math.round(preco * 100)  // Converte para centavos
                    },
                    quantity: 1
                }
            ],
            mode: 'payment',
            success_url: 'http://localhost/complete',
            cancel_url: 'http://localhost/cancel'
        });

        console.log(session);
        res.json({ url: session.url });
    } catch (error) {
        console.error('Erro na criação da sessão de pagamento:', error);
        res.status(500).send('Erro ao criar sessão de pagamento');
    }
});


app.get('/complete', async (req, res) => {
        try {
            const result = await Promise.all([
                stripe.checkout.sessions.retrieve(req.query.session_id, { expand: ['payment_intent.payment_method'] }),
                stripe.checkout.sessions.listLineItems(req.query.session_id)
            ]);
    
            console.log(JSON.stringify(result));
            res.send('Your payment was successful');
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occurred');
        }
    });
    
    // Rota para cancelar o pagamento
    app.get('/cancel', (req, res) => {
        res.redirect('/');
    });

// Servidor escutando na porta 80
app.listen(80, () => {
    console.log('Servidor escutando na porta 80');
});
