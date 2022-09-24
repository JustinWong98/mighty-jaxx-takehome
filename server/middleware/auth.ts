import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import type { Request, Response } from "express";

declare module "jsonwebtoken" {
  export interface UserIDJwtPayload extends jwt.JwtPayload {
    userId: string;
  }
}

export const auth = (req: Request, res: Response, next: () => void) => {
  const header = req.headers.cookie;
  // change SALT
  if (typeof header !== "undefined") {
    const bearer = header.split("=");
    const token = bearer[1];
    // verify if token is valid/legit, if not, return 403
    // req.token = token;
    next();
  } else {
    //If header is undefined return Forbidden (403)
    res.sendStatus(403);
  }
};
