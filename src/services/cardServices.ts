import * as employeeRepository from "../repositories/employeeRepository.js";
import * as cardRepository from "../repositories/cardRepository.js";

import { TransactionTypes } from "../repositories/cardRepository.js";

import cardUtils from "../utils/cardUtils.js";

const cardServices = {
  createCard: async (employeeId: number, cardType: TransactionTypes) => {
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
    const cardNumber = cardUtils.generateCardNumber();
    const securityCode = cardUtils.generateCardCVV();
    const expirationDate = cardUtils.generateExpirationDate();

    const newCardData = {
      employeeId,
      cardholderName,
      securityCode,
      expirationDate,
      isVirtual: false,
      isBlocked: true,
      number: cardNumber,
      type: cardType,
    };

    await cardRepository.insert(newCardData);
  },
};

export default cardServices;
