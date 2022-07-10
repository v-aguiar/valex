import { Request, Response } from "express";

export async function create(req: Request, res: Response) {
  const { employeeId, cardType } = req.body;
  const { apiKey } = req.headers;

  console.log("headers: ", req.headers);
}
