import chalk from "chalk";
import Joi from "joi";

import db from "../../database-boardcamp/db.js";

export async function validateGame(req, res, next) {
    const { game } = res.locals;

    const gameSchema = Joi.object({
        name: Joi.string().required(),
        image: Joi.string().pattern(new RegExp('https?:\/\/')).required(),
        stockTotal: Joi.number().min(1).required(),
        categoryId: Joi.number().required(),
        pricePerDay: Joi.number().min(1).required()
    });

    const validation = gameSchema.validate(game);

    if (validation.error) {
        return res.status(400).send(validation.error.details[0].message);
    }
    
    try {
        const gamesCategoryQuery = await db.query("SELECT * FROM categories");
        const gamesCategoryList = gamesCategoryQuery.rows;

        const thereIsCategoryId = gamesCategoryList.filter(category => category.id === game.categoryId);

        if (thereIsCategoryId.length === 0) {
            return res.status(400).send("Category ID does not exists!");
        }

    } catch (e) {
        console.log(chalk.red.bold("\nAn error occured while trying to verify if category id exists."));
        return res.status(500).send(e);
    }

    try {
        const gamesQuery = await db.query("SELECT * FROM games");
        const gamesList = gamesQuery.rows;

        const thereIsGame = gamesList.filter(gameFromDB => gameFromDB.name.toLowerCase() === game.name.toLowerCase());

        if (thereIsGame.length !== 0) {
            return res.status(409).send("Game's name already registered!");
        }

        next();
    } catch (e) {
        console.log(chalk.red.bold("\nAn error occured while trying to verify if the game's name is already registered."));
        return res.status(500).send(e);
    }
}