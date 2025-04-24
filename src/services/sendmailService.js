import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";
import handlebars from "handlebars";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { jsPDF } from "jspdf";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
<<<<<<< HEAD
import puppeteer from "puppeteer";
import chromium from 'chrome-aws-lambda';
=======
>>>>>>> 386e74b09016e256819775e10a0fe4273764cdaa

dotenv.config();

// Transportador de correo
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

// Función para compilar plantilla HTML del cuerpo del correo
const compileTemplate = async (templateName, data) => {
  const filePath = path.join(__dirname, "../", "templates", `${templateName}.hbs`);
  const source = fs.readFileSync(filePath, "utf8");
  const template = handlebars.compile(source);
  return template(data);
};

// 🧾 Generar PDF con jsPDF
const ticketPDF = async (data) => {
  const { fullname, producto } = data;
  const doc = new jsPDF();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Recibo de Pago de Estacionamiento", 105, 20, { align: "center" });

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Hola ${fullname} `, 20, 40);
  doc.text("Gracias por reservar en nuestro sistema App Parking", 20, 50);
  doc.text("Su lugar de estacionamiento ya está reservado.", 20, 60);

  doc.text("Datos de su reservación:", 20, 80);
  doc.text(`Espacio de estacionamiento: ${producto.nSlot}`, 20, 90);
  doc.text(`Precio: $${producto.precio}`, 20, 100);

  doc.text("Se adjunta comprobante de su compra en el correo.", 20, 120);

  return doc.output("arraybuffer");
};

// Envío de correo
export const sendEmail = async (to, data, id) => {
  const htmlContent = await compileTemplate("payment", data); // Para el cuerpo del correo
  const pdfFile = await ticketPDF(data); // Generar PDF con jsPDF

  const subject = "Recibo de pago de estacionamiento";

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html: htmlContent,
    attachments: [
      {
        filename: "Ticket.pdf",
        content: Buffer.from(pdfFile),
        contentType: "application/pdf",
      },
    ],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Correo enviado:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error al enviar correo:", error);
    throw error;
  }
};

// import nodemailer from "nodemailer";
// import hbs from "express-handlebars";
// import path from "path";
// import fs from "fs";
// import handlebars from "handlebars";
// import dotenv from "dotenv";
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// import puppeteer from "puppeteer";
// // import chromium from 'chrome-aws-lambda';

// dotenv.config();

// const transporter = nodemailer.createTransport({
//     service: "Gmail",
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true,
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   // Función para compilar la plantilla
// const compileTemplate = async (templateName, data) => {
//   const filePath = path.join(__dirname, "../", "templates", `${templateName}.hbs`);
//   const source = fs.readFileSync(filePath, "utf8");
//   const template = handlebars.compile(source);
//   return template(data);
// };

// // const ticketPDF = async (html) => {
// //   try {
// //     const browser = await chromium.puppeteer.launch({
// //       args: chromium.args,
// //       executablePath: await chromium.executablePath,
// //       headless: chromium.headless,
// //     });

// //     const page = await browser.newPage();
// //     await page.setContent(html, { waitUntil: 'domcontentloaded' });

// //     const pdfBuffer = await page.pdf({
// //       format: 'A4',
// //       printBackground: true,
// //     });

// //     await browser.close();
// //     return pdfBuffer;
// //   } catch (err) {
// //     console.error('Error generando PDF:', err);
// //     throw err;
// //   }
// // };
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

//   export const sendEmail = async (to, data, id) => {    
//     const htmlContent = await compileTemplate("payment", data);    
//     const pdfFile = await ticketPDF(htmlContent);
    
//     const subject = "Recibo de pago de estacionamiento";
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to,
//       subject,
//       html: htmlContent,
//       attachments: [
//         {
//           filename: "Ticket.pdf",
//           content: pdfFile,
//           contentType: "application/pdf",
//         },
//       ],
//     };
  
//     try {
//      const info = await transporter.sendMail(mailOptions);
//       console.log('Correo enviado:', info.messageId);
//       return info;
//     } catch (error) {
//       console.error('Error al enviar correo:', error);
//       throw error;
//     }
//   };