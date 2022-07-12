import { Router } from "express";

import { recharge } from "../controllers/rechargeController.js";
import { buyOnPointOfSale, buyOnline } from "../controllers/paymentsController.js";
import { getStatement } from "../controllers/cardsController.js";

import apiKeyValidator from "../middlewares/apiKeyValidator.js";
import bodySchemaValidator from "../middlewares/bodySchemaValidator.js";
import rechargeSchema from "../schemas/rechargeSchema.js";
import paymentSchema from "../schemas/paymentSchema.js";
import onlinePaymentSchema from "../schemas/onlinePaymentSchema.js";

const statementsRouter = Router();

statementsRouter.get("/statement/:cardId", getStatement);
statementsRouter.post("/recharge", apiKeyValidator, bodySchemaValidator(rechargeSchema), recharge);
statementsRouter.post("/buy", bodySchemaValidator(paymentSchema), buyOnPointOfSale);
statementsRouter.post("/buy/online", bodySchemaValidator(onlinePaymentSchema), buyOnline);

export default statementsRouter;
