import Restaurant from "../src/models/Restaurant.js";

describe("Restaurant.js 테스트", () => {
  test("makeOrderObject 정상 작동 확인", () => {
    const R = new Restaurant();
    const result = R.makeOrderObject("가나다-123,라라라-456");
    expect(result).toEqual({ 가나다: 123, 라라라: 456 });
  });

  test("enterDate 정상 작동 확인", () => {
    const R = new Restaurant();
    R.enterDate("12");
    expect(R.makeDateString()).toEqual("12");
  });

  test.each([[0, 32, "a"]])(
    "enterDate는 1이상 31이하의 숫자가 아닌 경우 예외 처리한다.",
    (date) => {
      expect(() => {
        const R = new Restaurant();
        R.enterDate(date);
      }).toThrow("[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.");
    },
  );

  test("enterOrder 정상 작동 확인", () => {
    const R = new Restaurant();
    expect(R.enterOrder("양송이수프-1,타파스-5")).toEqual({
      양송이수프: 1,
      타파스: 5,
    });
  });

  test.each([
    [
      "가나다-123",
      "양송이수프-0",
      "12-타파스",
      "양송이수프-1,양송이수프-2",
      "샴페인-1",
      "양송이수프-21",
    ],
  ])(
    "enterOrder는 입력 조건과 맞지 않을 경우 예외 처리한다.",
    (order) => {
      expect(() => {
        const R = new Restaurant();
        R.enterOrder(order);
      }).toThrow("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
    },
  );

  test("calculatePurchaseAmount 정상 작동 확인", () => {
    const R = new Restaurant();
    R.enterOrder("양송이수프-1,타파스-1");
    const Result = R.calculatePurchaseAmount();
    expect(Result).toEqual(11500);
  });
  
});
