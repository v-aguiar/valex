import { Router } from "express";

import { activate, blockCard, unblockCard, create } from "../controllers/cardsController.js";

import apiKeyValidator from "../middlewares/apiKeyValidator.js";
import bodySchemaValidator from "../middlewares/bodySchemaValidator.js";

import activateCardSchema from "../schemas/activateCardSchema.js";
import blockCardSchema from "../schemas/blockCardSchema.js";
import createCardSchema from "../schemas/createCardSchema.js";

const cardsRouter = Router();

cardsRouter.post("/create", apiKeyValidator, bodySchemaValidator(createCardSchema), create);

cardsRouter.put("/activate", bodySchemaValidator(activateCardSchema), activate);
cardsRouter.put("/block", bodySchemaValidator(blockCardSchema), blockCard);
cardsRouter.put("/unblock", bodySchemaValidator(blockCardSchema), unblockCard);

export default cardsRouter;
