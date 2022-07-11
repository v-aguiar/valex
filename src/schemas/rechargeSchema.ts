import Joi from "joi";

const rechargeSchema = Joi.object({
  cardId: Joi.number().required().messages({
    "number.base": "⚠ Card ID must be a number!",
    "number.required": "⚠ Card ID is required!",
  }),

  amount: Joi.number().min(0).required().messages({
    "number.base": "⚠ Amount must be a number!",
    "number.min": "⚠ Amount must be greater than 0!",
    "number.required": "⚠ Amount is required!",
  }),
});

export default rechargeSchema;
