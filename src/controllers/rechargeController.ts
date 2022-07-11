import { Request, Response } from "express";

import rechargeService from "../services/rechargeService.js";

export async function recharge(req: Request, res: Response) {
  const { cardId, amount } = req.body;

  await rechargeService.recharge(cardId, amount);

  res.sendStatus(200);
}
