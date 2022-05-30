import chalk from "chalk";

import db from "../../database-boardcamp/db.js";

export async function validateGameID(req, res, next) {
    const { gameId } = req.body;
    
    try {
        const gameIdQuery = await db.query("SELECT * FROM games WHERE id = $1", [gameId]);
        const game = gameIdQuery.rows;

        if (game.length === 0) {
            return res.status(400).send("Game does not exists!");
        }
        
        res.locals.gamePrice = game[0].pricePerDay;

        next();
    } catch (e) {
        console.log(chalk.red.bold("\nAn error occured while trying to verify if game id exists."));
        return res.status(500).send(e);
    }
}