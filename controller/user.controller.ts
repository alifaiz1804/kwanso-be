import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { getErrorMessage } from "../services/util.service";
import User from "../models/userModal";

const JWT_SECRET = process.env.JWT_SECRET || "12345@#$%erSDER%^&UI";
const JWT_EXPIRE = process.env.JWT_EXPIRE || "1d";

export const inviteUser: RequestHandler = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) throw new Error("Please provide email.");

    const existUser = await User.findOne({ email });

    if (existUser) throw new Error("User already exist with same email.");

    const token = jwt.sign({ email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRE,
    });
    res.status(200).send({ inviteToken: token });
  } catch (error) {
    res.status(500).send({ errorMessage: getErrorMessage(error) });
  }
};
