import { Request, Response } from "express";
import Activity from "../models/Activity";


export async function createActivity(req: Request, res: Response) {
    try {
        const user = (req as any).user;
        const { userId } = user
        const { type, recipients, target, metadata } = req.body
        const requiredFields = ['type', 'recipients', 'target'];
        const missingFields = requiredFields.filter(field => !req.body[field]);
        if (missingFields.length > 0) {
            return res.status(400).json({
                message: "Validation failed - fields missing",
                missingFields: missingFields
            });
        }

        const dataToSend = {
            type: type,
            actorId: userId,
            recipients: recipients,
            target: target,
            metadata: metadata,
        }
        const result = await Activity.create(dataToSend)
        if (result?._id) {
            return res.status(201).json({ message: "Activity created!" })
        } else {
            return res.status(500).json({ message: "Activity failed to created!" })
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
}