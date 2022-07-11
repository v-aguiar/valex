import { Router } from "express";

import cardsRouter from "./cardsRouter.js";
import statementsRouter from "./statementsRouter.js";

const router = Router();

router.use(cardsRouter);
router.use(statementsRouter);

export default router;
