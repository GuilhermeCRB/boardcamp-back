import chalk from "chalk";

import db from "../../database-boardcamp/db.js";

export async function validateCustomerID(req, res, next) {
    const { customerId } = req.body;
    
    try {
        const customerIdQuery = await db.query("SELECT * FROM customers WHERE id = $1", [customerId]);
        const customer = customerIdQuery.rows;

        if (customer.length === 0) {
            return res.status(400).send("Customer does not exists!");
        }
        
        next();
    } catch (e) {
        console.log(chalk.red.bold("\nAn error occured while trying to verify if customer id exists."));
        return res.status(500).send(e);
    }
}