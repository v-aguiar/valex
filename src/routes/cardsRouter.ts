import { Router } from "express";

import bodySchemaValidator from "../middlewares/bodySchemaValidator.js";
import createCardSchema from "../schemas/createCardSchema.js";
import { create } from "../controllers/cardsController.js";

const cardsRouter = Router();

cardsRouter.post("/cards/create", bodySchemaValidator(createCardSchema), create);

export default cardsRouter;
