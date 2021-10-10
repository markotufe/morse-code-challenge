import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import mainRouter from "./routes/main.js";
import routeNotFound from "./middleware/not-found.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", mainRouter);
app.use(routeNotFound);

app.listen(
  process.env.PORT,
  console.log(`Server is listening on port ${process.env.PORT}`)
);
