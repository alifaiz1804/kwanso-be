import mongoose from "mongoose";
import { User } from "./user";

export class Task {
  name!: string;
  description!: string;
  id?: mongoose.Types.ObjectId;
  status!: string;
  user_id!: User;
}
