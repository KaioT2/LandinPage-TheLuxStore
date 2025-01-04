import Venda from "../../model/venda.mjs";

async function atualizarVendaSemPaymentIntent(paymentIntentId) {
    const venda = await Venda.findOne({ where: { paymentIntent: null } });
    if (venda) {
        venda.paymentIntent = paymentIntentId;
        await venda.save();
    }
}

export { atualizarVendaSemPaymentIntent };