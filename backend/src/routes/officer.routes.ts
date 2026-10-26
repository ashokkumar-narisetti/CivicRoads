import { Router } from 'express';
import { getOfficerDashboard, updateComplaintStatus } from '../controllers/complaint.controller';
import { authenticate, requireRole } from '../middlewares/auth.middleware';

const router = Router();

// All officer routes require authentication and OFFICER or FIELD_ENGINEER role
router.use(authenticate);
router.use(requireRole(['OFFICER', 'FIELD_ENGINEER']));

router.get('/dashboard', getOfficerDashboard);
router.patch('/complaints/:id/status', updateComplaintStatus);

export default router;
