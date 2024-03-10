import { Router } from "express";
import { authRouter } from "./auth";
import { taskRouter } from "./task";
import { verifyAdmin, verifyAuth } from "../middleware/auth.middleware";
import { userRouter } from "./user";

export const router: Router = Router();

router.use("/auth", authRouter);

router.use("/tasks", verifyAuth, taskRouter);

router.use("/users", verifyAuth, verifyAdmin, userRouter);
