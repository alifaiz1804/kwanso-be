import { Router } from "express";
import { login, signup } from "../controller/auth.controller";

export const authRouter: Router = Router();

authRouter.post("/login", login);

authRouter.post("/signup", signup);
