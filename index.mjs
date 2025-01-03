import 'dotenv/config';
import express from 'express';
import Stripe from 'stripe';

import sync from './model/sync.mjs';

import rotas_produtos from './rotas/rotas_produtos.mjs';
import rotas_categorias from './rotas/rotas_categorias.mjs';
import rotas_vendas from './rotas/rotas_vendas.mjs';
import rotas_clientes from './rotas/rotas_clientes.mjs';
import rotas_itensVendas from './rotas/rotas_itensVendas.mjs';
import rotas_carrinho from './rotas/rotas_carrinho.mjs';
import rotas_itensCarrinho from './rotas/rotas_item_carrinho.mjs';
import rotas_endereco from './rotas/rotas_endereco.mjs';

import { atualizarVendaSemPaymentIntent } from './views/utils/setPaymentIntent.mjs';



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const app = express();

app.use(express.json());

app.use('/categorias', rotas_categorias);
app.use('/clientes', rotas_clientes);
app.use('/vendas', rotas_vendas);
app.use('/itensVendas', rotas_itensVendas);
app.use('/produtos', rotas_produtos);
app.use('/carrinhos', rotas_carrinho);
app.use('/itensCarrinho', rotas_itensCarrinho);
app.use('/carrinho', rotas_carrinho);
app.use('/endereco', rotas_endereco);

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

        res.json({ url: session.url });
    } catch (error) {
        console.error('Erro na criação da sessão de pagamento:', error);
        res.status(500).send('Erro ao criar sessão de pagamento');
    }
});


app.get('/complete', async (req, res) => {
  try {
    const [session, lineItems] = await Promise.all([
      stripe.checkout.sessions.retrieve(req.query.session_id, { expand: ['payment_intent.payment_method'] }),
      stripe.checkout.sessions.listLineItems(req.query.session_id),
    ]);

    const paymentIntentId = session.payment_intent.id;

    await atualizarVendaSemPaymentIntent(paymentIntentId);

    res.redirect('/Compra/paginaPosCompra.html');
  } catch (error) {
    console.error('Erro ao processar a conclusão da compra:', error);
    res.status(500).send('Erro ao completar a compra.');
  }
});
  
    
app.get('/cancel', async (req, res) => {
  await atualizarVendaSemPaymentIntent("cancelada");
    res.redirect('/index.html');
});

app.post('/refund', async (req, res) => {
    const { paymentIntentId } = req.body;
  
    if (!paymentIntentId) {
      return res.status(400).json({
        success: false,
        message: 'ID da cobrança é obrigatório.',
      });
    }
  
    try {
      const refundParams = { payment_intent: paymentIntentId };
  
      const refund = await stripe.refunds.create(refundParams);
      res.status(200).json({
        success: true,
        message: 'Reembolso criado com sucesso!',
        refund,
      });
      await atualizarVendaSemPaymentIntent("reembolsada");
    } catch (error) {
      console.error('Erro ao processar o reembolso:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao criar o reembolso.',
        error: error.message,
      });
    }
  });
  

  app.post('/status-compra', async (req, res) => {
    const { paymentIntentId } = req.body;
  
    if (!paymentIntentId) {
      return res.status(400).json({
        success: false,
        message: 'ID do Payment Intent é obrigatório.',
      });
    }
  
    try {
      // Recupera o PaymentIntent
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  
      // Recupera os reembolsos associados, se existirem
      const refunds = await stripe.refunds.list({
        payment_intent: paymentIntentId,
      });
  
      res.status(200).json({
        success: true,
        status: paymentIntent.status, // Status do pagamento
        amount_received: paymentIntent.amount_received / 100, // Valor recebido (convertido de centavos)
        refunds: refunds.data, // Lista de reembolsos
      });
    } catch (error) {
      console.error('Erro ao buscar o status da compra:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar o status da compra.',
        error: error.message,
      });
    }
  });
  
  

app.listen(80, () => {
    console.log('Servidor escutando na porta 80');
});
