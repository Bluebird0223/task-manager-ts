import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import type { ITask } from '../types/models';
import { TaskCreationForm } from './task/TaskCreationForm';
import { TaskColumn } from './task/TaskColumn';
import { TaskDetailModal } from './task/TaskDetailModal';
import { TASK_STATUSES } from '../constants';

interface KanbanBoardProps {
    onOpenAdminPanel: () => void;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ onOpenAdminPanel }) => {
    const { state } = useApp();
    const [selectedTask, setSelectedTask] = useState<ITask | null>(null);

    const tasksByStatus = useMemo(() => {
        return TASK_STATUSES.reduce((acc, status) => {
            acc[status] = state.tasks.filter(t => t.status === status);
            return acc;
        }, {} as Record<string, ITask[]>);
    }, [state.tasks]);

    const detailedTask = state.tasks.find(t => t.id === selectedTask?.id) || null;

    React.useEffect(() => {
        if (selectedTask && !detailedTask) {
            setSelectedTask(null);
        }
    }, [detailedTask, selectedTask]);

    return (
        <div className="flex-1 p-6 overflow-hidden">
            <header className="mb-6 pb-4 border-b border-gray-200 flex justify-between items-center flex-wrap gap-4">
                <h2 className="text-3xl font-extrabold text-gray-900">TaskFlow Board</h2>
                <TaskCreationForm />
            </header>

            <div className="flex space-x-4 h-full pb-6 overflow-x-auto">
                {TASK_STATUSES.map(status => (
                    <TaskColumn
                        key={status}
                        status={status}
                        tasks={tasksByStatus[status]}
                        onTaskClick={setSelectedTask}
                    />
                ))}
            </div>

            {detailedTask && (
                <TaskDetailModal
                    task={detailedTask}
                    onClose={() => setSelectedTask(null)}
                />
            )}
        </div>
    );
};