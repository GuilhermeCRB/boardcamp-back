import express, { json } from "express";
import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(json());
app.use(cors());

app.use(categoriesRouter);
app.use(gamesRouter);
app.use(costumersRouter);
app.use(rentalsRouter);


const port = process.env.PORT || 4000;
app.listen(port, () => console.log(chalk.white.bold.bgGreenBright(`\n Application is running on port ${port}... \n`)));