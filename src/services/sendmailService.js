import nodemailer from "nodemailer";
import hbs from "express-handlebars";
import path from "path";
import fs from "fs";
import handlebars from "handlebars";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Función para compilar la plantilla
const compileTemplate = (templateName, data) => {
  const filePath = path.join(__dirname, "../", "templates", `${templateName}.hbs`);
  console.log('filePath',filePath);
  const source = fs.readFileSync(filePath, "utf8");
  const template = handlebars.compile(source);
  return template(data);
};

  export const sendEmail = async (to, data, id) => {
    const htmlContent = compileTemplate("payment", data);
    const subject = "Recibo de pago de estacionamiento";
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html: htmlContent
    };
  
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Correo enviado:', info.messageId);
      return info;
    } catch (error) {
      console.error('Error al enviar correo:', error);
      throw error;
    }
  };