"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendError = exports.sendSuccess = void 0;
const sendSuccess = (res, data, statusCode = 200, message = 'Success') => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
        error: null,
    });
};
exports.sendSuccess = sendSuccess;
const sendError = (res, error, statusCode = 500, message = 'An error occurred') => {
    return res.status(statusCode).json({
        success: false,
        message,
        data: null,
        error: error instanceof Error ? error.message : error,
    });
};
exports.sendError = sendError;
