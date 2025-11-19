import type { IUser, TaskStatus } from "../types/models";

export const TASK_STATUSES: TaskStatus[] = ['todo', 'inProgress', 'review', 'done'];

export const PRIORITY_COLORS = {
    high: 'text-red-600 bg-red-100',
    medium: 'text-yellow-600 bg-yellow-100',
    low: 'text-green-600 bg-green-100',
};

export const STATUS_COLORS = {
    todo: 'bg-gray-200',
    inProgress: 'bg-blue-200',
    review: 'bg-purple-200',
    done: 'bg-green-200',
};

export const MOCK_INITIAL_USERS: IUser[] = [
    { _id: 'u1', name: 'Alice Johnson', email: 'alice@gmail.com', role: 'admin' },
    { _id: 'u2', name: 'Bob Smith', email: 'bob@gmail.com', role: 'user' },
    { _id: 'u3', name: 'Charlie Brown', email: 'charlie@gmail.com', role: 'user' },
    { _id: 'u4', name: 'Unassigned Pool', email: 'unassigned@gmail.com', role: 'user' },
];

export const MOCK_INITIAL_TASKS = [
    { id: 't1', title: 'Setup Task Board', description: 'Create the main Kanban layout with four columns.', status: 'Done', assigneeId: 'u1', priority: 'High', createdAt: Date.now() - 3600000 },
    { id: 't2', title: 'Implement Drag-to-Assign', description: 'Ensure tasks can be dragged onto user avatars to change the assignee.', status: 'InProgress', assigneeId: 'u2', priority: 'High', createdAt: Date.now() - 1800000 },
    { id: 't3', title: 'Refine Modal Details', description: 'Make sure the edit and delete modal works correctly with the central state.', status: 'Todo', assigneeId: null, priority: 'Medium', createdAt: Date.now() },
    { id: 't4', title: 'Add Priority Colors', description: 'Visually distinguish tasks based on their priority level.', status: 'Todo', assigneeId: 'u3', priority: 'Low', createdAt: Date.now() + 600000 },
];