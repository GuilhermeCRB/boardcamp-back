import chalk from "chalk";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween.js"
import duration from "dayjs/plugin/duration.js";

import db from "../../database-boardcamp/db.js";

export async function checkDelay(req, res, next) {
    dayjs.extend(isBetween);
    dayjs.extend(duration);

    const { id } = req.params;
    const today = dayjs();
    let delayFee;

    try {
        const rentalQuery = await db.query(`
            SELECT rentals.*, games."pricePerDay" FROM rentals
            JOIN games ON rentals."gameId" = games.id
            WHERE rentals.id = $1
        `, [id]);

        const rental = rentalQuery.rows[0];
        const limitDate = dayjs(rental.rentDate).add(rental.daysRented, "day");
        const isDelayed = !dayjs(today).isBetween(rental.rentDate, limitDate, "days", '[]');

        if (isDelayed) {
            const delay = today.diff(limitDate, "day");
            delayFee = delay * rental.pricePerDay;
        }else{
            delayFee = null;
        }

        res.locals.delayFee = delayFee;
        res.locals.today = today;

        next();
    } catch (e) {
        console.log(chalk.red.bold("\nAn error occured while trying to verify rental delay."));
        return res.status(500).send(e);
    }
}