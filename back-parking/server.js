import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = new express();
app.use(express.json());
app.use(cors());
dotenv.config();
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(
    "mongodb+srv://root:123@cluster0.juyjj.mongodb.net/parking?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Se conecto correctamente a la bd Parking"))
  .catch((e) => console.log("Error", e));

  // use-routers

// http://localhost:8080
app.listen(process.env.PORT, ()=> {
  console.log(
    `El servidor se encuentra activo en el puerto ${PUERTO} Api Parking`
  );
});