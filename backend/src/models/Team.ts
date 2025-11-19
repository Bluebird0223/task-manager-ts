import mongoose, { Schema, Model, Document } from "mongoose";

export interface IMembership {
    user: mongoose.Schema.Types.ObjectId;
    role: 'owner' | 'admin' | 'member';
    joinedAt: Date;
    invitedBy: mongoose.Schema.Types.ObjectId;
}
export interface ISettings {
    allowMemberInvites: Boolean;
    defaultProjectPermissions: 'view' | 'comment' | 'edit';
    taskApprovalRequired: Boolean
}

export interface ITeam extends Document {
    name: String;
    description: string;
    owner: mongoose.Schema.Types.ObjectId;
    members: IMembership[];
    setting: ISettings;
    isActive: Boolean;
}

const teamSchema: Schema<ITeam> = new Schema<ITeam>(
    {
        name: { type: String, required: true, trim: true },
        description: { type: String, trim: true },
        owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        members: [
            {
                user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
                role: { type: String, enum: ['owner', 'admin', 'member'], default: 'member' },
                joinedAt: { type: Date, default: Date.now },
                invitedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }

            }
        ],
        setting: {
            allowMemberInvites: { type: Boolean, default: true },
            defaultProjectPermissions: { type: String, enum: ['view', 'comment', 'edit'], default: 'view' },
            taskApprovalRequired: { type: Boolean, default: true }
        },
        isActive: { type: Boolean, default: true }

    },
    {
        timestamps: true
    }
)
export const Team: Model<ITeam> = mongoose.model<ITeam>("Team", teamSchema)

export default Team