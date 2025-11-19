import mongoose, { Document, Schema, Model } from 'mongoose'

export interface IInvitation extends Document {
    email: { type: mongoose.Schema.Types.ObjectId },
    teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    invitedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    role: string,
    token: string,
    status: string,
    expiresAt: Date,
    acceptedAt: Date,
    acceptedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: string,

}

const invitationSchema: Schema<IInvitation> = new Schema<IInvitation>(
    {
        email: { type: String, required: true },
        teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
        projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
        invitedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        role: {
            type: String,
            enum: ['admin', 'member', 'guest'],
            default: 'member'
        },
        status: {
            type: String,
            enum: ['pending', 'accepted', 'expired', 'revoked'],
            default: 'pending'
        },
        expiresAt: { type: Date, required: false },
        acceptedAt: { type: Date, default: Date.now() },
        acceptedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        message: { type: String },

    },
    {
        timestamps: true
    }
)

export const Invitation: Model<IInvitation> = mongoose.model<IInvitation>("Invitation", invitationSchema)

export default Invitation