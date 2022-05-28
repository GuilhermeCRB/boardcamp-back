import { Router } from "express";

import { createCustomer } from "../controllers/customersController.js";
import { sanitizeCustomer } from "../middlewares/customers_middlewares/sanitizeCustomer.js";

const customersRouter = Router();

customersRouter.post("/customers", sanitizeCustomer, createCustomer);

export default customersRouter;