import { Router } from "express";

import { createCustomer, updateCustomer } from "../controllers/customersController.js";
import { sanitizeCustomer } from "../middlewares/customers_middlewares/sanitizeCustomer.js";
import { validateCustomer } from "../middlewares/customers_middlewares/validateCustomer.js";

const customersRouter = Router();

customersRouter.post("/customers", sanitizeCustomer, validateCustomer, createCustomer);
customersRouter.put("/customers/:id", sanitizeCustomer, validateCustomer, updateCustomer);

export default customersRouter;