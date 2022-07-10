import Joi from "joi";

const createCardSchema = Joi.object({
  employeeId: Joi.number().integer().required().messages({
    "number.integer": "⚠ employeeId must be an integer",
    "number.required": "⚠ employeeId is required",
  }),
  cardType: Joi.string()
    .equal(["groceries", "restaurants", "transport", "education", "health"])
    .required()
    .messages({
      "string.equal":
        "⚠ cardType must be one of the following: groceries, restaurants, transport, education, health",
      "string.required": "⚠ cardType is required",
    }),
});

export default createCardSchema;
