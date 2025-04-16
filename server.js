import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import reservationRoutes  from "./src/routers/reservationRoutes.js";
import dotenv from 'dotenv';
import purcharseRoutes from "./src/routers/purcharseRoutes.js";

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

// http://localhost:8080
app.listen(PORT, ()=> {
  console.log(
    `El servidor se encuentra activo en el puerto ${PORT} Api Parking`
  );
})