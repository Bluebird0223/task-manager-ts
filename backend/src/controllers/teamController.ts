import type { Request, Response } from "express";
import Team from "../models/Team";


// create team
export async function createTeam(req: Request, res: Response) {
    try {
        const user = (req as any).user;
        const { userId } = user
        const { name, description, members, setting } = req.body
        if (!name || !description || !members || !setting) {
            return res.status(400).json({ message: "validation failed fields missing" })
        }

        const existing = await Team.findOne({ name })
        if (existing) {
            return res.status(400).json({ message: "Team already exist with this name" })
        }

        const dataToSend = {
            name: name,
            description: description,
            owner: userId,
            members: members,
            setting: setting,
        }
        const result = await Team.create(dataToSend)
        if (result?._id) {
            return res.status(201).json({ message: "Team Created Successfully!" })
        } else {
            return res.status(500).json({ message: "Team Creation failed!" })
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
}

//get team 
export async function getTeam(req: Request, res: Response) {
    try {
        const user = (req as any).user;
        const { userId } = user
        const result = await Team.find({ owner: userId })
        if (result) {
            return res.status(200).json({ status: true, message: "Teams found successfully",result })
        } else {
            return res.status(400).json({ status: true, message: "Teams not found" })
        }

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
}

export default { createTeam, getTeam }