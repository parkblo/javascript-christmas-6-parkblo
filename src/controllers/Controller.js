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
        while (true) {
            try {
                this.#restaurant.enterDate(await InputView.readDate());
                break;
            } catch (error) {
                Console.print(error.message);
            }
        }
    }

    async makeUserOrder() {
        while (true) {
            try {
                this.#restaurant.enterOrder(await InputView.readOrder());
                break;
            } catch (error) {
                Console.print(error.message);
            }
        }
    }

    async run() {
        OutputView.printGreeting();
        await this.makeUserDate();
        await this.makeUserOrder();
        OutputView.printIntroduction();
        OutputView.printOrder(Restaurant.makeOrderString());
        OutputView.printTotalOrderAmount(Restaurant.makeTotalOrderAmountString());
        const eventResult = Restaurant.makeEventResultObject();
        OutputView.printGiftMenu(eventResult['증정메뉴']);
        OutputView.printBenefit(eventResult['혜택내역']);
        OutputView.printTotalBenefitAmount(eventResult['총혜택금액']);
        OutputView.printEstimatedPaymentAmount(Restaurant.makeEstimatedPaymentAmountString());
    }
}

export default Controller;