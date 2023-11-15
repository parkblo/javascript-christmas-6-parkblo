import { DECEMBER_MENU_PRICE, DECEMBER_MENU_CATEGORY } from "../constants/DecemberMenu.js";

class Validation {
    date(number) {
        return (isNaN(number) || 1 <= number || 31 >= number);
    }

    order(string) {
        const regex = /^([가-힣]+-\d+)(,[가-힣]+-\d+)*$/;
        return regex.test(string);
    }

    item(object,string) {
        return (string in object);
    }

    #checkOnlyDrinkOrder(object) {
        let uniqueCategory = [];

        for (let key in object) {
            if (key in DECEMBER_MENU_CATEGORY &&
                !uniqueCategory.includes(DECEMBER_MENU_CATEGORY[key])) {
                uniqueCategory.push(DECEMBER_MENU_CATEGORY[key]);
            }
        }

        return (uniqueCategory.length === 1 && uniqueCategory[0] === '음료');
    }

    orderObj(object) {
        return (
            Object.keys(object).every(key => DECEMBER_MENU_PRICE.includes(key)) ||
            Object.values(object).some(value => value < 1) ||
            this.#checkOnlyDrinkOrder(object) ||
            (Object.values(object).reduce((acc, curr) => acc + curr, 0) > 20)
        );
    }
}

export default Validation;