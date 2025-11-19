import { Request, Response } from "express";
import Project from "../models/Project";


export async function createProject(req: Request, res: Response) {
    try {
        const user = (req as any).user;
        const { userId } = user
        const { name, description, members, settings, teamId, startDate, expectedEndDate, progress } = req.body
        if (!name || !description || !members || !settings || !teamId || !startDate || !expectedEndDate || !progress) {
            return res.status(400).json({ message: "validation failed fields missing" })
        }

        const existing = await Project.findOne({ name })
        if (existing) {
            return res.status(400).json({ message: "Project already exist with this name" })
        }

        const dataToSend = {
            name: name,
            description: description,
            teamId: teamId,
            createdBy: userId,
            members: members,
            settings: settings,
            startDate: startDate,
            expectedEndDate: expectedEndDate,
            progress: progress
        }
        const result = await Project.create(dataToSend)
        if (result?._id) {
            return res.status(201).json({ message: "Project Created Successfully!" })
        } else {
            return res.status(500).json({ message: "Project Creation failed!" })
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
}