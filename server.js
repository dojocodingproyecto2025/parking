import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import reservationRoutes  from "./src/routers/reservationRoutes.js";
import purcharseRoutes from "./src/routers/purcharseRoutes.js";
import emailRoutes from "./src/routers/emailRoutes.js";
import userRoutes from "./src/routers/userRoutes.js";

dotenv.config();

const app = new express();
const PORT = process.env.PORT || 8080; 

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

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
app.listen(PORT, ()=> {
  console.log(
    `El servidor se encuentra activo en el puerto ${PORT} Api Parking`
  );
})