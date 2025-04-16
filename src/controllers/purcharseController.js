import * as purcharseService from '../services/purcharseService.js';    

export const purcharse = async (req, res, next) => {
  try {
    // req.productData ya está validado por el middleware
    const session = await purcharseService.createPurchase(req.productData);
    
    res.status(200).json({
      success: true,
      session_id: session.id,
      payment_url: session.url,
      amount: session.amount,
      currency: "USD"
    });
    
  } catch (error) {
    console.error('Error en purcharse:', error);
    next({
      status: error.status || 500,
      message: error.message || 'Error al procesar el pago',
      details: error.details || null
    });
  }
};

  export const getLinkBuy = async (req, res, next) => {
    try {      
      const session = await purcharseService.createPurchase(req.productData);
            
      res.status(200).json({
        success: true,
        redirect_url: session.url,
        expires_at: new Date(Date.now() + 30 * 60 * 1000)
      });
      
    } catch (error) {
      console.error('Error en getLinkBuy:', error);
      next({
        status: 503,
        message: 'Servicio de pagos no disponible',
        details: error.message
      });
    }
  };

export const downloadDocument = async (req, res) => {
  try {
    const { sessionId } = req.params;

    if (!sessionId) {
      return res.status(400).json({ error: 'sessionId es requerido' });
    }

    const pdfBuffer = await purcharseService.generateDocumentPDF(sessionId);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=factura_${sessionId}.pdf`);
        
    res.send(pdfBuffer);

  } catch (error) {
    console.error('Error al generar PDF:', error);
    res.status(500).json({ error: 'Error al generar la factura' });
  }
};