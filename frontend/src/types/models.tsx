export type ObjectId = string;
export type Route = 'login' | 'register' | 'dashboard' | 'projects' | 'teams' | 'admin';
export type TaskStatus = 'todo' | 'inProgress' | 'review' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';
export type UserRole = 'admin' | 'user';

export interface IUser {
    _id: ObjectId;
    id?: string;
    name: string;
    email: string;
    teams?: string;
    role: 'admin' | 'user';
}

export interface IMe {
    status: Boolean,
    user: IUser
}

export interface ITeam {
    _id: ObjectId;
    name: string;
}

export interface IProject {
    _id: ObjectId;
    name: string;
    team: ObjectId;
}
export interface ILoginForm {
    email: string;
    password: string;
}
export interface IRegisterForm {
    name: string;
    email: string;
    password: string;
}

export interface ITask {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    assigneeId: string | null;
    priority: TaskPriority;
    createdAt: number;
}

export interface IAppState {
    tasks: ITask[];
    users: IUser[];
    currentUserId: string;
}

export type AppAction =
    | { type: 'ADD_TASK'; payload: Omit<ITask, 'id' | 'createdAt'> }
    | { type: 'UPDATE_TASK'; payload: { id: string; updates: Partial<ITask> } }
    | { type: 'DELETE_TASK'; payload: string }
    | { type: 'SET_CURRENT_USER'; payload: string }
    | { type: 'ADD_USER'; payload: Omit<IUser, 'id'> }
    | { type: 'UPDATE_USER'; payload: { id: string; updates: Partial<IUser> } }
    | { type: 'DELETE_USER'; payload: string };