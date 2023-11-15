import DECEMBER_MENU_CATEGORY from "../constants/DecemberMenu.js";

const Event = {
    makeDateObjectDay(date) {
        const dateObject = new Date('2023-12-' + String(date));
        const day = dateObject.getDay();

        return day;
    },

    isDday(date) {
        if (date > 25) {
            return false;
        }

        return true;
    },

    isWeekend(date) {
        const day = this.#makeDateObjectDay(date);
    
        if (day === 5 || day === 6) {
            return true;
        }

        return false;
    },

    isHoliday(date) {
        const day = this.#makeDateObjectDay(date);
    
        if (day === 0 || date === 25) {
            return true;
        }
        
        return false;
    },

    dday(date) {
        return (100 * (date - 1) + 1000);
    },

    week(order, category) {
        let discount = 0;

        for (let key in order) {
            if (DECEMBER_MENU_CATEGORY[key] === category) {
                discount += order[key];
            }
        }

        return (discount * 2023);
    },

    gift(purchaseAmount) {
        // 샴페인 1개 증정
        return 25000;
    },

    badge(purchaseAmount) {
        if (purchaseAmount >= 20000) {
            return 'santa';
        }
        else if (purchaseAmount >= 10000) {
            return 'tree';
        }
        else if (purchaseAmount >= 5000) {
            return 'star';
        }
        return '';
    }
}

export default Event;