import * as cardRepository from "../repositories/cardRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";

import { RechargeInsertData } from "../repositories/rechargeRepository.js";

import cardUtils from "../utils/cardUtils.js";

const rechargeService = {
  async recharge(cardId: number, amount: number) {
    const card = await cardRepository.findById(cardId);
    if (!card) {
      throw {
        name: "notFound",
        message: "⚠ No card found with given ID!",
      };
    }

    if (card.isBlocked) {
      throw {
        name: "badRequest",
        message: "⚠ This card is blocked!",
      };
    }

    cardUtils.checkCardExpiration(card);

    const rechargeData: RechargeInsertData = {
      amount,
      cardId,
    };

    await rechargeRepository.insert(rechargeData);
  },
};

export default rechargeService;
