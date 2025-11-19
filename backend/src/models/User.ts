import mongoose, { Document, Schema, Model } from 'mongoose'

export interface ITeamMembership {
    team: mongoose.Schema.Types.ObjectId;
    role: 'owner' | 'admin' | 'member';
    joinedAt: Date;
}

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    teams: ITeamMembership[];
    role: string;
}

const userSchema: Schema<IUser> = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
        teams: [
            {
                team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: false },
                role: { type: String, enum: ['owner', 'admin', 'member'], default: 'member' },
                joinedAt: { type: Date, default: Date.now },

            }
        ],
        role: { type: String, enum: ['user', 'admin'], default: 'user' }
    },
    {
        timestamps: true
    }
)

export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema)

export default User