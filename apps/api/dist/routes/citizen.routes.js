"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const complaint_controller_1 = require("../controllers/complaint.controller");
const upload_middleware_1 = require("../middlewares/upload.middleware");
const router = (0, express_1.Router)();
// Rate limiting should be applied here in a production environment
router.post('/report', upload_middleware_1.upload.single('image'), complaint_controller_1.submitComplaint);
router.get('/track/:query', complaint_controller_1.trackComplaint);
exports.default = router;
