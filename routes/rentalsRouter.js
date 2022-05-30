import { Router } from "express";

import { createRental } from "../controllers/rentalsController.js";
import { validateCustomerID } from "../middlewares/rentals_middlewares/validateCustomerID.js";
import { validateGameID } from "../middlewares/rentals_middlewares/validateGameID.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals", validateCustomerID, validateGameID, createRental);

export default rentalsRouter;