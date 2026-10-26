"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplaintService = void 0;
const database_1 = require("@repo/database");
const axios_1 = __importDefault(require("axios"));
const prisma = new database_1.PrismaClient();
const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000/predict';
/**
 * Service to handle complaint-related business logic.
 */
class ComplaintService {
    /**
     * Generates a unique complaint code.
     * Format: RD{YEAR}{6-digit sequence}
     */
    static async generateComplaintCode() {
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
    static async createComplaint(data, imageUrl) {
        let mlData = null;
        try {
            // Call ML Service to analyze the image
            // Note: If ML service fails, we still create the complaint but without ML data
            const mlResponse = await axios_1.default.post(ML_SERVICE_URL, { imageUrl });
            mlData = mlResponse.data;
        }
        catch (error) {
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
                status: database_1.ComplaintStatus.SUBMITTED,
                statusLogs: {
                    create: {
                        newStatus: database_1.ComplaintStatus.SUBMITTED,
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
    static async trackComplaint(query) {
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
    static async getOfficerComplaints(municipalityId) {
        return prisma.complaint.findMany({
            where: { municipalityId },
            orderBy: { createdAt: 'desc' },
        });
    }
    /**
     * Updates the status of a complaint and logs the change.
     */
    static async updateStatus(id, updateData, officerId) {
        const complaint = await prisma.complaint.findUnique({ where: { id } });
        if (!complaint)
            throw new Error('Complaint not found');
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
exports.ComplaintService = ComplaintService;
