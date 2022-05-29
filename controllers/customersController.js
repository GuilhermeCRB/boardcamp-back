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

export async function updateCustomer(req, res) {
    const { id } = req.params;
    const { customer } = res.locals;
    const values = Object.values(customer);

    try {
        await db.query(`
            UPDATE customers SET
                name = $1,
                phone = $2,
                cpf = $3,
                birthday = $4
            WHERE id = $5;
        `, [...values, id])
        return res.sendStatus(200);
    } catch (e) {
        console.log(chalk.red.bold("\nAn error occured while trying to update customer."));
        return res.status(500).send(e);
    }
}