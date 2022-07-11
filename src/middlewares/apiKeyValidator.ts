import { NextFunction, Request, Response } from "express";

import * as companyRepository from "../repositories/companyRepository.js";

export default async function apiKeyValidator(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.headers["x-api-key"];

  const company = await companyRepository.findByApiKey(apiKey.toString());

  if (!company) {
    throw {
      name: "unauthorized",
      message: "⚠ You don't have access to this API!",
    };
  }
  next();
}
