import { Console } from '@woowacourse/mission-utils';

import Restaurant from '../models/Restaurant.js';

import InputView from '../views/InputView.js';
import OutputView from '../views/OutputView.js';

class Controller {
    #restaurant;

    constructor() {
        this.#restaurant = new Restaurant();
    }

    async makeUserDate() {
        
            try {
                const inputDate = await InputView.readDate();
                this.#restaurant.enterDate(inputDate);
                
            } catch (error) {
                Console.print(error.message);
            }
        
    }

    async makeUserOrder() {
        
            try {
                const inputOrder = await InputView.readOrder();
                this.#restaurant.enterOrder(inputOrder);
                
            } catch (error) {
                Console.print(error.message);
            }
        
    }

    async run() {
        OutputView.printGreeting();
        await this.makeUserDate();
        await this.makeUserOrder();
        OutputView.printIntroduction(this.#restaurant.makeDateString());
        OutputView.printOrder(this.#restaurant.makeOrderString());
        OutputView.printTotalOrderAmount(this.#restaurant.makeTotalOrderAmountString());
        const eventResult = this.#restaurant.makeEventResultObject();
        OutputView.printGiftMenu(eventResult['증정메뉴']);
        OutputView.printBenefit(eventResult['혜택내역']);
        OutputView.printTotalBenefitAmount(eventResult['총혜택금액']);
        OutputView.printEstimatedPaymentAmount(this.#restaurant.makeEstimatedPaymentAmountString());
        OutputView.printOwnedEventBadge(eventResult['배지']);
    }
}

export default Controller;