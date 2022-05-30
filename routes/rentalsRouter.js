import { Router } from "express";

import { createRental, getRentals } from "../controllers/rentalsController.js";
import { checkGameAvailability } from "../middlewares/rentals_middlewares/checkGameAvailability.js";
import { validateCustomerID } from "../middlewares/rentals_middlewares/validateCustomerID.js";
import { validateGameID } from "../middlewares/rentals_middlewares/validateGameID.js";
import { validateRental } from "../middlewares/rentals_middlewares/validateRental.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post("/rentals", validateRental, validateCustomerID, validateGameID, checkGameAvailability, createRental);

export default rentalsRouter;