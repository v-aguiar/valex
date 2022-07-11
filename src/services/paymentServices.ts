import * as cardRepository from "../repositories/cardRepository.js";
import * as businessRepository from "../repositories/businessRepository.js";
import * as paymentRepository from "../repositories/paymentRepository.js";

import { PaymentInsertData } from "../repositories/paymentRepository.js";

import cardUtils from "../utils/cardUtils.js";
import paymentUtils from "../utils/paymentUtils.js";
import cardServices from "./cardServices.js";

const paymentServices = {
  insertPayment: async (cardId: number, businessId: number, amount: number, password: string) => {
    const card = await cardRepository.findById(cardId);
    const business = await businessRepository.findById(businessId);

    if (!card) {
      throw {
        name: "notFound",
        message: "⚠ No card found with given ID!",
      };
    }

    if (!business) {
      throw {
        name: "notFound",
        message: "⚠ No business found with given ID!",
      };
    }

    if (card.isBlocked) {
      throw {
        name: "badRequest",
        message: "⚠ This card is blocked!",
      };
    }

    cardUtils.checkPassword(password, card.password);
    cardUtils.checkCardExpiration(card);
    paymentUtils.checkBusinessType(business, card);

    const { balance } = await cardServices.getCardStatement(cardId);
    paymentUtils.checkForEnoughBalance(amount, balance);

    const paymentData: PaymentInsertData = {
      amount,
      cardId,
      businessId,
    };

    await paymentRepository.insert(paymentData);
  },
};

export default paymentServices;
