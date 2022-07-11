import { Request, Response } from "express";

export async function recharge(req: Request, res: Response) {
  const { cardId, amount } = req.body;
}
