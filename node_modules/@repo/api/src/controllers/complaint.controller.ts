import { Request, Response, NextFunction } from 'express';
import { ComplaintService } from '../services/complaint.service';
import { CreateComplaintSchema, UpdateComplaintStatusSchema } from '@repo/shared';
import { sendSuccess, sendError } from '../utils/response';

export const submitComplaint = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = CreateComplaintSchema.parse(req.body);
    
    // The imageUrl should have been set by the Cloudinary upload middleware
    const imageUrl = req.file?.path || req.body.imageUrl;
    
    if (!imageUrl) {
      return sendError(res, 'Image is required', 400);
    }

    const complaint = await ComplaintService.createComplaint(validatedData, imageUrl);
    return sendSuccess(res, { complaintCode: complaint.complaintCode }, 201, 'Complaint submitted successfully');
  } catch (error) {
    next(error);
  }
};

export const trackComplaint = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { query } = req.params;
    if (!query) {
      return sendError(res, 'Query parameter (code or mobile) is required', 400);
    }

    const complaints = await ComplaintService.trackComplaint(query);
    return sendSuccess(res, complaints);
  } catch (error) {
    next(error);
  }
};

export const getOfficerDashboard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Guaranteed by auth middleware
    const municipalityId = req.user!.municipalityId;
    if (!municipalityId) {
      return sendError(res, 'Officer has no assigned municipality', 403);
    }

    const complaints = await ComplaintService.getOfficerComplaints(municipalityId);
    return sendSuccess(res, complaints);
  } catch (error) {
    next(error);
  }
};

export const updateComplaintStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const validatedData = UpdateComplaintStatusSchema.parse(req.body);
    
    const updated = await ComplaintService.updateStatus(id, validatedData, req.user!.userId);
    return sendSuccess(res, updated, 200, 'Status updated successfully');
  } catch (error) {
    next(error);
  }
};
