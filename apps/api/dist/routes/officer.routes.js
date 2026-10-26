"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const complaint_controller_1 = require("../controllers/complaint.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
// All officer routes require authentication and OFFICER or FIELD_ENGINEER role
router.use(auth_middleware_1.authenticate);
router.use((0, auth_middleware_1.requireRole)(['OFFICER', 'FIELD_ENGINEER']));
router.get('/dashboard', complaint_controller_1.getOfficerDashboard);
router.patch('/complaints/:id/status', complaint_controller_1.updateComplaintStatus);
exports.default = router;
