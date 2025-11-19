import React from 'react';
import { useApp } from '../../context/AppContext';
import { TaskCard } from './TaskCard';
import type { ITask, TaskStatus } from '../../types/models'
import { STATUS_COLORS } from '../../constants';

interface TaskColumnProps {
    status: TaskStatus;
    tasks: ITask[];
    onTaskClick: (task: ITask) => void;
}

export const TaskColumn: React.FC<TaskColumnProps> = ({ status, tasks, onTaskClick }) => {
    const { dispatch } = useApp();

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.currentTarget.classList.add('shadow-xl', 'ring-2', 'ring-indigo-500');
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.currentTarget.classList.remove('shadow-xl', 'ring-2', 'ring-indigo-500');
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.currentTarget.classList.remove('shadow-xl', 'ring-2', 'ring-indigo-500');

        const taskId = e.dataTransfer.getData('taskId');
        if (taskId) {
            dispatch({ type: 'UPDATE_TASK', payload: { id: taskId, updates: { status: status } } });
        }
    };

    return (
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`flex-1 min-w-[280px] max-w-[320px] p-4 rounded-xl ${STATUS_COLORS[status]} shadow-inner transition-all duration-200 overflow-y-auto max-h-[calc(100vh-140px)]`}
        >
            <h3 className="font-bold text-lg mb-4 flex justify-between items-center text-gray-800">
                {status} <span className="text-sm font-normal bg-white/50 px-2 py-0.5 rounded-full">{tasks.length}</span>
            </h3>
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} onClick={onTaskClick} />
            ))}
            {tasks.length === 0 && (
                <div className="text-center p-6 text-gray-500 italic border border-dashed border-gray-400 rounded-lg">
                    Drop tasks here
                </div>
            )}
        </div>
    );
};