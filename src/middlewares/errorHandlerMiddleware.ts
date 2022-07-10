import { NextFunction, Request, Response } from "express";

export default function errorHandlerMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error.name === "ValidationError") {
    console.error({ error: error.message });
    res.status(422).send(error.message);
  }

  res.status(500).send("⚠ We're sorry, it appears that something went wrong...");
}
