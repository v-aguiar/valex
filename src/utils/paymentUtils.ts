import { Business } from "../repositories/businessRepository.js";
import { Card } from "../repositories/cardRepository.js";

const paymentUtils = {
  checkBusinessType: (business: Business, card: Card) => {
    if (business.type !== card.type) {
      throw {
        name: "badRequest",
        message: "⚠ This card is not valid for this kind of business!",
      };
    }
  },

  checkForEnoughBalance: (amount: number, balance: number) => {
    if (balance < amount) {
      throw {
        name: "badRequest",
        message: "⚠ Not enough balance!",
      };
    }
  },
};

export default paymentUtils;
