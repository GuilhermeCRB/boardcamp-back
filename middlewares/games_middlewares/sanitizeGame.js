import { stripHtml } from "string-strip-html";

export function sanitizeGame(req, res, next){
    const gameReceived = req.body;

    const game = {...gameReceived, 
        name: stripHtml(gameReceived.name).result,
        image: stripHtml(gameReceived.image).result,
    }

    res.locals.game = game;

    next();
}