import mongoose from "mongoose";

export class User {
  first_name!: string;
  last_name!: string;
  email!: string;
  password!: string;
  role!: string;
  id?: mongoose.Types.ObjectId;
}
