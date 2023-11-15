import Validation from '../src/utils/Validation.js';

describe('Validation 테스트', () => {
    test('잘못된 날짜일 경우 isWrongDate가 true를 반환한다.', () => {
        expect(Validation.isWrongDate(50)).toBe(true);
    });
});