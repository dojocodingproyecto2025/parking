import * as purcharseService from '../services/purcharseService.js';    

export const purcharse = async (req, res, next) => {
    try {
      const session = await purcharseService.createPurchase({
        name: 'Producto de ejemplo',
        description: 'Descripción del producto de ejemplo',
        images: ['https://example.com/image.png'],
        price: 2000,
      });
      res.status(200).json({ id: session.id }); 
      //res.status(200).json({url: session.url});
    } catch (error) {
      next(error);
    }
  };

  export const getLinkBuy = async (req, res, next) => {
    try {
      const session = await purcharseService.createPurchase({
        name: 'Producto de ejemplo',
        description: 'Descripción del producto de ejemplo',
        images: ['https://example.com/image.png'],
        price: 2000,
      });
      res.status(200).json({url: session.url});
    } catch (error) {
      next(error);
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