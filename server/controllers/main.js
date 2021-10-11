import jwt from "jsonwebtoken";
import { morseSchema } from "../morseSchema.js";

// @desc     Get JWT
// @route    POST /api/v1/auth
// @access   Public
export const authUser = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(401).json({
      error: "Please provide username and password",
    });
  } else if (
    username !== process.env.USERNAME ||
    password !== process.env.PASSWORD
  ) {
    return res.status(401).json({
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
// @route    POST /api/v1/morse-response
// @access   Private
export const getMorseOutput = async (req, res) => {
  const textInput = req.body.textInput;

  if (!textInput) {
    return res.status(400).json({
      error: "Please provide text",
    });
  }

  const morseStringOutput = textInput
    .split("")
    .map((element) => {
      return morseSchema[element.toLowerCase()] || "";
    })
    .join(" ")
    .replace(/ +/g, " ");

  res.status(200).json({ morseString: morseStringOutput });
};
