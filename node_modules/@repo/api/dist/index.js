"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const citizen_routes_1 = __importDefault(require("./routes/citizen.routes"));
const officer_routes_1 = __importDefault(require("./routes/officer.routes"));
const error_middleware_1 = require("./middlewares/error.middleware");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)('dev'));
// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date() });
});
// Routes
app.use('/api/citizen', citizen_routes_1.default);
app.use('/api/officer', officer_routes_1.default);
// Admin routes would go here
// Error Handling (Must be last)
app.use(error_middleware_1.errorHandler);
app.listen(PORT, () => {
    console.log(`API Server running on port ${PORT}`);
});
