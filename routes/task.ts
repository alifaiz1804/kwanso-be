import { Router } from "express";
import {
  create,
  update,
  deleteTask,
  getOne,
  getAllUserTasks,
} from "../controller/task.controller";

export const taskRouter: Router = Router();

taskRouter.post("/", create);

taskRouter.put("/:id", update);

taskRouter.get("/:id", getOne);

taskRouter.get("/", getAllUserTasks);

taskRouter.delete("/:id", deleteTask);
