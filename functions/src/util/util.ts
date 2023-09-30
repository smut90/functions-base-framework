import { logger } from "firebase-functions";
import { RequestHandler } from 'express';
import { ValidationChain, validationResult } from 'express-validator';
import ApiError from "@entities/ApiError";

export function debugLog(message: string, ...args: any[]) {
  logger.debug(message, args);
}

export function errorLog(message: string, ...args: any[]) {
  if (args[0].response) {
    logger.error(message, args[0].response.data);
    logger.error(message, args[0].response.status);
    logger.error(message, args[0].response.headers);

  } else if (args[0].request) {
    logger.error(message, args[0].request);
  } else {
    // Something happened in setting up the request that triggered an Error
    logger.error(message, args);
  }
}


export function performValidation(...validators: ValidationChain[]): RequestHandler[] {
  const validationHandler: RequestHandler = (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      throw ApiError.validationError(validationErrors.array());
    }
    next();
    return Promise.resolve();
  };
  return [...validators, validationHandler];
}