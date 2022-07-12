import Joi from "joi";

const createVirtualCardSchema = Joi.object({
  cardId: Joi.number().required().messages({
    "number.required": "⚠ Card ID is required!",
    "number.integer": "⚠ Card ID must be an integer!",
  }),

  password: Joi.string().required().messages({
    "string.required": "⚠ Password is required!",
    "string.base": "⚠ Password must be a string!",
  }),
});

export default createVirtualCardSchema;
