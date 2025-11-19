import { Request, Response } from "express";
import Task from "../models/Task";


export async function createTask(req: Request, res: Response) {
    try {
        const user = (req as any).user;
        const { userId } = user
        const { title, description, projectId, assignees, status, priority, progress, taskRelation, dueDate, startDate, estimatedHours, actualHours } = req.body
        const requiredFields = [
            'title',
            'description',
            'projectId',
            'assignees',
            'priority',
            'progress',
            'taskRelation',
            'dueDate',
            'startDate',
            'estimatedHours'
        ];
        const missingFields = requiredFields.filter(field => !req.body[field]);
        if (missingFields.length > 0) {
            console.log('Missing fields:', missingFields);
            return res.status(400).json({
                message: "Validation failed - fields missing",
                missingFields: missingFields
            });
        }

        const existing = await Task.findOne({ title })
        if (existing) {
            return res.status(400).json({ message: "Project already exist with this name" })
        }

        const latestTask = await Task.findOne().sort({ taskNumber: -1 })
        let taskNumberId = 1
        if (latestTask?.taskNumber) {
            taskNumberId = Number(latestTask.taskNumber) + 1
        }

        const dataToSend = {
            taskNumber: taskNumberId,
            title: title,
            description: description,
            projectId: projectId,
            createdBy: userId,
            assignees: assignees,
            status: status,
            priority: priority,
            progress: progress,
            taskRelation: taskRelation,
            dueDate: dueDate,
            startDate: startDate,
            estimatedHours: estimatedHours,
            actualHours: actualHours
        }
        const result = await Task.create(dataToSend)
        if (result?._id) {
            return res.status(201).json({ message: "Task Created Successfully!" })
        } else {
            return res.status(500).json({ message: "Task Creation failed!" })
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
}