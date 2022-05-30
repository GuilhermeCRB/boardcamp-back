import Joi from "joi";

export async function validateRental(req, res, next) {
    const rental = req.body;

    const rentalSchema = Joi.object({
        customerId: Joi.number().required(),
        gameId: Joi.number().required(),
        daysRented: Joi.number().min(1).required(),
    });

    const validation = rentalSchema.validate(rental);

    if (validation.error) {
        return res.status(400).send(validation.error.details[0].message);
    }
    
    next();
}