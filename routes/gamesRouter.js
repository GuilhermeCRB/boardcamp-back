import { Router } from "express";

import { createGame } from "../controllers/gamesController.js";
import { sanitizeGame } from "../middlewares/games_middlewares/sanitizeGame.js";
import { validateGame } from "../middlewares/games_middlewares/validateGame.js";

const gamesRouter = Router();

gamesRouter.post("/games", sanitizeGame, validateGame, createGame);

export default gamesRouter;