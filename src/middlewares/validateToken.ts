import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors";

const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let token = req.headers.authorization;

  if (!token) {
    throw new AppError("token is missing", 401);
  }

  token = token.split(" ")[1];

  jwt.verify(token, "casasacverbscxf32v", (error, decoded: any) => {
    if (error) {
      throw new AppError(error.message, 401);
    }

    console.log(decoded);

    req.user = {
      id: parseInt(decoded.jti),
      admin: decoded.role,
    };

    return next();
  });
};

export default validateToken;
