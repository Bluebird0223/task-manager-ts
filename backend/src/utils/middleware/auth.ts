import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { NextFunction, Request, Response } from 'express'
dotenv.config()

const jwtSecret = process.env['JWT_SECRET']

export interface customRequest extends Request { user?: any }

export async function authenticationUserJwt(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new Error('Authentication failed: No token provided.');
        } else {
            const decoded = jwt.verify(token, jwtSecret as string);
            (req as customRequest).user = decoded
            next()
        }

    } catch (error) {
        throw new Error(`Internal server error during authentication: ${error}`)
    }
}