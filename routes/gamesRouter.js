import { Router } from "express";

import { createGame } from "../controllers/gamesController.js";
import { sanitizeGame } from "../middlewares/games_middlewares/sanitizeGame.js";

const gamesRouter = Router();

gamesRouter.post("/games", sanitizeGame, createGame);

export default gamesRouter;