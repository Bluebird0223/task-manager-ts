import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const jwtSecret = process.env['JWT_SECRET']

export function generateToken(userDetails: { userId: string; email: string; teams: string }): string {
    const tokenPayload = {
        userId: userDetails.userId,
        email: userDetails.email,
        teams: userDetails.teams
    }
    return jwt.sign(tokenPayload, jwtSecret as string, { expiresIn: '7d' })
}