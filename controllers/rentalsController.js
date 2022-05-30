import chalk from "chalk";
import dayjs from "dayjs";

import db from "../database-boardcamp/db.js";

export async function createRental(req, res) {
    const { customerId, gameId, daysRented } = req.body;
    const { gamePrice } = res.locals;
    const date = new dayjs().format("YYYY/MM/DD");
    const values = [customerId, gameId, date, daysRented, null, gamePrice * daysRented, null];

    try {
        await db.query(`
            INSERT INTO rentals(
                "customerId",
                "gameId",
                "rentDate",
                "daysRented",
                "returnDate",
                "originalPrice",
                "delayFee"
                ) 
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `, values)
        return res.sendStatus(201);
    } catch (e) {
        console.log(chalk.red.bold("\nAn error occured while trying to register rental."));
        return res.status(500).send(e);
    }
}