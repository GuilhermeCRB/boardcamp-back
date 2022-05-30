export function validateRentalStatus(req, res, next) {
    const { returnDate } = res.locals.rental;

    if(returnDate){
        return res.status(400).send("Rental already returned.");
    }

    next();
}