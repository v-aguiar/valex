import { Router } from "express";

import { activate, blockCard, unblockCard, create, createVirtual } from "../controllers/cardsController.js";

import apiKeyValidator from "../middlewares/apiKeyValidator.js";
import bodySchemaValidator from "../middlewares/bodySchemaValidator.js";

import activateCardSchema from "../schemas/activateCardSchema.js";
import blockCardSchema from "../schemas/blockCardSchema.js";
import createCardSchema from "../schemas/createCardSchema.js";
import createVirtualCardSchema from "../schemas/createVirtualCardSchema.js";

const cardsRouter = Router();

cardsRouter.post("/create", apiKeyValidator, bodySchemaValidator(createCardSchema), create);
cardsRouter.post("/create/virtual", bodySchemaValidator(createVirtualCardSchema), createVirtual);

cardsRouter.put("/activate", bodySchemaValidator(activateCardSchema), activate);
cardsRouter.put("/block", bodySchemaValidator(blockCardSchema), blockCard);
cardsRouter.put("/unblock", bodySchemaValidator(blockCardSchema), unblockCard);

export default cardsRouter;
