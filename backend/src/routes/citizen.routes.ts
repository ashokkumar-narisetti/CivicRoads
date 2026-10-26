import { Router } from 'express';
import { submitComplaint, trackComplaint } from '../controllers/complaint.controller';
import { upload } from '../middlewares/upload.middleware';

const router = Router();

// Rate limiting should be applied here in a production environment
router.post('/report', upload.single('image'), submitComplaint);
router.get('/track/:query', trackComplaint);

export default router;
