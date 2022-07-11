import Joi from "joi";

const paymentSchema = Joi.object({
  businessId: Joi.number().required().messages({
    "number.required": "⚠ businessId is required",
    "number.base": "⚠ businessId must be a number",
  }),

  cardId: Joi.number().required().messages({
    "number.required": "⚠ cardId is required",
    "number.base": "⚠ cardId must be a number",
  }),

  amount: Joi.number().min(0).required().messages({
    "number.required": "⚠ amount is required",
    "number.base": "⚠ amount must be a number",
    "number.min": "⚠ amount must be greater than 0",
  }),

  password: Joi.string().required().messages({
    "string.required": "⚠ password is required",
    "string.base": "⚠ password must be a string",
  }),
});

export default paymentSchema;
