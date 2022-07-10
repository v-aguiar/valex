import Joi from "joi";

const activateCardSchema = Joi.object({
  securityCode: Joi.string().required().messages({
    "string.empty": "⚠ securityCode is required",
  }),

  password: Joi.number().min(4).max(4).required().messages({
    "number.min": "⚠ password must be 4 digits",
    "number.max": "⚠ password must be 4 digits",
    "number.required": "⚠ password is required",
  }),

  cardId: Joi.number().required().messages({
    "number.required": "⚠ cardId is required",
  }),
});

export default activateCardSchema;
