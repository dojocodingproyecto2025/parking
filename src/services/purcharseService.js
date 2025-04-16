import Stripe from 'stripe';
import PDFDocument from 'pdfkit';

// Configuración centralizada de Stripe
const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-08-16'
});

export const createPurchase = async () => {
  try {
    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Producto de ejemplo',
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/canceled`,
    });
    return session;
  } catch (err) {
    console.error('Error en createPurchase:', err);
    throw err;
  }
};

export const generateDocumentPDF = async (sessionId) => {  
  try {
    console.log("Generando PDF para sesión:", sessionId);
        
    const session = await stripeInstance.checkout.sessions.retrieve(sessionId);
    
    const doc = new PDFDocument();
    let pdfChunks = [];
    
    doc.on('data', (chunk) => pdfChunks.push(chunk));
    
    doc.fontSize(25).text('Factura', 100, 80);
    doc.fontSize(14).text(`Número: ${session.id}`, 100, 150);
    doc.text(`Cliente: ${session.customer_details?.email || 'No especificado'}`, 100, 180);
    doc.text(`Monto: $${session.amount_total / 100}`, 100, 210);
    doc.end();
    
    return Buffer.concat(pdfChunks);
    
  } catch (error) {
    console.error("Error en generateDocumentPDF:", error);
    throw new Error("No se pudo generar el PDF");
  }
};