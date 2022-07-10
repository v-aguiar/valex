import { Router } from "express";

import { activate, create, getStatement } from "../controllers/cardsController.js";

import bodySchemaValidator from "../middlewares/bodySchemaValidator.js";
import activateCardSchema from "../schemas/activateCardSchema.js";
import createCardSchema from "../schemas/createCardSchema.js";

const cardsRouter = Router();

cardsRouter.post("/cards/create", bodySchemaValidator(createCardSchema), create);
cardsRouter.post("/cards/activate", bodySchemaValidator(activateCardSchema), activate);
cardsRouter.get("/cards/statement/:cardId", getStatement);

export default cardsRouter;
