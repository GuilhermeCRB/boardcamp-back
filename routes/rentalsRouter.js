import { Router } from "express";

import { createRental } from "../controllers/rentalsController.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals", createRental);

export default rentalsRouter;