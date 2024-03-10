import { Router } from "express";
import { inviteUser } from "../controller/user.controller";

export const userRouter: Router = Router();

userRouter.post("/invite", inviteUser);
