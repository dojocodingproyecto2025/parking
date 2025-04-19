// export const validateUser = (req, res, next) => {
//     const { email, placa, numeroSlot } = req.body;
//     const errors = [];

//     if (!userId) {
//         errors.push("usuario es requerida");
//     }

//     if (!placa) {
//         errors.push("placa es requerida");
//     } 

//     if (!numeroSlot) {
//         errors.push("numero de slot es requerida");
//     } else if (isNaN(numeroSlot)) {
//         errors.push("numeroSlot debe ser un número");
//     }

//     if (errors.length > 0) {
//         return res.status(400).json({ errors });
//       }
    
//       next();
// }