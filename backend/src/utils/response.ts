import express, { Response } from 'express';

export const sendSuccess = <T>(res: Response, data: T, statusCode = 200, message = 'Success') => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    error: null,
  });
};

export const sendError = (res: Response, error: any, statusCode = 500, message = 'An error occurred') => {
  return res.status(statusCode).json({
    success: false,
    message,
    data: null,
    error: error instanceof Error ? error.message : error,
  });
};
