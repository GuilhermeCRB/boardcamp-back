import chalk from "chalk";
import Joi from "joi";

import db from "../../database-boardcamp/db.js";

export async function validateCustomer(req, res, next) {
    const { customer } = res.locals;

    const customerSchema = Joi.object({
        name: Joi.string().required(),
        phone: Joi.string().pattern(new RegExp('^[0-9]{10,11}$')).required(),
        cpf: Joi.string().pattern(new RegExp('^[0-9]{11}$')).required(),
        birthday: Joi.date().iso()
    });

    const validation = customerSchema.validate(customer);

    if (validation.error) {
        return res.status(400).send(validation.error.details[0].message);
    }
    
    try {
        const customerQuery = await db.query("SELECT * FROM customers");
        const customerList = customerQuery.rows;

        const thereIsCPF = customerList.filter(customerFromList => customerFromList.cpf === customer.cpf);

        if (thereIsCPF.length !== 0) {
            return res.status(409).send("CPF already registered!");
        }

        next();
    } catch (e) {
        console.log(chalk.red.bold("\nAn error occured while trying to verify if CPF is already registered."));
        return res.status(500).send(e);
    }
}