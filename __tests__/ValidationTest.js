import Validation from '../src/utils/Validation.js';

describe('Validation 테스트', () => {
    test('잘못된 날짜일 경우 isWrongDate가 true를 반환한다.', () => {
        expect(Validation.isWrongDate(50)).toBe(true);
    });

    test('잘못된 주문 형식일 경우 isWrongDate가 true를 반환한다.', () => {
        expect(Validation.isWrongOrder('1-타파스')).toBe(true);
    });

    test('중복된 주문일 경우 isWrongItem이 true를 반환한다.', () => {
        expect(Validation.isWrongItem({타파스: 1},'타파스')).toBe(true);
    });

    test('음료만 주문할 경우 checkOnlyDrinkOrder이 true를 반환한다.', () => {
        expect(Validation.checkOnlyDrinkOrder({레드와인: 1})).toBe(true);
    });

    test.each([
        [
          {한강: 1},
          {타파스: 0},
          {샴페인: 1},
          {양송이수프: 11, 타파스: 10}
        ],
      ])(
        "잘못된 주문 객체일 경우 isWrongOrderObj이 true를 반환한다.",
        (object) => {
          expect(Validation.isWrongOrderObj(object)).toBe(true);
        },
      );
});