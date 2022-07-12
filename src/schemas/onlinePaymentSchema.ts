import Joi, { Schema } from "joi";
import { BuyOnlineBody } from "../controllers/paymentsController";

const onlinePaymentSchema: Schema<BuyOnlineBody> = Joi.object({
  businessId: Joi.number().required().messages({
    "number.required": "⚠ Business ID is required!",
    "number.integer": "⚠ Business ID must be an integer!",
  }),
  amount: Joi.number().min(0.05).required().messages({
    "number.required": "⚠ Amount is required!",
    "number.integer": "⚠ Amount must be an integer!",
  }),
  cardNumber: Joi.string().required().messages({
    "string.required": "⚠ Card number is required!",
    "string.base": "⚠ Card number must be a string!",
  }),
  cardholderName: Joi.string().uppercase().required().messages({
    "string.required": "⚠ Cardholder name is required!",
    "string.base": "⚠ Cardholder name must be a string!",
    "string.uppercase": "⚠ Cardholder name must be uppercase!",
  }),
  expirationDate: Joi.string().required().messages({
    "string.required": "⚠ Expiration date is required!",
    "string.base": "⚠ Expiration date must be a string!",
  }),
  securityCode: Joi.number().required().messages({
    "number.required": "⚠ Security code is required!",
    "number.integer": "⚠ Security code must be an integer!",
  }),
});

export default onlinePaymentSchema;
