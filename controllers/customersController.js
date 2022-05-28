import chalk from "chalk";

import db from "../database-boardcamp/db.js";

export async function createCustomer(req, res) {
    const { customer } = res.locals;
    const values = Object.values(customer);

    try {
        await db.query("INSERT INTO customers(name,phone,cpf,birthday) VALUES ($1, $2, $3, $4)", values)
        return res.sendStatus(201);
    } catch (e) {
        console.log(chalk.red.bold("\nAn error occured while trying to register customer."));
        return res.status(500).send(e);
    }
}