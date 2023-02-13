import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { check } from "express-validator";

const router = Router();

router.post(
  "/register",
  [
    check("username", "Username cannot be empty").notEmpty(),
    check("password", "Password min length - 8 characters").isLength({
      min: 8,
    }),
  ],
  authController.register
);
router.post("/login", authController.login);
router.get("/users", authController.getUsers);

export default router;
