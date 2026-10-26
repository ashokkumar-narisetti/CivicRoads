import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('[Error]:', err);
  
  if (err.name === 'ZodError') {
    return sendError(res, err.errors, 400, 'Validation Error');
  }

  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  
  return sendError(res, err, status, message);
};
