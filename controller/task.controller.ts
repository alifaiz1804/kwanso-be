import { RequestHandler } from "express";
import { TaskInterface } from "../models/taskModal";
import { JwtPayload } from "jsonwebtoken";
import * as taskService from "../services/task.service";
import { getErrorMessage } from "../services/util.service";

export interface CustomRequest extends Request {
  token: string | JwtPayload;
  params: {
    id: string;
  };
  query: {
    limit: number;
    cursor: string;
    status: string;
  };
}

export const create = async (req: CustomRequest, res: any) => {
  try {
    const body: any = req.body;
    const token: any = req?.token;
    const createdService = await taskService.createTask({
      ...body,
      user_id: token?._id,
    });

    res.status(200).send({ task: createdService });
  } catch (e) {
    res.status(500).send(getErrorMessage(e));
  }
};

export const update = async (req: CustomRequest, res: any) => {
  try {
    const body: any = req.body;
    const taskId = req.params.id;
    const token: any = req?.token;

    const updatedTask = await taskService.updateTask(body, taskId, token?._id);

    res
      .status(200)
      .send({ message: "Task updated successfully.", task: updatedTask });
  } catch (e) {
    res.status(500).send(getErrorMessage(e));
  }
};

export const deleteTask = async (req: CustomRequest, res: any) => {
  try {
    const taskId = req.params.id;
    const token: any = req?.token;

    await taskService.deleteTask(taskId, token?._id);

    res.status(200).send({ message: "Task deleted successfully." });
  } catch (e) {
    res.status(500).send({ errorMessage: getErrorMessage(e) });
  }
};

export const getAllUserTasks = async (req: CustomRequest, res: any) => {
  try {
    const token: any = req?.token;
    const limit: number = req?.query?.limit;
    const cursor: string = req?.query?.cursor;
    const status: string = req.query.status;

    const tasks = await taskService.getAllTaskOfCurrentUser(
      token?._id,
      limit,
      cursor,
      status,
      token?.role
    );

    res.status(200).send({ ...tasks });
  } catch (e) {
    res.status(500).send(getErrorMessage(e));
  }
};

export const getOne = async (req: CustomRequest, res: any) => {
  try {
    const taskId = req.params.id;
    const token: any = req?.token;

    const task = await taskService.getOneTask(taskId, token?._id);

    res.status(200).send({ task });
  } catch (e) {
    res.status(500).send({ errorMessage: getErrorMessage(e) });
  }
};
