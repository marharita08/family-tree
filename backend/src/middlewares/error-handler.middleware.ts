import { Request, Response, NextFunction } from "express";
import { z } from "zod";

import { HTTPStatus } from "../enums/http-status.enum";

const errorHandler = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (err instanceof z.ZodError) {
    res.status(HTTPStatus.BAD_REQUEST).json({
      message: "Validation failed",
      errors: err.errors.map(error => ({
        path: error.path,
        message: error.message
      }))
    });
  } else {
    const { message } = err;
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send({ message });
  }
  return next();
};

export { errorHandler };
