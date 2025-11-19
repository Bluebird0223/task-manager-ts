import { Request, Response } from "express";
import Project from "../models/Project";
import Comment from "../models/Comment";
import Task from "../models/Task";



export async function createComment(req: Request, res: Response) {
    try {
        const user = (req as any).user;
        const { userId } = user
        const { content, taskId, projectId, parentComment, editHistory, mentions, reactions } = req.body
        const requiredFields = ['content', 'taskId', 'projectId'];
        const missingFields = requiredFields.filter(field => !req.body[field]);
        if (missingFields.length > 0) {
            return res.status(400).json({
                message: "Validation failed - fields missing",
                missingFields: missingFields
            });
        }

        const taskIdValid = await Task.findOne({ _id: taskId })
        if (!taskIdValid) { return res.status(404).json({ message: "taskId not found!" }) }
        const projectIdValid = await Project.findOne({ _id: projectId })
        if (!projectIdValid) { return res.status(404).json({ message: "projectId not found!" }) }

        const dataToSend = {
            content: content,
            authorId: userId,
            taskId: taskId,
            projectId: projectId,
            parentComment: parentComment,
            editHistory: editHistory,
            mentions: mentions,
            reactions: reactions
        }
        const result = await Comment.create(dataToSend)
        if (result?._id) {
            return res.status(201).json({ message: "Commented!!" })
        } else {
            return res.status(500).json({ message: "Comment failed!" })
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
}