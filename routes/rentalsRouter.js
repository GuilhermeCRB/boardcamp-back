import { Router } from "express";

import { createRental, getRentals, updateRental } from "../controllers/rentalsController.js";
import { checkDelay } from "../middlewares/rentals_middlewares/checkDelay.js";
import { checkGameAvailability } from "../middlewares/rentals_middlewares/checkGameAvailability.js";
import { validateCustomerID } from "../middlewares/rentals_middlewares/validateCustomerID.js";
import { validateGameID } from "../middlewares/rentals_middlewares/validateGameID.js";
import { validateRental } from "../middlewares/rentals_middlewares/validateRental.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post("/rentals", validateRental, validateCustomerID, validateGameID, checkGameAvailability, createRental);
rentalsRouter.post("/rentals/:id/return", checkDelay, updateRental);

export default rentalsRouter;