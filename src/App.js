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
    await InputView.readItem();

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

export default App;
