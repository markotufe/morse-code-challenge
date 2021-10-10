import { Router } from "express";
import { getMorseOutput, authUser } from "../controllers/main.js";

const router = Router();

router.route("/auth").post(authUser);
router.route("/morse-response").get(getMorseOutput);

export default router;
