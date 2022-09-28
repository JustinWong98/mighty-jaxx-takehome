import jwt, { decode } from "jsonwebtoken";
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
    console.log(token);
    // verify if token is valid/legit, if not, return 403
    if (token) {
      const decodedToken = <jwt.JwtPayload>decode(token);
      if (decodedToken.exp! * 1000 < new Date().getTime()) {
        return res.status(401).json("Invalid token");
      }
      jwt.verify(token, "test", (err, user) => {
        if (err) return res.status(403).json("Invalid token");
        console.log(req.body);
        req.body.user = user;
        console.log(req.body);
        next();
      });
    }
  } else {
    //If header is undefined return Forbidden (403)
    return res.status(403).json("Invalid token");
  }
};
