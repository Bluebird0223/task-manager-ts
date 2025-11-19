import mongoose, { Document, Schema, Model } from 'mongoose'

export interface IChanges {
    field: string;
    oldValue: mongoose.Schema.Types.Mixed;
    newValue: mongoose.Schema.Types.Mixed;
}

export interface ITarget {
    targetType: string;
    targetId: mongoose.Schema.Types.ObjectId;
    project?: mongoose.Schema.Types.ObjectId;
    team?: mongoose.Schema.Types.ObjectId;
}

export interface IActivity extends Document {
    type: string;
    actorId: mongoose.Schema.Types.ObjectId;
    recipients: mongoose.Schema.Types.ObjectId[];
    readBy: { user: mongoose.Schema.Types.ObjectId; readAt: Date }[];
    target: ITarget;
    changes?: IChanges[];
    metadata?: mongoose.Schema.Types.Mixed;
}

const activitySchema: Schema<IActivity> = new Schema<IActivity>(
    {
        type: {
            type: String,
            enum: [
                'task_created', 'task_updated', 'task_completed', 'task_assigned',
                'comment_added', 'file_uploaded', 'project_created', 'team_invite',
                'due_date_approaching', 'mention'
            ],
            required: true
        },
        actorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        recipients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        readBy: [{
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            readAt: { type: Date, default: Date.now }
        }],
        target: {
            targetType: { type: String, enum: ['task', 'project', 'team', 'comment'], required: true },
            targetId: { type: mongoose.Schema.Types.ObjectId, required: true },
            project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
            team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
        },
        changes: [{
            field: String,
            oldValue: mongoose.Schema.Types.Mixed,
            newValue: mongoose.Schema.Types.Mixed
        }],
        metadata: { type: mongoose.Schema.Types.Mixed }
    },
    {
        timestamps: true
    }
)

export const Activity: Model<IActivity> = mongoose.model<IActivity>("Activity", activitySchema)
export default Activity