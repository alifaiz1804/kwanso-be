import User, { UserInterface } from "../models/userModal";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "12345@#$%erSDER%^&UI";
const JWT_EXPIRE = process.env.JWT_EXPIRE || "1d";

export async function register(user: UserInterface): Promise<void> {
  try {
    await User.create(user);
  } catch (error) {
    throw error;
  }
}

export async function login(user: UserInterface) {
  try {
    const foundUser = await User.findOne({ email: user.email });
    if (!foundUser) throw new Error("User not found.");
    let isPasswordCorrect = await foundUser?.validatePassword(user.password);
    if (!isPasswordCorrect) throw new Error("Invalid Password");
    console.log({ isPasswordCorrect, foundUser });

    let filtered_user = {
      _id: foundUser._id?.toString(),
      name: foundUser?.first_name + " " + foundUser?.last_name,
      role: foundUser?.role,
      email: foundUser?.email,
    };

    const token = jwt.sign(filtered_user, JWT_SECRET, {
      expiresIn: JWT_EXPIRE,
    });
    return { user: filtered_user, token: token };
  } catch (error) {
    throw error;
  }
}
