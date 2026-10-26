import { PrismaClient, ComplaintStatus } from '@repo/database';
import { CreateComplaintDTO, UpdateComplaintStatusDTO } from '@repo/shared';
import axios from 'axios';

const prisma = new PrismaClient();
const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000/predict';

/**
 * Service to handle complaint-related business logic.
 */
export class ComplaintService {
  /**
   * Generates a unique complaint code.
   * Format: RD{YEAR}{6-digit sequence}
   */
  private static async generateComplaintCode(): Promise<string> {
    const year = new Date().getFullYear();
    // In a real high-concurrency app, this would use a DB sequence or Redis counter.
    // For simplicity here, we count current year complaints.
    const count = await prisma.complaint.count({
      where: {
        createdAt: {
          gte: new Date(`${year}-01-01T00:00:00Z`),
        },
      },
    });
    
    const sequence = String(count + 1).padStart(6, '0');
    return `RD${year}${sequence}`;
  }

  /**
   * Creates a new complaint from a citizen report.
   * Calls the ML service, looks up municipality, and saves to DB.
   */
  public static async createComplaint(data: CreateComplaintDTO, imageUrl: string) {
    let mlData: any = null;
    
    try {
      // Call ML Service to analyze the image
      // Note: If ML service fails, we still create the complaint but without ML data
      const mlResponse = await axios.post(ML_SERVICE_URL, { imageUrl });
      mlData = mlResponse.data;
    } catch (error) {
      console.warn('ML Service unreachable, proceeding without AI detection.');
    }

    // Determine Municipality based on coordinates
    // For now, we'll assign to a default municipality or find the closest one
    const municipality = await prisma.municipality.findFirst();
    if (!municipality) {
      throw new Error('No municipality configured in the system.');
    }

    const complaintCode = await this.generateComplaintCode();

    const complaint = await prisma.complaint.create({
      data: {
        complaintCode,
        citizenName: data.citizenName,
        citizenMobile: data.citizenMobile,
        latitude: data.latitude,
        longitude: data.longitude,
        description: data.description,
        imageUrl,
        municipalityId: municipality.id,
        village: 'Unknown', // Ideally reversed-geocoded
        defectType: mlData?.defectType || null,
        severity: mlData?.severity || null,
        estimatedAreaSqM: mlData?.estimatedAreaSqM || null,
        estimatedCost: mlData?.estimatedCost || null,
        status: ComplaintStatus.SUBMITTED,
        statusLogs: {
          create: {
            newStatus: ComplaintStatus.SUBMITTED,
            changedBy: 'System',
          }
        }
      },
    });

    return complaint;
  }

  /**
   * Tracks a complaint by code or mobile number.
   */
  public static async trackComplaint(query: string) {
    return prisma.complaint.findMany({
      where: {
        OR: [
          { complaintCode: query },
          { citizenMobile: query },
        ],
      },
      include: {
        statusLogs: {
          orderBy: { changedAt: 'desc' },
        },
        municipality: {
          select: { name: true },
        },
      },
    });
  }

  /**
   * Gets complaints scoped to a specific municipality (for Officer Dashboard).
   */
  public static async getOfficerComplaints(municipalityId: string) {
    return prisma.complaint.findMany({
      where: { municipalityId },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Updates the status of a complaint and logs the change.
   */
  public static async updateStatus(id: string, updateData: UpdateComplaintStatusDTO, officerId: string) {
    const complaint = await prisma.complaint.findUnique({ where: { id } });
    if (!complaint) throw new Error('Complaint not found');

    const updated = await prisma.complaint.update({
      where: { id },
      data: {
        status: updateData.status,
        assignedOfficerId: updateData.assignedOfficerId || complaint.assignedOfficerId,
        statusLogs: {
          create: {
            oldStatus: complaint.status,
            newStatus: updateData.status,
            changedBy: officerId,
          }
        }
      },
    });

    return updated;
  }
}
