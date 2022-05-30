import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween.js"
import duration from "dayjs/plugin/duration.js";

export function checkDelay(req, res, next) {
    dayjs.extend(isBetween);
    dayjs.extend(duration);

    const { rental } = res.locals;
    const today = dayjs();
    let delayFee;

    const limitDate = dayjs(rental.rentDate).add(rental.daysRented, "day");
    const isDelayed = !dayjs(today).isBetween(rental.rentDate, limitDate, "days", '[]');

    if (isDelayed) {
        const delay = today.diff(limitDate, "day");
        delayFee = delay * rental.pricePerDay;
    } else {
        delayFee = null;
    }

    res.locals.delayFee = delayFee;
    res.locals.today = today;

    next();
}