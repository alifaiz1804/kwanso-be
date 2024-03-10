import { Schema, model, Document } from "mongoose";
import { USER_ROLES } from "../constants/common";

import bcrypt from "bcryptjs";

export interface UserInterface extends Document {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
  token?: string;
  validatePassword(password: string): boolean;
}

const userSchema = new Schema<UserInterface>({
  first_name: { type: String, required: true },
  last_name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: [USER_ROLES.admin, USER_ROLES.client] },
});

userSchema.pre("save", async function (next: (err?: Error) => void) {
  const thisObj = this as UserInterface;

  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    thisObj.password = await bcrypt.hash(thisObj.password, salt);
    return next();
  } catch (e) {
    return next();
  }
});

userSchema.methods.validatePassword = async function (pass: string) {
  console.log(this.password, pass);
  return bcrypt.compare(pass, this.password);
};

const User = model<UserInterface>("User", userSchema);

export default User;
