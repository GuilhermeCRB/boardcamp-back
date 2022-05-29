import { Router } from "express";

import { createCustomer } from "../controllers/customersController.js";
import { sanitizeCustomer } from "../middlewares/customers_middlewares/sanitizeCustomer.js";
import { validateCustomer } from "../middlewares/customers_middlewares/validateCustomer.js";

const customersRouter = Router();

customersRouter.post("/customers", sanitizeCustomer, validateCustomer, createCustomer);

export default customersRouter;