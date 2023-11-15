import { DECEMBER_MENU_CATEGORY } from "../constants/DecemberMenu.js";

class Event {
  static makeDateObjectDay(date) {
    const dateObject = new Date("2023-12-" + String(date));
    const day = dateObject.getDay();

    return day;
  }

  static isDday(date) {
    if (date > 25) {
      return false;
    }

    return true;
  }

  static isWeekend(date) {
    const day = this.makeDateObjectDay(date);

    if (day === 5 || day === 6) {
      return true;
    }

    return false;
  }

  static isHoliday(date) {
    const day = this.makeDateObjectDay(date);

    if (day === 0 || date === 25) {
      return true;
    }

    return false;
  }

  static dday(date) {
    return 100 * (date - 1) + 1000;
  }

  static week(order, category) {
    let discount = 0;

    for (let key in order) {
      if (DECEMBER_MENU_CATEGORY[key] === category) {
        discount += order[key];
      }
    }

    return discount * 2023;
  }

  static badge(purchaseAmount) {
    if (purchaseAmount >= 20000) {
      return "산타";
    } else if (purchaseAmount >= 10000) {
      return "트리";
    } else if (purchaseAmount >= 5000) {
      return "별";
    }
    return "";
  }
}

export default Event;
