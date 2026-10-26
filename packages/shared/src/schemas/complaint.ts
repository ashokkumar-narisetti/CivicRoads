import { z } from 'zod';

export const SeverityEnum = z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']);
export const ComplaintStatusEnum = z.enum([
  'SUBMITTED',
  'UNDER_REVIEW',
  'ASSIGNED',
  'IN_PROGRESS',
  'COMPLETED',
  'REJECTED',
]);

// Used for API response validation
export const ComplaintSchema = z.object({
  id: z.string().uuid(),
  complaintCode: z.string(),
  citizenName: z.string(),
  citizenMobile: z.string(),
  imageUrl: z.string().url(),
  latitude: z.number(),
  longitude: z.number(),
  village: z.string(),
  municipalityId: z.string().uuid(),
  defectType: z.string().nullable().optional(),
  severity: SeverityEnum.nullable().optional(),
  estimatedAreaSqM: z.number().nullable().optional(),
  estimatedCost: z.number().nullable().optional(),
  status: ComplaintStatusEnum,
  assignedOfficerId: z.string().uuid().nullable().optional(),
  description: z.string().nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Complaint = z.infer<typeof ComplaintSchema>;

// Used when a citizen reports a defect
export const CreateComplaintSchema = z.object({
  citizenName: z.string().min(2, "Name must be at least 2 characters"),
  citizenMobile: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid mobile number"),
  latitude: z.number(),
  longitude: z.number(),
  description: z.string().optional(),
  // For file upload, handled via FormData in frontend, but validated here if base64 or later
  // Actual image is handled via multer
});

export type CreateComplaintDTO = z.infer<typeof CreateComplaintSchema>;

// Used when an officer updates a complaint
export const UpdateComplaintStatusSchema = z.object({
  status: ComplaintStatusEnum,
  assignedOfficerId: z.string().uuid().optional(),
});

export type UpdateComplaintStatusDTO = z.infer<typeof UpdateComplaintStatusSchema>;
