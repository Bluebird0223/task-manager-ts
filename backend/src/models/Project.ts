import mongoose, { Document, Schema, Model } from 'mongoose'


export interface IMembership {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    role: { type: String, enum: ['manager', 'editor', 'viewer'], default: 'editor' },
    addedAt: Date
}

export interface ISetting {
    privacy: { type: String, enum: ['private', 'team', 'public'], default: 'team' },
    taskNumbering: { type: Boolean, default: true },
    defaultView: { type: String, enum: ['board', 'list', 'calendar'], default: 'board' }
}

export interface IProject extends Document {
    name: string;
    description: string;
    teamId: mongoose.Schema.Types.ObjectId;
    createdBy: mongoose.Schema.Types.ObjectId;
    members: IMembership[];
    settings: ISetting,
    status: string,
    startDate: Date,
    expectedEndDate: Date,
    progress: Number
}

const projectSchema: Schema<IProject> = new Schema<IProject>(
    {
        name: { type: String, required: true, trim: true },
        description: { type: String, trim: true },
        teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        members: [
            {
                user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
                role: { type: String, enum: ['manager', 'editor', 'viewer'], default: 'editor' },
                addedAt: { type: Date, default: Date.now }
            }
        ],
        settings: {
            privacy: { type: String, enum: ['private', 'team', 'public'], default: 'team' },
            taskNumbering: { type: Boolean, default: true },
            defaultView: { type: String, enum: ['board', 'list', 'calendar'], default: 'board' }
        },
        status: { type: String, default: 'active' },
        startDate: { type: Date },
        expectedEndDate: { type: Date },
        progress: { type: Number, default: 0 }
    },
    {
        timestamps: true
    }
)

export const Project: Model<IProject> = mongoose.model<IProject>("Project", projectSchema)

export default Project
