import { Router } from "express";

import { createRental } from "../controllers/rentalsController.js";
import { validateCustomerID } from "../middlewares/rentals_middlewares/validateCustomerID.js";
import { validateGameID } from "../middlewares/rentals_middlewares/validateGameID.js";
import { validateRental } from "../middlewares/rentals_middlewares/validateRental.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals", validateCustomerID, validateGameID, validateRental, createRental);

export default rentalsRouter;