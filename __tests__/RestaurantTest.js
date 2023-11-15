import Restaurant from '../src/models/Restaurant.js';
import { DECEMBER_MENU_PRICE, DECEMBER_MENU_CATEGORY } from '../src/constants/DecemberMenu.js';

describe('Restaurant.js 테스트', () => {
    test('makeOrderObject', () => {
        const R = new Restaurant();
        const result = R.makeOrderObject('가나다-123,라라라-456');
        expect(result).toEqual({'가나다': 123, '라라라': 456});
    });

    test('DECEMBER_MENU_PRICE', () => {
        const result = DECEMBER_MENU_PRICE['샴페인'];
        expect(result).toEqual(25000);
    });

    test('DECEMBER_MENU_CATEGORY', () => {
        const result = DECEMBER_MENU_CATEGORY['샴페인'];
        expect(result).toEqual('음료');
    });

    test('makeEventResultObject', () => {
        let R = new Restaurant();
        R.enterDate("3");
        R.enterOrder("양송이수프-1");
        const result = R.makeEventResultObject();
        expect(result).toEqual({'가나다': 123, '라라라': 456});
    });
});