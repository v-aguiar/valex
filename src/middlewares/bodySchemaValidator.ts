import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";

export default function bodySchemaValidator(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw {
        name: "ValidationError",
        message: error.details,
      };
    }
    next();
  };
}
