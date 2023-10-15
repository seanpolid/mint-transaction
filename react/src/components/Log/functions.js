
/**
 * Compares two dates and returns the value necessary to sort in 
 * either ascending or descending order
 * @param {*} date1 
 * @param {*} date2 
 * @param {*} ascending 
 * @returns 
 */
const compareDate = (date1, date2) => {
    date1 = new Date(date1);
    date2 = new Date(date2);

    if (date1 < date2) {
        return -1;
    } else if (date1 === date2) {
        return 0;
    } else {
        return 1;
    }
}

const compareString = (string1, string2) => {
    string1 = string1.toLowerCase();
    string2 = string2.toLowerCase();
    
    if (string1 < string2) {
        return -1;
    } else if (string1 === string2) {
        return 0;
    } else {
        return 1;
    }
}

const compareAmount = (amount1, amount2) => {
    amount1 = Number.parseFloat(amount1.substring(1));
    amount2 = Number.parseFloat(amount2.substring(1));

    return amount1 - amount2;
}

export { compareDate, compareString, compareAmount }