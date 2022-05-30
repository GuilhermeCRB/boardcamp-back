import { Router } from "express";

import { createRental } from "../controllers/rentalsController.js";
import { validateGameID } from "../middlewares/rentals_middlewares/validateGameID.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals", validateGameID, createRental);

export default rentalsRouter;