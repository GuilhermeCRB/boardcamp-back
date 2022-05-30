import chalk from "chalk";

import db from "../../database-boardcamp/db.js";

export async function validateRentalID(req, res, next) {
    const { id } = req.params;

    try {
        const rentalQuery = await db.query(`
            SELECT rentals.*, games."pricePerDay" FROM rentals
            JOIN games ON rentals."gameId" = games.id
            WHERE rentals.id = $1
        `, [id]);

        const rental = rentalQuery.rows[0];

        if(!rental){
            return res.sendStatus(404);
        }

        res.locals.rental = rental;

        next();
    } catch (e) {
        console.log(chalk.red.bold("\nAn error occured while trying to verify rental id exists."));
        return res.status(500).send(e);
    }
}