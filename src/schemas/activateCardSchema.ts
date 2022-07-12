import Joi from "joi";

const activateCardSchema = Joi.object({
  securityCode: Joi.number().required().messages({
    "number.required": "⚠ securityCode is required",
    "number.base": "⚠ securityCode must be a number",
  }),

  password: Joi.number().min(4).max(4).required().messages({
    "number.min": "⚠ password must be 4 digits",
    "number.max": "⚠ password must be 4 digits",
    "number.required": "⚠ password is required",
    "number.base": "⚠ password must be a number",
  }),

  cardId: Joi.number().required().messages({
    "number.required": "⚠ cardId is required",
    "number.base": "⚠ cardId must be a number",
  }),
});

export default activateCardSchema;
