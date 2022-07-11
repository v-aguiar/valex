import { Router } from "express";

import { recharge } from "../controllers/rechargeController.js";

import apiKeyValidator from "../middlewares/apiKeyValidator.js";

const statementsRouter = Router();

statementsRouter.put("/recharge", apiKeyValidator, recharge);

export default statementsRouter;
