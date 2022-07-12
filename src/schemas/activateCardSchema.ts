import Joi from "joi";

const activateCardSchema = Joi.object({
  securityCode: Joi.number().required().messages({
    "number.required": "⚠ securityCode is required",
    "number.base": "⚠ securityCode must be a number",
  }),

  password: Joi.string()
    .length(4)
    .regex(/^[0-9]*$/)
    .required()
    .messages({
      "string.length": "⚠ Password must be 4 digits long",
      "string.regex": "⚠ Password must contain only numbers",
      "string.required": "⚠ Password is required",
    }),

  cardId: Joi.number().required().messages({
    "number.required": "⚠ cardId is required",
    "number.base": "⚠ cardId must be a number",
  }),
});

export default activateCardSchema;
