﻿import { Request, Response } from "express";

import cardServices from "../services/cardServices.js";

export async function create(req: Request, res: Response) {
  // TODO -> Pra que serve essa apiKey msm?
  const { apiKey } = req.headers;
  const { employeeId, cardType } = req.body;

  await cardServices.createCard(employeeId, cardType);

  res.sendStatus(200);
}
