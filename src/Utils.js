import { DateTimes } from "@woowacourse/mission-utils";

export const Utils = {
  printPrice(price) {
    return String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },

  nowDate() {
    const times = DateTimes.now();

    return `${times.getFullYear()}-${times.getMonth()}-${times.getDate()}`;
  },
};
