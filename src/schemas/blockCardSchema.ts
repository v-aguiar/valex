import Joi from "joi";

const blockCardSchema = Joi.object({
  cardId: Joi.number().required().messages({
    "number.required": "⚠ Card ID is required!",
    "number.integer": "⚠ Card ID must be an integer!",
  }),

  password: Joi.string().required().messages({
    "string.required": "⚠ Password is required!",
  }),
});

export default blockCardSchema;
