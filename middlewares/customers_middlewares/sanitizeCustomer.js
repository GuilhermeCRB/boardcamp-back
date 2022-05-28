import { stripHtml } from "string-strip-html";

export function sanitizeCustomer(req, res, next){
    const customerReceived = req.body;

    const customer = {...customerReceived, 
        name: stripHtml(customerReceived.name).result,
        phone: stripHtml(customerReceived.phone).result,
        cpf: stripHtml(customerReceived.cpf).result,
        birthday: stripHtml(customerReceived.birthday).result
    }

    res.locals.customer = customer;

    next();
}