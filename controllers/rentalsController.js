import chalk from "chalk";
import dayjs from "dayjs";
import { parse } from "dotenv";

import db from "../database-boardcamp/db.js";

export async function getRentals(req, res) {
    const { customerId, gameId } = req.query;
    const customerIdQuery = parseInt(customerId);
    const gameIdQuery = parseInt(gameId);

    try {
        const rentalsQuery = await db.query(`
            SELECT rentals.*, customers.name AS "customerName", games."categoryId",
                games.name AS "gameName", categories.name AS "categoryName"
            FROM rentals
            JOIN customers ON rentals."customerId" = customers.id
            JOIN games ON rentals."gameId" = games.id
            JOIN categories ON games."categoryId" = categories.id
        `);

        let rentalsList = rentalsQuery.rows.map(rental => {
            const { id, customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee, customerName, gameName, categoryId, categoryName } = rental;
            const formattedRental = {
                id,
                customerId,
                gameId,
                rentDate,
                daysRented,
                returnDate,
                originalPrice,
                delayFee,
                customer: {
                    id: customerId,
                    name: customerName
                },
                game: {
                    id: gameId,
                    name: gameName,
                    categoryId,
                    categoryName
                }
            }

            
            return formattedRental;
        });

        
        if(customerIdQuery){
            rentalsList = rentalsList.filter(rental => rental.customerId === customerIdQuery);
        }

        if(gameIdQuery){
            rentalsList = rentalsList.filter(rental => rental.gameId === gameIdQuery);
        }

        return res.status(200).send(rentalsList);
    } catch (e) {
        console.log(chalk.red.bold("\nAn error occured while trying to get rentals."));
        return res.status(500).send(e);
    }
}

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