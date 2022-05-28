import chalk from "chalk";

import db from "../database-boardcamp/db.js";

export async function createGame(req, res) {
    const { game } = res.locals;
    const values = Object.values(game);

    try {
        await db.query(`INSERT INTO games(name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)`, values);
        return res.sendStatus(201);
    } catch (e) {
        console.log(chalk.red.bold("\nAn error occured while trying to create a game."));
        return res.status(500).send(e);
    }
}