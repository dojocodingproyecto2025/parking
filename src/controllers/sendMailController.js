import * as sendmailService from '../services/sendmailService.js';

export const sendmailReservation = async (req, res) => {
    const { to, name, id, producto } = req.body;
    
    try {
        console.log("Send email");
        await sendmailService.sendEmail(to, message, { name, producto }, id);
        res.status(201).json({ status: "ok" });
    } catch (error) {
        res.status(500).json({ error: 'Error al enviar el correo' });
    }
}