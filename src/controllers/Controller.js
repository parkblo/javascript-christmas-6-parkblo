import Person from '../models/Person.js'

import InputView from '../views/InputView.js';
import OutputView from '../views/OutputView.js'

class Controller {
    #person;

    constructor() {}

    async run() {
        OutputView.printGreeting();
        
    }
}

export default Controller;