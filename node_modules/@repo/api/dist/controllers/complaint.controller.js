"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateComplaintStatus = exports.getOfficerDashboard = exports.trackComplaint = exports.submitComplaint = void 0;
const complaint_service_1 = require("../services/complaint.service");
const shared_1 = require("@repo/shared");
const response_1 = require("../utils/response");
const submitComplaint = async (req, res, next) => {
    try {
        const validatedData = shared_1.CreateComplaintSchema.parse(req.body);
        // The imageUrl should have been set by the Cloudinary upload middleware
        const imageUrl = req.file?.path || req.body.imageUrl;
        if (!imageUrl) {
            return (0, response_1.sendError)(res, 'Image is required', 400);
        }
        const complaint = await complaint_service_1.ComplaintService.createComplaint(validatedData, imageUrl);
        return (0, response_1.sendSuccess)(res, { complaintCode: complaint.complaintCode }, 201, 'Complaint submitted successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.submitComplaint = submitComplaint;
const trackComplaint = async (req, res, next) => {
    try {
        const { query } = req.params;
        if (!query) {
            return (0, response_1.sendError)(res, 'Query parameter (code or mobile) is required', 400);
        }
        const complaints = await complaint_service_1.ComplaintService.trackComplaint(query);
        return (0, response_1.sendSuccess)(res, complaints);
    }
    catch (error) {
        next(error);
    }
};
exports.trackComplaint = trackComplaint;
const getOfficerDashboard = async (req, res, next) => {
    try {
        // Guaranteed by auth middleware
        const municipalityId = req.user.municipalityId;
        if (!municipalityId) {
            return (0, response_1.sendError)(res, 'Officer has no assigned municipality', 403);
        }
        const complaints = await complaint_service_1.ComplaintService.getOfficerComplaints(municipalityId);
        return (0, response_1.sendSuccess)(res, complaints);
    }
    catch (error) {
        next(error);
    }
};
exports.getOfficerDashboard = getOfficerDashboard;
const updateComplaintStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const validatedData = shared_1.UpdateComplaintStatusSchema.parse(req.body);
        const updated = await complaint_service_1.ComplaintService.updateStatus(id, validatedData, req.user.userId);
        return (0, response_1.sendSuccess)(res, updated, 200, 'Status updated successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.updateComplaintStatus = updateComplaintStatus;
