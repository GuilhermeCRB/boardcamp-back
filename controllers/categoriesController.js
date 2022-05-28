import chalk from "chalk";

import db from "../database-boardcamp/db.js";

export async function getCategories(req, res) {
    try {
        const categoriesQuery = await db.query("SELECT * FROM categories");
        const categoriesList = categoriesQuery.rows;
        res.status(200).send(categoriesList);
    } catch (e) {
        res.status(500).send(e);
        console.log(chalk.red.bold("\nAn error occured while trying do get categories."));
    }
}

export async function createCategory(req, res) {
    const { category } = res.locals;
    try {
        await db.query("INSERT INTO categories(name) VALUES ($1)", [category.name]);
        res.sendStatus(201);
    } catch (e) {
        res.status(500).send(e);
        console.log(chalk.red.bold("\nAn error occured while trying to create a category."));
    }
}