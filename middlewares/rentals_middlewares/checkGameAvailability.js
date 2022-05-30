import chalk from "chalk";

import db from "../../database-boardcamp/db.js";

export async function checkGameAvailability(req, res, next) {
    const { stock } = res.locals;
    const { gameId } = req.body;

    try {
        const rentalGameQuery = await db.query(`SELECT * FROM rentals WHERE "gameId" = $1`, [gameId]);
        const rentalList = rentalGameQuery.rows;

        if (rentalList.length >= stock) {
            return res.status(400).send("Game is unavailable!");
        }

        next();
    } catch (e) {
        console.log(chalk.red.bold("\nAn error occured while trying to verify game availability."));
        return res.status(500).send(e);
    }
}