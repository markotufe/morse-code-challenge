import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors";
import { morseSchema } from "./morseSchema.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/v1/auth", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new Error("Please provide email and password", 400);
  }

  const id = new Date().getDate();

  const token = jwt.sign(
    {
      id: id,
      user: username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.status(200).json({ token });
});

app.get("/api/v1/result", (req, res) => {
  const textInput = req.body.textInput;

  if (!textInput) {
    throw new Error("Please provide text", 400);
  }

  const morseStringOutput = textInput
    .split("") // Transform the string into an array: ['T', 'h', 'i', 's'...
    .map((element) => {
      // Replace each character with a morse "letter"
      return morseSchema[element.toLowerCase()] || ""; // Lowercase only, ignore unknown characters.
    })
    .join(" ") // Convert the array back to a string.
    .replace(/ +/g, " "); // Replace double spaces that may occur when unknow characters were in the source string.

  res.status(200).json({ morseString: morseStringOutput });
});

app.listen(
  process.env.PORT,
  console.log(`Server is listening on port ${process.env.PORT}`)
);
