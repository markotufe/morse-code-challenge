import jwt from "jsonwebtoken";
import { morseSchema } from "../morseSchema.js";

// @desc     Get JWT
// @route    POST /api/v1/auth
// @access   Public
export const authUser = async (req, res) => {
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
};

// @desc     Get Morse code text
// @route    GET /api/v1/morse-response
// @access   Private
export const getMorseOutput = async (req, res) => {
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
};
