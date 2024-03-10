import dotenv from "dotenv";
import connectDB from "../config/db";
import User from "../models/userModal";
import { User as UserType } from "../types/user";
import { USER_ROLES } from "../constants/common";

dotenv.config();

const userData: UserType = {
  first_name: "Ali",
  last_name: "Faiz",
  email: "alifaiz1804@gmail.com",
  role: USER_ROLES.admin,
  password: "123",
};

const seedUser = async () => {
  await connectDB();

  await User.create(userData);

  console.log("User Created successfully: ", userData);
};

seedUser();

export {};
