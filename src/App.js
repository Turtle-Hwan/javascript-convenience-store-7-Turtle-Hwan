class App {
  async run() {
    // - [ ] 현재 보유 상품 파일에서 읽어오기
    const readFile = new ReadFile();
    readFile.readProducts();
    // - [ ] 프로모션 상품 파일에서 읽어오기
    readFile.readPromotions();

    // - [ ] 현재 보유 상품 목록 화면에 출력하기
    // - [ ] 구매할 상품명과 수량 입력받기
    // - [ ] if 프로모션 할인 적용 안됨 :
    //       프로모션 적용 안됨 안내 출력 및 구매 의사(Y/N) 입력받기
    // - [ ] 멤버십 할인 여부(Y/N) 입력받기
    // - [ ] 총 금액, 구매액, 할인액, 내실 돈 계산하고 출력하기
    //   - [ ] 구매 상품 / 수량 / 금액
    //   - [ ] 증정 상품 / 수량 /
    //   - [ ] 총 구매액 / 수량 / 금액
    //   - [ ] 행사 할인 / / 금액
    //   - [ ] 멤버십 할인 / / 금액
    //   - [ ] 내실 돈 / / 금액
    // - [ ] 구매하고 싶은 다른 상품 여부 입력받기
    //   - [ ] if Y : 반복
    //   - [ ] if N : 프로그램 종료
  }
}

import fs from "fs";

class ReadFile {
  readProducts() {
    const productsFile = fs.readFileSync("./public/products.md", "utf-8");
    const productsArray = productsFile.trim().split("\r\n");

    productsArray.slice(1).forEach((product) => {
      const row = product.split(",");

      if (products[row[0]] === undefined) {
        products[row[0]] = {};
      }

      products[row[0]][row[3]] = {
        price: row[1],
        quantity: row[2],
      };
    });
    console.log(products);
  }

  readPromotions() {
    const promotionsFile = fs.readFileSync("./public/promotions.md", "utf-8");
    const promotionsArray = promotionsFile.trim().split("\r\n");
    console.log(promotionsArray);
  }
}

export const products = {
  // 콜라: {
  //   "탄산2+1": {
  //     price: 1000,
  //     quantity: 10,
  //   },
  //   nonPromotion: {
  //     price: 1000,
  //     quantity: 10,
  //   },
  // },
};

export const promotions = {};

export default App;
