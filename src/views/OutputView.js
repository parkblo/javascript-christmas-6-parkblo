import { Console } from '@woowacourse/mission-utils';

const OutputView = {
    printGreeting() {
        Console.print("안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.");
    },

    printIntroduction() {
        Console.print("12월 x일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!");

    },

    printOrder(string) {
        Console.print("<주문 메뉴>");
        Console.print(string);
        Console.print('');
    },

    printTotalOrderAmount(string) {
        Console.print("<할인 전 총주문 금액>");
        Console.print(string);
        Console.print('');
    },

    printGiftMenu(string) {
        Console.print("<증정 메뉴>");
        Console.print(string);
        Console.print('');
    },
    
    printBenefit() {
        Console.print("<혜택 내역>");

    },

    printTotalBenefitAmount() {
        Console.print("<총혜택 금액>");

    },

    printEstimatedPaymentAmount() {
        Console.print("<할인 후 예상 결제 금액>");

    },

    printOwnedEventBadge() {
        Console.print("<12월 이벤트 배지>");

    }
}

export default OutputView;