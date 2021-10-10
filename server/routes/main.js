import { Router } from "express";
import { getMorseOutput, authUser } from "../controllers/main.js";
import authMiddleware from "../middleware/auth.js";

const router = Router();

router.route("/auth").post(authUser);
router.route("/morse-response").get(authMiddleware, getMorseOutput);

export default router;
