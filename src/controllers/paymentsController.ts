import { Request, Response } from "express";

import paymentServices from "../services/paymentServices.js";

export interface BuyOnPOSBody {
  businessId: number;
  amount: number;
  cardId: number;
  password: string;
}

export interface BuyOnlineBody {
  businessId: number;
  cardNumber: string;
  cardholderName: string;
  securityCode: number;
  expirationDate: string;
  amount: number;
}

export async function buyOnPointOfSale(req: Request, res: Response) {
  const { businessId, cardId, amount, password }: BuyOnPOSBody = req.body;

  await paymentServices.insertPayment({ cardId, businessId, amount, password });

  res.sendStatus(200);
}

export async function buyOnline(req: Request, res: Response) {
  const { businessId, amount, cardNumber, cardholderName, expirationDate, securityCode }: BuyOnlineBody =
    req.body;

  await paymentServices.insertOnlinePayment({
    businessId,
    amount,
    cardNumber,
    cardholderName,
    expirationDate,
    securityCode,
  });

  res.sendStatus(200);
}
