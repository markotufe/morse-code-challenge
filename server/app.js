import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import mainRouter from "./routes/main.js";
import routeNotFound from "./middleware/not-found.js";

//kako bismo mogli da koristimo env promenljive
dotenv.config();

//init aplikacije
const app = express();

//kako bi se moglo pristupiti serveru sa drugog porta
app.use(cors());
//kako bismo mogli da pokupimo podatke iz req.body
app.use(express.json());

//rute aplikacije
app.use("/api/v1", mainRouter);

//ruta nije pronadjena
app.use(routeNotFound);

//init servera
app.listen(
  process.env.PORT,
  console.log(`Server is listening on port ${process.env.PORT}`)
);
