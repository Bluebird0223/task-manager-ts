import mongoose, { Document, Schema, Model } from 'mongoose'

export interface ITaskRelation {
    parentTask: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
    relatedTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
}

export interface IProgress {
    completionPercentage: { type: Number, min: 0, max: 100, default: 0 },
    completedAt: Date,
    completedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}

export interface ITask extends Document {
    taskNumber: Number;
    title: string;
    description: string;
    projectId: mongoose.Schema.Types.ObjectId;
    createdBy: mongoose.Schema.Types.ObjectId;
    assignees: [mongoose.Schema.Types.ObjectId];
    status: string;
    priority: string;
    progress: IProgress;
    taskRelation: ITaskRelation;
    dueDate: Date;
    startDate: Date;
    estimatedHours: Number;
    actualHours: Number;
}

const taskSchema: Schema<ITask> = new Schema<ITask>(
    {
        taskNumber: { type: Number, unique: true },
        title: { type: String, trim: true },
        description: { type: String, trim: true },
        projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        assignees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
        status: { type: String, enum: ['backlog', 'todo', 'in-progress', 'review', 'done'], default: 'todo' },
        priority: { type: String, enum: ['low', 'medium', 'high', 'urgent'], default: 'medium' },
        progress: {
            completionPercentage: { type: Number, min: 0, max: 100, default: 0 },
            completedAt: { type: Date, default: Date.now() },
            completedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        },
        taskRelation: {
            parentTask: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
            relatedTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
        },
        dueDate: { type: Date, default: Date.now() },
        startDate: { type: Date, default: Date.now() },
        estimatedHours: { type: String },
        actualHours: { type: String }

    },
    {
        timestamps: true
    }
)

export const Task: Model<ITask> = mongoose.model<ITask>("Task", taskSchema)

export default Task