import { NextFunction, RequestHandler, Request } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { USER_ROLES } from "../constants/common";

const JWT_SECRET: Secret = process.env.JWT_SECRET || "12345@#$%erSDER%^&UI";

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const verifyAuth: RequestHandler = async (
  req,
  res,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    (req as CustomRequest).token = decoded;

    next();
  } catch (err) {
    res.status(401).send("Please authenticate");
  }
};

export const verifyAdmin: RequestHandler = async (
  req,
  res,
  next: NextFunction
) => {
  try {
    const token: any = (req as CustomRequest).token;

    if (token?.role === USER_ROLES.client) throw new Error("Not Authorized.");

    next();
  } catch (err) {
    res.status(401).send("Please authenticate");
  }
};
