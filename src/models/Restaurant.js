import DECEMBER_MENU_PRICE from '../constants/DecemberMenu.js';
import Validation from '../utils/Validation.js';
import Event from './Event.js';

class Restaurant {
    #date;

    #order;

    #discount; // 샴페인 증정을 제외한 실제 할인 금액

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

    #enterDiscount(inputDiscount,userGift) {
        this.#discount = inputDiscount;
        if (userGift === '샴페인 1개') {
            this.#discount -= DECEMBER_MENU_PRICE['샴페인'];
        }
    }

    #ddayEvent(totalDiscount,benefitString) {
        if (Event.isDday(this.#date)) {
            const discount = Event.dday(this.#date);
            totalDiscount += discount;
            benefitString += `크리스마스 디데이 할인: -${discount.toLocaleString()}원\n`;
        }
    }

    #weekEvent(totalDiscount, benefitString) {
        if (!Event.isWeekend(this.#date)) {
            const discount = Event.week(order,'디저트');
            totalDiscount += discount;
            benefitString += `평일 할인: -${discount.toLocaleString()}원\n`;
        }
        
        if (Event.isWeekend(this.#date)) {
            const discount = Event.week(order,'메인');
            totalDiscount += discount;
            benefitString += `주말 할인: -${discount.toLocaleString()}원\n`;
        }
    }

    #holidayEvent(totalDiscount, benefitString) {
        if (Event.isHoliday(this.#date)) {
            const discount = 1000;
            totalDiscount += discount;
            benefitString += `특별 할인: -${discount.toLocaleString()}원\n`;
        }
    }

    #giftEvent(totalDiscount,benefitString,userGift) {
        if (this.calculatePurchaseAmount() >= 12000) {
            const discount = DECEMBER_MENU_PRICE['샴페인'];
            totalDiscount += discount;
            benefitString += `증정 이벤트: -${discount.toLocaleString()}원\n`;
            userGift += '샴페인 1개';
        }
    }

    #badgeEvent(userBadge) {
        userBadge += Event.badge(this.calculatePurchaseAmount());
    }

    runEvent() {
        let totalDiscount = 0;
        let userGift = '';
        let userBadge = '';
        let benefitString = '';

        this.#ddayEvent(totalDiscount,benefitString);
        this.#weekEvent(totalDiscount,benefitString);
        this.#holidayEvent(totalDiscount,benefitString);
        this.#giftEvent(totalDiscount,benefitString,userGift)
        this.#badgeEvent(userBadge);

        this.#enterDiscount(totalDiscount,userGift);

        return ([totalDiscount, userGift, userBadge, benefitString]);
    }
}

export default Restaurant;