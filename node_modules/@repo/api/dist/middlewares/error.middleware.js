"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const response_1 = require("../utils/response");
const errorHandler = (err, req, res, next) => {
    console.error('[Error]:', err);
    if (err.name === 'ZodError') {
        return (0, response_1.sendError)(res, err.errors, 400, 'Validation Error');
    }
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    return (0, response_1.sendError)(res, err, status, message);
};
exports.errorHandler = errorHandler;
