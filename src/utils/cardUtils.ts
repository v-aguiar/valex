import { faker } from "@faker-js/faker";
import dayjs from "dayjs";

import cryptr from "../config/cryptr.js";

import { Card } from "../repositories/cardRepository.js";

const cardUtils = {
  generateCardNumber: () => {
    return faker.finance.creditCardNumber("################");
  },

  generateCardCVV: () => {
    const cvv = faker.finance.creditCardCVV();
    return cryptr.encrypt(cvv);
  },

  hashPassword: (password: string) => {
    return cryptr.encrypt(password);
  },

  generateExpirationDate: () => {
    return dayjs().add(5, "year").format("MM/YY");
  },

  generateCardholderName: (fullName: string) => {
    const nameArray = fullName.split(" ");
    const firstName = nameArray[0];
    const lastName = nameArray[nameArray.length - 1];

    if (nameArray.length > 2) {
      const middleNamesFirstLetters = cardUtils.getMiddleNamesFirstLetters(nameArray);
      return `${firstName.toUpperCase()} ${middleNamesFirstLetters.toUpperCase()} ${lastName.toUpperCase()}`;
    }

    return `${firstName.toUpperCase()} ${lastName.toUpperCase()}`;
  },

  getMiddleNamesFirstLetters: (nameArray: string[]) => {
    const middleNames = nameArray.slice(1, nameArray.length - 1);
    return middleNames
      .map((middleName) => {
        const firstLetter = middleName[0];
        return middleName.length > 3 ? firstLetter : "";
      })
      .join("");
  },

  checkCardExpiration: (card: Card) => {
    if (dayjs().isBefore(dayjs(card.expirationDate))) {
      throw {
        name: "unauthorized",
        message: "⚠ This card is expired...",
      };
    }
  },

  checkSecurityCode: (securityCode: string, hashedSecurityCode: string) => {
    if (cryptr.decrypt(securityCode) !== cryptr.decrypt(hashedSecurityCode)) {
      throw {
        name: "unauthorized",
        message: "⚠ Invalid security code (CVV)!",
      };
    }
  },
};

export default cardUtils;
