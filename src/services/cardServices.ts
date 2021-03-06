import * as employeeRepository from "../repositories/employeeRepository.js";
import * as cardRepository from "../repositories/cardRepository.js";
import * as paymentRepository from "../repositories/paymentRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";

import { TransactionTypes, CardInsertData } from "../repositories/cardRepository.js";

import cardUtils from "../utils/cardUtils.js";

export interface CreateCardReturn {
  cardId: number;
  cardNumber: string;
  securityCode: number;
  expirationDate: string;
}

export interface InsertDatabaseResponse {
  id: number;
}

const cardServices = {
  createCard: async (employeeId: number, cardType: TransactionTypes): Promise<CreateCardReturn> => {
    const employee = await employeeRepository.findById(employeeId);
    if (!employee) {
      throw {
        name: "notFound",
        message: "⚠ No employee found with given id...",
      };
    }

    const card = await cardRepository.findByTypeAndEmployeeId(cardType, employeeId);
    if (card) {
      throw {
        name: "alreadyExists",
        message: "⚠ This type of card already exists for this employee...",
      };
    }

    const cardholderName = cardUtils.generateCardholderName(employee.fullName);
    const cardNumber = cardUtils.generateCardNumber({ isVirtual: false });
    const { databaseCvv: securityCode, cvv } = cardUtils.generateCardCVV();
    const expirationDate = cardUtils.generateExpirationDate();

    const newCardData: CardInsertData = {
      employeeId,
      cardholderName,
      securityCode,
      expirationDate,
      isVirtual: false,
      isBlocked: true,
      number: cardNumber,
      type: cardType,
    };

    const insertResponse = await cardRepository.insert(newCardData);
    const { id: cardId }: InsertDatabaseResponse = insertResponse.rows[0];

    return { cardId, cardNumber, expirationDate, securityCode: Number(cvv) };
  },

  createVirtualCard: async (cardId: number, password: string): Promise<CreateCardReturn> => {
    const card = await cardRepository.findById(cardId);
    if (!card) {
      throw {
        name: "notFound",
        message: "⚠ No card found with given id...",
      };
    }

    if (card.isVirtual) {
      throw {
        name: "alreadyExists",
        message: "⚠ This card is already virtual...",
      };
    }

    cardUtils.checkPassword(password, card.password);
    const virtualPassword = cardUtils.hashPassword(password);
    const { cvv, databaseCvv } = cardUtils.generateCardCVV();
    const virtualNumber = cardUtils.generateCardNumber({ isVirtual: true });
    const virtualExpirationDate = cardUtils.generateExpirationDate();

    const virtualCardData: CardInsertData = {
      employeeId: card.employeeId,
      cardholderName: card.cardholderName,
      securityCode: databaseCvv,
      password: virtualPassword,
      expirationDate: virtualExpirationDate,
      isVirtual: true,
      isBlocked: true,
      number: virtualNumber,
      type: card.type,
    };

    const insertResponse = await cardRepository.insert(virtualCardData);
    const { id: virtualCardId }: InsertDatabaseResponse = insertResponse.rows[0];

    return {
      cardId: virtualCardId,
      cardNumber: virtualNumber,
      expirationDate: virtualExpirationDate,
      securityCode: Number(cvv),
    };
  },

  activateCard: async (cardId: number, password: string, securityCode: number) => {
    const card: cardRepository.Card = await cardRepository.findById(cardId);
    if (!card) {
      throw {
        name: "notFound",
        message: "⚠ No card found with given ID!",
      };
    }

    if (card.password !== null) {
      throw {
        name: "badRequest",
        message: "⚠ This card is already activated!",
      };
    }

    cardUtils.checkSecurityCode(securityCode, card.securityCode);
    cardUtils.checkCardExpiration(card);

    const hashedPassword = cardUtils.hashPassword(password);

    const activateCardData = {
      isBlocked: false,
      password: hashedPassword,
    };

    await cardRepository.update(cardId, activateCardData);
  },

  getCardStatement: async (cardId: number) => {
    const card: cardRepository.Card = await cardRepository.findById(cardId);
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

    const transactions = await paymentRepository.findByCardId(cardId);
    const recharges = await rechargeRepository.findByCardId(cardId);
    const balance = cardUtils.getCardBalance(transactions, recharges);

    const statement = {
      balance,
      transactions,
      recharges,
    };
    return statement;
  },

  blockCard: async (cardId: number, password: string) => {
    const card: cardRepository.Card = await cardRepository.findById(cardId);
    if (!card) {
      throw {
        name: "notFound",
        message: "⚠ No card found with given ID!",
      };
    }

    if (card.isBlocked) {
      throw {
        name: "badRequest",
        message: "⚠ This card is already blocked!",
      };
    }

    cardUtils.checkCardExpiration(card);
    cardUtils.checkPassword(password, card.password);

    const blockCardData = {
      isBlocked: true,
    };

    await cardRepository.update(cardId, blockCardData);
  },

  unblockCard: async (cardId: number, password: string) => {
    const card: cardRepository.Card = await cardRepository.findById(cardId);
    if (!card) {
      throw {
        name: "notFound",
        message: "⚠ No card found with given ID!",
      };
    }

    if (!card.isBlocked) {
      throw {
        name: "badRequest",
        message: "⚠ This card is already unblocked!",
      };
    }

    cardUtils.checkCardExpiration(card);
    cardUtils.checkPassword(password, card.password);

    const unblockCardData = {
      isBlocked: false,
    };

    await cardRepository.update(cardId, unblockCardData);
  },
};

export default cardServices;
