import { Router } from "express";

import { activate, blockCard, unblockCard, create, getStatement } from "../controllers/cardsController.js";

import apiKeyValidator from "../middlewares/apiKeyValidator.js";
import bodySchemaValidator from "../middlewares/bodySchemaValidator.js";

import activateCardSchema from "../schemas/activateCardSchema.js";
import blockCardSchema from "../schemas/blockCardSchema.js";
import createCardSchema from "../schemas/createCardSchema.js";

const cardsRouter = Router();

cardsRouter.post("/cards/create", apiKeyValidator, bodySchemaValidator(createCardSchema), create);

cardsRouter.put("/cards/activate", bodySchemaValidator(activateCardSchema), activate);
cardsRouter.put("/cards/block", bodySchemaValidator(blockCardSchema), blockCard);
cardsRouter.put("/cards/unblock", bodySchemaValidator(blockCardSchema), unblockCard);

cardsRouter.get("/cards/statement/:cardId", getStatement);

export default cardsRouter;
