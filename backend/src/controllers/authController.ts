import type { Request, Response } from "express";
import User from "../models/User";
import { generateToken } from "../utils/middleware/generateToken";


// me
export async function getCurrentUser(req: Request, res: Response) {
    try {
        const user = (req as any).user;
        const { userId } = user
        const existing = await User.findOne({ _id: userId })
        if (!existing) {
            return res.status(404).json({ status: false, message: "User not found" })
        }

        return res.status(200).json({ status: true, user: existing })

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
}

// register a new user
export async function register(req: Request, res: Response) {
    try {
        const { name, email, password, role } = req.body as {
            name: string;
            email: string;
            password: string;
            role: string;
        }

        if (!name || !email || !password) {
            return res.status(400).json({ status: false, message: "validation failed fields missing" })
        }

        const existing = await User.findOne({ email })
        if (existing) {
            return res.status(400).json({ status: false, message: "Email already exist" })
        }

        const user = await User.create({ name, email, password, role })

        const token = generateToken({ userId: String(user?._id), email: email, teams: String(user?.teams) })

        return res.status(201).json({ status: true, token, user: { id: String(user._id), name, email } })

    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal server error" })
    }
}

// login
export async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body as { email: string, password: string }
        if (!email || !password) {
            return res.status(400).json({ status: false, message: "validation failed fields missing" })
        }
        const existing = await User.findOne({ email })
        if (!existing) {
            return res.status(404).json({ status: false, message: "User not found" })
        }

        if (existing?.password === password) {
            const token = generateToken({ userId: String(existing?._id), email: String(existing?.email), teams: String(existing?.teams) })
            return res.status(200).json({ status: true, token, user: existing })
        } else {
            return res.status(500).json({ message: "invalid credentials" })
        }

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
}

// getUsers
export async function getUsers(req: Request, res: Response) {
    try {

        const existing = await User.find()
        if (!existing) {
            return res.status(404).json({ status: false, message: "User not found" })
        }

        return res.status(200).json({ status: true, user: existing })

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
}

