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


// export async function getCustomers(req, res) {
//     const { cpf } = req.query;

//     try {
//         const customersQuery = await db.query("SELECT * FROM customers");
//         const customersList = customersQuery.rows;

//         if(!cpf){
//             return res.status(200).send(customersList);
//         }

//         const pattern = new RegExp(`^${cpf}`);
//         const customerFiltered = customersList.filter(customerFromList => customerFromList.cpf.match(pattern));

//         return res.status(200).send(customerFiltered);        
//     } catch (e) {
//         console.log(chalk.red.bold("\nAn error occured while trying to get games."));
//         return res.status(500).send(e);
//     }
// }

// export async function getCustomersById(req, res) {
//     const { id } = req.params;

//     try {
//         const customerQuery = await db.query("SELECT * FROM customers WHERE id = $1", [id]);
//         const customer = customerQuery.rows;

//         if(customer.length === 0){
//             return res.sendStatus(404);
//         }

//         return res.status(200).send(customer);        
//     } catch (e) {
//         console.log(e)
//         console.log(chalk.red.bold("\nAn error occured while trying to get customer by the id."));
//         return res.status(500).send(e);
//     }
// }


// export async function updateCustomer(req, res) {
//     const { id } = req.params;
//     const { customer } = res.locals;
//     const values = Object.values(customer);

//     try {
//         await db.query(`
//             UPDATE customers SET
//                 name = $1,
//                 phone = $2,
//                 cpf = $3,
//                 birthday = $4
//             WHERE id = $5;
//         `, [...values, id])
//         return res.sendStatus(200);
//     } catch (e) {
//         console.log(chalk.red.bold("\nAn error occured while trying to update customer."));
//         return res.status(500).send(e);
//     }
// }