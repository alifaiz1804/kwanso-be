import { USER_ROLES } from "../constants/common";
import User, { UserInterface } from "../models/userModal";

export const createUser = async (user: UserInterface) => {
  try {
    const foundUser = await User.findOne({ email: user?.email });

    if (foundUser) throw new Error("User already exist with same email.");

    const newUser = await User.create({
      email: user?.email,
      password: user?.password,
      role: USER_ROLES?.client,
      first_name: user?.first_name,
      last_name: user?.last_name,
    });

    return newUser;
  } catch (error) {
    throw error;
  }
};
