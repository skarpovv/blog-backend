import { Router } from "express";
import { authController } from "../controllers/auth.controller";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/users", authController.getUsers);

export default router;