import { RequestHandler, Request } from "express";
import * as authService from "../services/auth.services";
import { getErrorMessage } from "../services/util.service";
import { UserInterface } from "../models/userModal";
import jwt, { Secret } from "jsonwebtoken";
import { createUser } from "../services/user.service";

const JWT_SECRET: Secret = process.env.JWT_SECRET || "12345@#$%erSDER%^&UI";

export const login: RequestHandler = async (req: Request, res, next) => {
  try {
    const body = req.body;

    const foundUser = await authService.login(body);

    console.log("here", body);
    res.status(200).send(foundUser);
  } catch (e) {
    return res.status(500).send(getErrorMessage(e));
  }
};

export const signup: RequestHandler = async (req, res, next) => {
  try {
    const body: UserInterface = req.body;

    if (
      !body?.email ||
      !body?.password ||
      !body?.first_name ||
      !body?.last_name ||
      !body?.token
    ) {
      throw new Error("Required fields are missing");
    }

    jwt.verify(body?.token, JWT_SECRET);

    const newUser = await createUser(body);
    res.status(200).send({ user: newUser });
  } catch (e) {
    res.status(500).send({ errorMessage: getErrorMessage(e) });
  }
};
