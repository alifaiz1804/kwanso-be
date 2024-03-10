import mongoose from "mongoose";
import { TASK_STATUS_ENUM, USER_ROLES } from "../constants/common";
import Task, { TaskInterface } from "../models/taskModal";

export const createTask = async (newTask: TaskInterface) => {
  try {
    if (!newTask.name || !newTask.description || !newTask?.status)
      throw new Error("Required fields are missing.");
    if (
      ![TASK_STATUS_ENUM.completed, TASK_STATUS_ENUM.pending].includes(
        newTask.status
      )
    )
      throw new Error("Status can only be 'Completed or 'Pending''");
    const task = await Task.create(newTask);
    return task;
  } catch (e) {
    throw e;
  }
};

export const updateTask = async (
  task: TaskInterface,
  id: string,
  user_id: string
) => {
  try {
    const foundTask = await Task.findById({
      _id: new mongoose.Types.ObjectId(id),
      user_id: new mongoose.Types.ObjectId(user_id),
    });

    if (!foundTask) throw new Error("Task not found");

    if (task?.name) {
      foundTask.name = task.name;
    }

    if (task?.description) {
      foundTask.description = task.description;
    }

    if (task?.status) {
      if (
        ![TASK_STATUS_ENUM.completed, TASK_STATUS_ENUM.pending].includes(
          task.status
        )
      )
        throw new Error("Status can only be 'Completed or 'Pending''");
      foundTask.status = task.status;
    }

    const updatedTask = await foundTask.save();

    return updatedTask;
  } catch (error) {
    throw error;
  }
};

export const deleteTask = async (id: string, user_id: string) => {
  try {
    const foundTask = await Task.findById({
      _id: new mongoose.Types.ObjectId(id),
      user_id: new mongoose.Types.ObjectId(user_id),
    });

    console.log(foundTask);

    if (!foundTask) throw new Error("Task not found");

    let doc = await Task.deleteOne({
      _id: new mongoose.Types.ObjectId(id),
      user_id: new mongoose.Types.ObjectId(user_id),
    });

    return;
  } catch (error) {
    throw error;
  }
};

export const getOneTask = async (id: string, user_id: string) => {
  try {
    const foundTask = await Task.findById({
      _id: new mongoose.Types.ObjectId(id),
      user_id: new mongoose.Types.ObjectId(user_id),
    });

    if (!foundTask) throw new Error("Task not found");

    return foundTask;
  } catch (error) {
    throw error;
  }
};

export const getAllTaskOfCurrentUser = async (
  user_id: string,
  limit: number = 10,
  cursor: string = "",
  status: string = "",
  role: string = "",
  users: string[] = []
) => {
  try {
    const tasks = await Task.find({
      ...(role === USER_ROLES.client
        ? { user_id: new mongoose.Types.ObjectId(user_id) }
        : users?.length
        ? {
            user_id: {
              $in: users.map((user) => new mongoose.Types.ObjectId(user)),
            },
          }
        : {}),
      ...(cursor ? { _id: { $gt: new mongoose.Types.ObjectId(cursor) } } : {}),
      ...(status &&
      [TASK_STATUS_ENUM.completed, TASK_STATUS_ENUM.pending]?.includes(status)
        ? { status }
        : {}),
    })
      .limit(limit)
      .sort("_id");

    return {
      tasks,
      nextCursor: tasks?.length ? tasks[tasks?.length - 1]?._id : null,
    };
  } catch (error) {
    throw error;
  }
};
