import { NextFunction, Request, Response } from 'express';
import { AppError } from '@errors/AppError';


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): Response {
  if (err instanceof AppError)
    return res.status(err.statusCode).json({
      message: err.message
    });

  return res.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`
  });
}