import {Console} from "@woowacourse/mission-utils";
import {Utils} from "./utils.js";

const OUTPUT_MESSAGE = Object.freeze({
  PRINT_PRODUCTS_INFO: "안녕하세요. W편의점입니다.\n현재 보유하고 있는 상품입니다.\n",
  PRINT_PRODUCTS: (productName, info, promotion) => {
    // 재고 없음
    if (promotion === undefined) {
      return `- ${productName} ${Utils.printPrice(info.price)}원 재고 없음`;
    }
    //기본 재고
    if (promotion === "null") {
      return `- ${productName} ${Utils.printPrice(info.price)}원 ${info.quantity}개`;
    }
    return `- ${productName} ${Utils.printPrice(info.price)}원 ${info.quantity}개 ${promotion}`;
  },
  ERROR: {
    PREFIX: `[ERROR] `,
    INVAILD_FORMAT: `올바르지 않은 형식으로 입력했습니다. 다시 입력해 주세요.`,
    INVALID_PRODUCT: `존재하지 않는 상품입니다. 다시 입력해 주세요.`,
    INVALID_QUANTITY: `재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.`,
    INVALID_INPUT: `잘못된 입력입니다. 다시 입력해 주세요.`,
  },
});

export const OutputView = {
  printProducts(products) {
    Console.print(OUTPUT_MESSAGE.PRINT_PRODUCTS_INFO);

    Object.keys(products).forEach(name => {
      const promotions = Object.keys(products[name]);

      promotions.forEach(promotion => {
        Console.print(OUTPUT_MESSAGE.PRINT_PRODUCTS(name, products[name][promotion], promotion));
      });

      if (!promotions.includes("null")) {
        Console.print(
          OUTPUT_MESSAGE.PRINT_PRODUCTS(name, products[name][promotions[0]], products[name]["null"])
        );
      }
    });
  },
};
