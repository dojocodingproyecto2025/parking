import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY no está definida en .env');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY.trim(), {
  apiVersion: '2023-08-16',
  timeout: 10000
});

export const createPurchase = async (productData) => {
  try {
    console.log("servicio -------------------------")
    console.log(productData)
    if (!productData || !process.env.CLIENT_URL) {
      throw new Error('Datos de producto o CLIENT_URL faltantes');
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: productData.name || 'Producto Genérico',
              description: productData.description || '',
              images: productData.images || [],
            },
            unit_amount: productData.price * 100 || 2000,
          },
          quantity: productData.quantity || 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}canceled`,
      metadata: {
        product_id: productData.id || '',
        user_email: productData.email || ''
      }
    });

    return {
      id: session.id,
      url: session.url,
      amount: session.amount_total / 100
    };

  } catch (error) {
    console.error('Ocurrio un Error en el Pago:', error);
    throw new Error(error.message || 'Error al crear sesión de pago');
  }
};