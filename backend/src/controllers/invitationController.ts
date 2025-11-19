import { Request, Response } from "express";
import Invitation from "../models/Invitation";
import Team from "../models/Team";
import Project from "../models/Project";



export async function createInvitation(req: Request, res: Response) {
    try {
        const user = (req as any).user;
        const { userId } = user
        const { email, teamId, projectId, role, status, expiresAt, message } = req.body
        const requiredFields = ['email', 'teamId', 'projectId'];
        const missingFields = requiredFields.filter(field => !req.body[field]);
        if (missingFields.length > 0) {
            return res.status(400).json({
                message: "Validation failed - fields missing",
                missingFields: missingFields
            });
        }

        const existing = await Invitation.findOne({ email, projectId })
        if (existing) {
            return res.status(400).json({ message: "Invitation already exist!" })
        }

        const teamIdValid = await Team.findOne({ _id: teamId })
        if (!teamIdValid) { return res.status(404).json({ message: "teamId not found!" }) }
        const projectIdValid = await Project.findOne({ _id: projectId })
        if (!projectIdValid) { return res.status(404).json({ message: "projectId not found!" }) }

        const expirationDate = expiresAt ? new Date(expiresAt) : new Date(Date.now() + 24 * 60 * 60 * 1000);

        const dataToSend = {
            email: email,
            teamId: teamId,
            projectId: projectId,
            invitedBy: userId,
            role: role,
            status: status,
            expiresAt: expirationDate,
            message: message
        }
        const result = await Invitation.create(dataToSend)
        if (result?._id) {
            return res.status(201).json({ message: "invitation sent!" })
        } else {
            return res.status(500).json({ message: "invitation failed to send!" })
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
}