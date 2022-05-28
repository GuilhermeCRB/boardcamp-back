import { Router } from "express";

import { createGame } from "../controllers/gamesController.js";

const gamesRouter = Router();

gamesRouter.post("/games", createGame);

export default gamesRouter;