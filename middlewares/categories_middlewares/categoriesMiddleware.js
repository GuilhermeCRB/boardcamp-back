import { stripHtml } from "string-strip-html";
import Joi from "joi";
import db from "../../database-boardcamp/db.js";

export async function validateCategory(req, res, next) {
    const categoryReceived = req.body;

    const category = { ...categoryReceived, name: stripHtml(categoryReceived.name).result };

    const categorySchema = Joi.object({
        name: Joi.string().required()
    });

    const validation = categorySchema.validate(category);

    if (validation.error && validation.error._original.name === "") {
        return res.status(400).send(validation.error.details[0].message);
    }

    try {
        const categoriesQuery = await db.query("SELECT * FROM categories");
        const categoriesList = categoriesQuery.rows;

        const thereIsCategory = categoriesList.filter(categoryFromDB => categoryFromDB.name.toLowerCase() === category.name.toLowerCase());
        
        if (thereIsCategory.length !== 0) {
            return res.status(409).send("Category already exists!");
        }

        res.locals.category = category;

        next();
    } catch (e) {
        res.status(500).send(e);
        console.log(chalk.red.bold("\nAn error occured while trying to verify if category already exists."));
    }
}