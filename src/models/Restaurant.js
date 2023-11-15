import DECEMBER_MENU_PRICE from '../constants/DecemberMenu.js';
import Validation from '../utils/Validation.js';

class Restaurant {
    #date;

    #order;

    constructor () {}

    #validateDate(inputDate) {
        if (Validation.date(inputDate)) {
            throw new Error('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
        }
    }

    #validateItem(inputOrderObj,inputKey) {
        if (Validation.item(inputOrderObj,inputKey)) {
            throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
        }
    }

    #validateOrder(inputOrder) {
        if (Validation.order(inputOrder)) {
            throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
        }

        if (Validation.orderObj(this.#makeOrderObject(inputOrder))) {
            throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
        }
    }
    
    #makeOrderObject(inputOrder) {
        const order = inputOrder.split(",");
        let orderObj = {};

        order.forEach(item => {
            let [key, value] = item.split("-");
            this.#validateItem(orderObj, key);
            orderObj[key] = Number(value);
        });

        return orderObj;
    }

    enterDate(inputDate) {
        this.#validateDate(inputDate);
        this.#date = inputDate;
    }

    enterOrder(inputOrder) {
        this.#validateOrder(inputOrder);
        this.#order = this.#makeOrderObject(inputOrder);
    }

    calculatePurchaseAmount() {
        let result = 0;

        for (let key in this.#order) {
            if (key in DECEMBER_MENU_PRICE) {
                result += this.#order[key] * DECEMBER_MENU_PRICE[key];
            }
        }

        return result;
    }
}

export default Restaurant;