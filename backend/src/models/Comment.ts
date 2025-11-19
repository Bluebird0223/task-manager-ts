import mongoose, { Document, Schema, Model } from 'mongoose'

export interface IComment extends Document {
    content: string;
    authorId: mongoose.Schema.Types.ObjectId;
    taskId: mongoose.Schema.Types.ObjectId;
    projectId: mongoose.Schema.Types.ObjectId;
    parentComment: mongoose.Schema.Types.ObjectId;
    isEdited: [{ content: string, editedAt: Date }];
    editHistory: [{ content: string, editedAt: Date }];
    mentions: mongoose.Schema.Types.ObjectId[];
    reactions: [{
        user: mongoose.Schema.Types.ObjectId,
        emoji: string,
        reactedAt: Date
    }];
}

const commentSchema: Schema<IComment> = new Schema<IComment>(
    {
        content: { type: String, required: true, trim: true },
        authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
        projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
        parentComment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
        isEdited: [{
            content: String,
            editedAt: { type: Date, default: Date.now }
        }],
        editHistory: [{
            content: String,
            editedAt: { type: Date, default: Date.now }
        }],
        mentions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        reactions: [{
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            emoji: String,
            reactedAt: { type: Date, default: Date.now }
        }],

    },
    {
        timestamps: true
    }
)

export const Comment: Model<IComment> = mongoose.model<IComment>("Comment", commentSchema)

export default Comment
