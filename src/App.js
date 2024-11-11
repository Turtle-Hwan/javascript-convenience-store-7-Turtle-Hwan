import { InputView } from "./InputView.js";
import { OutputView } from "./OutputView.js";
import { products, ReadFile } from "./Model.js";

class App {
  async run() {
    // - [ ] 현재 보유 상품 파일에서 읽어오기
    const readFile = new ReadFile();
    readFile.readProducts();
    // - [ ] 프로모션 상품 파일에서 읽어오기
    readFile.readPromotions();
    // - [ ] 현재 보유 상품 목록 화면에 출력하기
    OutputView.printProducts(products);
    // - [ ] 구매할 상품명과 수량 입력받기
    const inputArrays = await InputView.readItem();

    // - [ ] if 프로모션 적용이 가능한 상품에 대해 고객이 해당 수량만큼 가져오지 않았을 경우 :
    //       무료 혜택 추가 여부(Y/N) 입력받기
    InputView.confirmPromotionCount(inputArrays, products);

    // - [ ] if 프로모션 할인 적용 안됨 :
    //       프로모션 적용 안됨 안내 출력 및 구매 의사(Y/N) 입력받기

    // - [ ] 멤버십 할인 여부(Y/N) 입력받기
    const isMembership = await InputView.readMembership();

    // - [ ] 총 금액, 구매액, 할인액, 내실 돈 계산하고 출력하기
    //   - [ ] 구매 상품 / 수량 / 금액
    //   - [ ] 증정 상품 / 수량 /
    //   - [ ] 총 구매액 / 수량 / 금액
    //   - [ ] 행사 할인 / / 금액
    //   - [ ] 멤버십 할인 / / 금액
    //   - [ ] 내실 돈 / / 금액
    const receipt = this.calcReceipt(inputArrays, isMembership);
    OutputView.printReceipt(receipt);

    // - [ ] 구매하고 싶은 다른 상품 여부 입력받기
    //   - [ ] if Y : 반복
    //   - [ ] if N : 프로그램 종료
  }

  calcReceipt(inputArrays, isMembership) {
    const receipt = {
      products: [],
      promotions: [],
      total: 0,
      totalQuantity: 0,
      discount: 0,
      membership: 0,
      payPrice: 0,
    };

    inputArrays.forEach((input) => {
      const productName = input[0];
      const quantity = input[1];

      const promotionName = Object.keys(products[productName]).find(
        (promotion) => products[productName][promotion].quantity < quantity
      );

      if (promotionName !== undefined && promotionName !== "null") {
        receipt.promotions.push({
          name: productName,
          quantity: quantity,
          price: products[productName][promotionName].price,
        });
      } else {
        receipt.products.push({
          name: productName,
          quantity: quantity,
          price: products[productName]["null"].price,
        });
      }
    });

    receipt.total = receipt.products.reduce((acc, product) => {
      acc += product.price * product.quantity;
      return acc;
    }, 0);

    receipt.totalQuantity = receipt.products.reduce((acc, product) => {
      acc += product.quantity;
      return acc;
    }, 0);

    if (isMembership) {
      receipt.membership = (receipt.total - receipt.discount) * 0.3;
    }

    receipt.payPrice = receipt.total - receipt.discount - receipt.membership;

    return receipt;
  }
}

// const receipt = {
// products: [
//   { name: "사이다", quantity: 2, price: 2000 },
//   { name: "감자칩", quantity: 1, price: 1000 },
// ],
// promotions: [
//   { name: "사이다", quantity: 1, price: 1000 },
// ],
// };

export default App;
