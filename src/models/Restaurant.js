import DECEMBER_MENU_PRICE from '../constants/DecemberMenu.js';
import Validation from '../utils/Validation.js'
import Event from './Event.js';

class Restaurant {
    #date;

    #order;

    #eventResult

    #discount; // 샴페인 증정을 제외한 실제 할인 금액

    constructor () {
        this.#eventResult = {
            'totalDiscount' : 0,
            'userGift' : '',
            'userBadge' : '',
            'benefitString' : ''
        };
    }

    #validateDate(inputDate) {
        if (Validation.isWrongDate(inputDate)) {
            throw new Error('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
        }
    }

    #validateItem(inputOrderObj,inputKey) {
        if (Validation.isWrongItem(inputOrderObj,inputKey)) {
            throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
        }
    }

    #validateOrder(inputOrder) {
        if (Validation.isWrongOrder(inputOrder)) {
            throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
        }

        if (Validation.isWrongOrderObj(this.makeOrderObject(inputOrder))) {
            throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
        }
    }
    
    makeOrderObject(inputOrder) {
        const orderArray = inputOrder.split(",");
        let orderObj = {};

        orderArray.forEach(item => {
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
        this.#order = this.makeOrderObject(inputOrder);
        return this.#order;
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

    #enterDiscount() {
        this.#discount = this.#eventResult['totalDiscount'];
        if (this.#eventResult['userGift'] === '샴페인 1개') {
            this.#discount -= DECEMBER_MENU_PRICE['샴페인'];
        }
    }

    #ddayEvent() {
        if (Event.isDday(this.#date)) {
            const discount = Event.dday(this.#date);
            this.#eventResult['totalDiscount'] += discount;
            this.#eventResult['benefitString'] += `크리스마스 디데이 할인: -${discount.toLocaleString()}원\n`;
        }
    }

    #weekEvent() {
        if (!Event.isWeekend(this.#date)) {
            const discount = Event.week(this.#order,'디저트');
            this.#eventResult['totalDiscount'] += discount;
            this.#eventResult['benefitString'] += `평일 할인: -${discount.toLocaleString()}원\n`;
        }
        
        if (Event.isWeekend(this.#date)) {
            const discount = Event.week(this.#order,'메인');
            this.#eventResult['totalDiscount'] += discount;
            this.#eventResult['benefitString'] += `주말 할인: -${discount.toLocaleString()}원\n`;
        }
    }

    #holidayEvent() {
        if (Event.isHoliday(this.#date)) {
            const discount = 1000;
            this.#eventResult['totalDiscount'] += discount;
            this.#eventResult['benefitString'] += `특별 할인: -${discount.toLocaleString()}원\n`;
        }
    }

    #giftEvent() {
        if (this.calculatePurchaseAmount() >= 12000) {
            const discount = DECEMBER_MENU_PRICE['샴페인'];
            this.#eventResult['totalDiscount'] += discount;
            this.#eventResult['benefitString'] += `증정 이벤트: -${discount.toLocaleString()}원\n`;
            this.#eventResult['userGift'] += '샴페인 1개';
        }
    }

    #badgeEvent() {
        this.#eventResult['userBadge'] += Event.badge(this.calculatePurchaseAmount());
    }

    makeOrderString() {
        return (Object.entries(this.#order)
        .map(([key, value]) => `${key} ${value}개`)
        .join('\n'));
    }

    makeTotalOrderAmountString() {
        return (`${this.calculatePurchaseAmount().toLocaleString()}원`);
    }

    makeEstimatedPaymentAmountString() {
        return (`${(this.calculatePurchaseAmount() - this.#discount).toLocaleString()}원`)
    }

    makeEventResultObject() {
        this.#ddayEvent();
        this.#weekEvent();
        this.#holidayEvent();
        this.#giftEvent()
        this.#badgeEvent();

        this.#enterDiscount();

        const eventResultReturn = {'총혜택금액': `-${this.#eventResult['totalDiscount'].toLocaleString()}원`, '증정메뉴': this.#eventResult['userGift'], '배지': this.#eventResult['userBadge'], '혜택내역': this.#eventResult['benefitString']};
        return eventResultReturn;
    }

    makeDateString() {
        return String(this.#date);
    }
}

export default Restaurant;