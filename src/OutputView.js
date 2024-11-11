import { Console } from "@woowacourse/mission-utils";
import { Utils } from "./utils.js";
import { Model, products } from "./Model.js";

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
  PRINT_RECEIPT: {
    TITLE: `==============W 편의점================\n상품명\t\t수량\t금액`,
    PRODUCT: (productName, quantity, price) => `${productName}\t\t${quantity}\t${price}`,
    PROMOTION: `=============증	정===============`,
    PROMOTION_PRODUCT: (productName, quantity) => `${productName}\t\t${quantity}`,
    DIVIDER: `====================================`,
    TOTAL: (totalQuantity, totalPrice) => `총 구매액\t\t${totalQuantity}\t${totalPrice}`,
    DISCOUNT: (discountPrice) => `행사 할인\t\t\t-${discountPrice}`,
    MEMBERSHIP: (discountPrice) => `멤버십 할인\t\t\t-${discountPrice}`,
    PAY: (payPrice) => `내실돈\t\t\t${payPrice}`,
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

    Object.keys(products).forEach((name) => {
      const promotions = Object.keys(products[name]);

      promotions.forEach((promotion) => {
        Console.print(OUTPUT_MESSAGE.PRINT_PRODUCTS(name, products[name][promotion], promotion));
      });

      if (!promotions.includes("null")) {
        Console.print(
          OUTPUT_MESSAGE.PRINT_PRODUCTS(name, products[name][promotions[0]], products[name]["null"])
        );
      }
    });
  },

  validateInput(inputs) {
    inputs.forEach((input) => {
      if (!Object.keys(products).includes(input[0])) {
        throw new Error(OUTPUT_MESSAGE.ERROR.PREFIX + OUTPUT_MESSAGE.ERROR.INVALID_PRODUCT);
      }

      if (!Number.isInteger(Number(input[1])) || Number(input[1]) <= 0) {
        throw new Error(OUTPUT_MESSAGE.ERROR.PREFIX + OUTPUT_MESSAGE.ERROR.INVAILD_FORMAT);
      }
    });
  },

  validateInputAmount(inputs) {
    inputs.forEach((input) => {
      if (Number(Model.getProductAllAmount(input[0])) < Number(input[1])) {
        throw new Error(OUTPUT_MESSAGE.ERROR.PREFIX + OUTPUT_MESSAGE.ERROR.INVALID_QUANTITY);
      }
    });
  },

  printReceipt(receipt) {
    Console.print(OUTPUT_MESSAGE.PRINT_RECEIPT.TITLE);

    receipt.products.forEach((product) => {
      Console.print(
        OUTPUT_MESSAGE.PRINT_RECEIPT.PRODUCT(product.name, product.quantity, product.price)
      );
    });

    Console.print(OUTPUT_MESSAGE.PRINT_RECEIPT.PROMOTION);
    receipt.promotions.forEach((promotion) => {
      Console.print(
        OUTPUT_MESSAGE.PRINT_RECEIPT.PROMOTION_PRODUCT(promotion.name, promotion.quantity)
      );
    });

    Console.print(OUTPUT_MESSAGE.PRINT_RECEIPT.DIVIDER);
    Console.print(
      OUTPUT_MESSAGE.PRINT_RECEIPT.TOTAL(receipt.totalQuantity, Utils.printPrice(receipt.total))
    );
    Console.print(OUTPUT_MESSAGE.PRINT_RECEIPT.DISCOUNT(Utils.printPrice(receipt.discount)));
    Console.print(OUTPUT_MESSAGE.PRINT_RECEIPT.MEMBERSHIP(Utils.printPrice(receipt.membership)));
    Console.print(OUTPUT_MESSAGE.PRINT_RECEIPT.PAY(Utils.printPrice(receipt.payPrice)));
  },
};
