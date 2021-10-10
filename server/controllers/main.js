import jwt from "jsonwebtoken";
import { morseSchema } from "../morseSchema.js";

// @desc     Get JWT
// @route    POST /api/v1/auth
// @access   Public
export const authUser = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.json({
      error: "Please provide username and password",
    });
  } else if (
    username !== process.env.USERNAME ||
    password !== process.env.PASSWORD
  ) {
    res.json({
      error: "Please provide valid username or password",
    });
  }

  const id = new Date().getDate();

  const token = jwt.sign(
    {
      id: id,
      username: username,
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
    res.json({
      error: "Please provide text",
    });
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
