import { Router } from "express";

import { recharge } from "../controllers/rechargeController.js";

import apiKeyValidator from "../middlewares/apiKeyValidator.js";
import bodySchemaValidator from "../middlewares/bodySchemaValidator.js";
import rechargeSchema from "../schemas/rechargeSchema.js";

const statementsRouter = Router();

statementsRouter.post("/recharge", apiKeyValidator, bodySchemaValidator(rechargeSchema), recharge);

export default statementsRouter;
