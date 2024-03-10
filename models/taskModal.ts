import mongoose, { Schema, model } from "mongoose";
import { UserInterface } from "./userModal";
import { TASK_STATUS_ENUM } from "../constants/common";

export interface TaskInterface {
  name: string;
  description: string;
  status: string;
  user_id: UserInterface;
}

const taskSchema = new Schema<TaskInterface>({
  name: { type: String },
  description: { type: String },
  status: {
    type: String,
    enum: [TASK_STATUS_ENUM.completed, TASK_STATUS_ENUM.pending],
    default: TASK_STATUS_ENUM?.pending,
  },
  user_id: { type: mongoose.Types.ObjectId },
});

const Task = model<TaskInterface>("task", taskSchema);

export default Task;
