import { Console } from "@woowacourse/mission-utils";
import { OutputView } from "./OutputView.js";
import { Model } from "./Model.js";

const INPUT_MESSAGE = {
  BUY_PRODUCT: "\n구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])\n",
  PROMOTION_INFO: (productName, get) =>
    `현재 ${productName}은(는) ${get}개를 무료로 더 받을 수 있습니다. 추가하시겠습니까? (Y/N)`,
  NOT_PROMOTION: (productName, n) =>
    `현재 ${productName} ${n}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N)`,
  MEMBERSHIP: "멤버십 할인을 받으시겠습니까? (Y/N)",
  ADDTIONAL_BUY: "감사합니다. 구매하고 싶은 다른 상품이 있나요? (Y/N)",
};

export const InputView = {
  async readItem() {
    const inputs = await Console.readLineAsync(INPUT_MESSAGE.BUY_PRODUCT);

    // [ [ '사이다', '2' ], [ '감자칩', '1' ] ]
    const inputArrays = inputs
      .trim()
      .split(",")
      .map((input) => input.slice(1, -1).split("-"));

    OutputView.validateInput(inputArrays);
    OutputView.validateInputAmount(inputArrays);

    return inputArrays;
  },

  //프로모션 적용 가능 개수 확인
  confirmPromotionCount(inputArrays, products) {
    inputArrays.forEach((input) => {
      const productName = input[0];
      const get = input[1];
      const promotionName = Object.keys(products[productName]).find(
        (promotion) => products[productName][promotion].quantity < get
      );

      if (
        promotionName !== undefined &&
        promotionName !== "null" &&
        Model.isInPromotionDate(promotionName)
      ) {
        //this.readPromotion(productName, get);
      }
    });
  },

  async readPromotion(productName, get) {
    const input = await Console.readLineAsync(INPUT_MESSAGE.PROMOTION_INFO(productName, get));
    return input;
  },

  async readMembership() {
    const input = await Console.readLineAsync(INPUT_MESSAGE.MEMBERSHIP);

    if (input === "Y") {
      return true;
    }
    return false;
  },
};
