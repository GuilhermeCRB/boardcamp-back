import chalk from "chalk";

import db from "../database-boardcamp/db.js";

export async function getCategories(req, res) {
    try {
        const categoriesQuery = await db.query("SELECT * FROM categories");
        const categoriesList = categoriesQuery.rows;
        return res.status(200).send(categoriesList);
    } catch (e) {
        console.log(chalk.red.bold("\nAn error occured while trying to get categories.")); 
        return res.status(500).send(e);
    }
}

export async function createCategory(req, res) {
    const { category } = res.locals;
    try {
        await db.query("INSERT INTO categories(name) VALUES ($1)", [category.name]);
        return res.sendStatus(201);
    } catch (e) {
        console.log(chalk.red.bold("\nAn error occured while trying to create a category."));
        return res.status(500).send(e);
    }
}