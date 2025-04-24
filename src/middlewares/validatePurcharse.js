export const validateProductData = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      error: "Campos requeridos: name (string), price (number)",
      example: {
        name: "Parking Premium",
        price: 15.99,
        quantity: 1,
        description: "Estacionamiento por 24 horas"
      }
    });
  }

  req.productData = {
    name: req.body.name,
    price: Math.abs(Number(req.body.price)),
    quantity: Math.max(1, Math.floor(Number(req.body.quantity)) || 1),
    description: req.body.description || "",
    images: req.body.images || [],
    placa: req.body.placa || null,
    id: req.body.id || null,
    email: req.body.email || null
  };

  next();
};