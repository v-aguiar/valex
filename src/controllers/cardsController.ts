import { Request, Response } from "express";

import cardServices from "../services/cardServices.js";

export async function create(req: Request, res: Response) {
  const { employeeId, cardType } = req.body;

  const newCardData = await cardServices.createCard(employeeId, cardType);

  res.status(201).send(newCardData);
}

export async function activate(req: Request, res: Response) {
  const { cardId, password, securityCode } = req.body;

  await cardServices.activateCard(cardId, password, securityCode);

  res.sendStatus(200);
}

export async function getStatement(req: Request, res: Response) {
  const { cardId } = req.params;

  const statement = await cardServices.getCardStatement(parseInt(cardId));

  res.send(statement);
}

export async function blockCard(req: Request, res: Response) {
  const { cardId, password } = req.body;

  await cardServices.blockCard(cardId, password);

  res.sendStatus(200);
}

export async function unblockCard(req: Request, res: Response) {
  const { cardId, password } = req.body;

  await cardServices.unblockCard(cardId, password);

  res.sendStatus(200);
}
