import nodemailer from "nodemailer";
import hbs from "express-handlebars";
import path from "path";
import fs from "fs";
import handlebars from "handlebars";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// import puppeteer from "puppeteer";
import chromium from 'chrome-aws-lambda';

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
const compileTemplate = async (templateName, data) => {
  const filePath = path.join(__dirname, "../", "templates", `${templateName}.hbs`);
  const source = fs.readFileSync(filePath, "utf8");
  const template = handlebars.compile(source);
  return template(data);
};

const ticketPDF = async (html) => {
  try {
    const browser = await chromium.puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'domcontentloaded' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
    });

    await browser.close();
    return pdfBuffer;
  } catch (err) {
    console.error('Error generando PDF:', err);
    throw err;
  }
};
// const ticketPDF = async (html) => {
//   try {    
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();

//     await page.setContent(html, { waitUntil: "domcontentloaded" });

//     const pdfBuffer = await page.pdf({
//       format: "A4",
//       printBackground: true,
//     });

//     await browser.close();

//     return pdfBuffer;
    
//   } catch (err) {
//     console.error("Error generando PDF:", err);
//     //res.status(500).send("Error generando PDF");
//   }
// }

  export const sendEmail = async (to, data, id) => {    
    const htmlContent = await compileTemplate("payment", data);    
    const pdfFile = await ticketPDF(htmlContent);
    
    const subject = "Recibo de pago de estacionamiento";
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html: htmlContent,
      attachments: [
        {
          filename: "Ticket.pdf",
          content: pdfFile,
          contentType: "application/pdf",
        },
      ],
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