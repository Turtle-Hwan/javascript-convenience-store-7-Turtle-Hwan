import fs from "fs";
import { Utils } from "./utils.js";

export class ReadFile {
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
  }

  readPromotions() {
    const promotionsFile = fs.readFileSync("./public/promotions.md", "utf-8");
    const promotionsArray = promotionsFile.trim().split("\r\n");

    promotionsArray.slice(1).forEach((promotion) => {
      const row = promotion.split(",");

      promotions[row[0]] = {
        buy: row[1],
        get: row[2],
        start_date: row[3],
        end_date: row[4],
      };
    });
  }
}

export const Model = {
  isInPromotionDate(promotionName) {
    if (
      promotions[promotionName].start_date <= Utils.nowDate() &&
      Utils.nowDate() <= promotions[promotionName].end_date
    ) {
      return true;
    }
    return false;
  },

  getProductAllAmount(productName) {
    console.log(
      Object.keys(products[productName]).reduce((acc, promotion) => {
        acc += Number(products[productName][promotion].quantity);
        return acc;
      }, 0)
    );
    return Number(
      Object.keys(products[productName]).reduce((acc, promotion) => {
        acc += products[productName][promotion].quantity;
        return acc;
      }, 0)
    );
  },
};

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

export const promotions = {
  // "탄산2+1": {
  //   buy: 2,
  //   get: 1,
  //   start_date: "2024-01-01",
  //   end_date: "2024-12-31",
  // }
};
