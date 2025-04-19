import * as sendmailService from '../services/sendmailService.js';
import User from '../models/user.js';

export const sendmailReservation = async (req, res) => {
    const { to, name, id, producto } = req.body;
    try {
        var userFind = await User.findOne({ _id: id });

        if (userFind == null) {
            return res.status(201).json({ exist: false });
        }

        const fullname = userFind.name + " " + userFind.lastName
    
        await sendmailService.sendEmail(to, { fullname, producto }, id);
        res.status(201).json({ status: "ok" });
    } catch (error) {
        res.status(500).json({ error: 'Error al enviar el correo' });
    }
}