import { Console } from '@woowacourse/mission-utils';

import Person from '../models/Person.js'

import InputView from '../views/InputView.js';
import OutputView from '../views/OutputView.js'

class Controller {
    #person;


    constructor() {
        this.#person = new Person();
    }

    async makePersonDate() {
        while (true) {
            try {
                this.#person.enterDate(await InputView.readDate());
                break;
            } catch (error) {
                Console.print(error.message);
            }
        }
    }

    async run() {
        OutputView.printGreeting();
        
    }
}

export default Controller;