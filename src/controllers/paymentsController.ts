import { Request, Response } from "express";

import paymentServices from "../services/paymentServices.js";

export async function buyOnPointOfSale(req: Request, res: Response) {
  const { businessId, cardId, amount, password } = req.body;

  await paymentServices.insertPayment(cardId, businessId, amount, password);

  res.sendStatus(200);
}
