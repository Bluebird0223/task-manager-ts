import { Router } from "express";
import { getCurrentUser, getUsers, login, register } from "../controllers/authController";
import { authenticationUserJwt } from "../utils/middleware/auth";
import { createTeam, getTeam } from "../controllers/teamController";
import { createProject } from "../controllers/projectController";
import { createTask } from "../controllers/taskController";
import { createInvitation } from "../controllers/invitationController";
import { createComment } from "../controllers/commentController";
import { createActivity } from "../controllers/activityController";


const router = Router()

router.post("/auth/register", register)
router.post("/auth/login", login)
router.get('/auth/user', authenticationUserJwt, getUsers)
router.get('/auth/me', authenticationUserJwt, getCurrentUser)

// team
router.post('/team/create-team', authenticationUserJwt, createTeam)
router.get('/team/get-team', authenticationUserJwt, getTeam)

// project
router.post('/project/create-project', authenticationUserJwt, createProject)

// task
router.post('/task/create-task', authenticationUserJwt, createTask)

// invitation
router.post('/invitation/create-invitation', authenticationUserJwt, createInvitation)

// comment
router.post('/comment/create-comment', authenticationUserJwt, createComment)

// activity
router.post('/activity/create-activity', authenticationUserJwt, createActivity)

export default router