import chalk from "chalk";

import db from "../database-boardcamp/db.js";

export async function getCustomers(req, res) {
    const { cpf } = req.query;

    try {
        const customersQuery = await db.query("SELECT * FROM customers");
        const customersList = customersQuery.rows;

        if(!cpf){
            return res.status(200).send(customersList);
        }

        const pattern = new RegExp(`^${cpf}`);
        const customerFiltered = customersList.filter(customerFromList => customerFromList.cpf.match(pattern));

        return res.status(200).send(customerFiltered);        
    } catch (e) {
        console.log(chalk.red.bold("\nAn error occured while trying to get games."));
        return res.status(500).send(e);
    }
}

export async function getCustomersById(req, res) {
    const { id } = req.params;

    try {
        const customerQuery = await db.query("SELECT * FROM customers WHERE id = $1", [id]);
        const customer = customerQuery.rows;

        return res.status(200).send(customer);        
    } catch (e) {
        console.log(e)
        console.log(chalk.red.bold("\nAn error occured while trying to get customer by the id."));
        return res.status(500).send(e);
    }
}

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