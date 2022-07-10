import { NextFunction, Request, Response } from "express";

export default function apiKeyValidator(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.headers["x-api-key"];
  if (apiKey !== process.env.API_KEY) {
    throw {
      name: "unauthorized",
      message: "⚠ You don't have access to this API!",
    };
  }
  next();
}
