import User from "../models/user.js";
import bcrypt from "bcrypt";

export const validateLogin = async (req, res, next) => {
    const { email, password } = req.body;
    const errors = [];

    if (!email) {
        errors.push("Correo es requerida");
    }

    if (!password) {
        errors.push("Contraseña es requerida");
    }

    var userFind = await User.findOne({ email: email });
    if (userFind == null) {
        errors.push("Usiario o contraseña incorrecto");
    }

    var validate = await bcrypt.compare(password, userFind.password);
    if (!validate) {
        errors.push("Usiario o contraseña incorrecto");
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
}