import { Router } from "express";

import { createCustomer } from "../controllers/customersController.js";

const customersRouter = Router();

customersRouter.post("/customers", createCustomer);

export default customersRouter;