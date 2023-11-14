import Validation from '../utils/Validation.js'

class Person {
    #date;

    #menu;

    constructor () {}

    #validateDate(inputDate) {
        if (Validation.date(inputDate)) {
            throw new Error('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.')
        }
    }

    enterDate(inputDate) {
        this.#validateDate(inputDate);
        this.#date = inputDate;
    }
}

export default Person;