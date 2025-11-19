import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { TaskPriority } from '../../types/models';
import { PRIORITY_COLORS } from '../../constants';

export const TaskCreationForm: React.FC = () => {
    const { dispatch } = useApp();
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState<TaskPriority>('medium');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        dispatch({
            type: 'ADD_TASK',
            payload: {
                title: title.trim(),
                description: 'A brief description of the task...',
                status: 'todo',
                assigneeId: null,
                priority: priority,
            }
        });

        setTitle('');
        setPriority('medium');
        setIsModalOpen(false);
    };

    if (!isModalOpen) {
        return (
            <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition shadow-lg w-full sm:w-auto"
            >
                + Create New Task
            </button>
        );
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl space-y-4">
                <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">Create New Task</h3>
                <label className="block">
                    <span className="text-sm font-medium text-gray-700">Task Title</span>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., Design API documentation"
                        required
                    />
                </label>
                <label className="block">
                    <span className="text-sm font-medium text-gray-700">Priority</span>
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value as TaskPriority)}
                        className={`mt-1 w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${PRIORITY_COLORS[priority]}`}
                    >
                        {(['high', 'medium', 'low'] as TaskPriority[]).map(p => (
                            <option key={p} value={p}>{p}</option>
                        ))}
                    </select>
                </label>
                <div className="flex justify-end space-x-3 pt-2">
                    <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-2 text-gray-600 rounded-lg border hover:bg-gray-100 transition font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
                    >
                        Add Task
                    </button>
                </div>
            </form>
        </div>
    );
};