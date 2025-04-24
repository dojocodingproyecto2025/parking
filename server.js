import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import reservationRoutes  from "./src/routers/reservationRoutes.js";
import purcharseRoutes from "./src/routers/purcharseRoutes.js";
import emailRoutes from "./src/routers/emailRoutes.js";
import userRoutes from "./src/routers/userRoutes.js";
// import { Server } from "socket.io";
// import http from "http";

dotenv.config();

const app = new express();
const PORT = process.env.PORT || 8080; 

app.use(express.json());

// var server = http.createServer(app);

app.use(cors());
app.use(express.urlencoded({ extended: true }));

// var io = new Server(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "PUT", "POST", "DELETE"]
//   }
// });

// io.on("connection", (socket) => {
//   socket.on("message", (data) => {
//     console.log(data);
//     io.emit("broadcast", data);
    
//   })
//   console.log("Alguien se conecto al servidor WS");
// });

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Se conecto correctamente a la bd Parking"))
  .catch((e) => console.log("Error", e));

  // use-routers
  app.use('/api/reservation',reservationRoutes);
  app.use('/api/purcharse',purcharseRoutes);
  app.use('/api/sendMail',emailRoutes);
  app.use(userRoutes);

// http://localhost:8080
// server.listen(PORT, ()=> {
app.listen(PORT, ()=> {
  console.log(
    `El servidor se encuentra activo en el puerto ${PORT} Api Parking`
  );
})