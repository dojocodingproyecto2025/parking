import User from "../models/user.js";

export const validateUser = async (req, res, next) => {
    const { email, password, name, lastName } = req.body;
    const errors = [];

    var userFind = await User.findOne({ email: email });

    if(userFind){
        errors.push("Correo ya esta registrado");
    }

    if (!email) {
        errors.push("Correo es requerida");
    }

    if (!password) {
        errors.push("Contraseña es requerida");
    }
    
    if (!name) {
        errors.push("Nombre es requerido");
    }

    if (!lastName) {
        errors.push("Apellido es requerido");
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
}