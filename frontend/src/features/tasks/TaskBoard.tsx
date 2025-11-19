import React from 'react';
import { useAppSelector } from '../../hooks/redux';

export const TaskBoard: React.FC = () => {
    const { projects } = useAppSelector((state) => state.data);
    const currentProject = projects[0];

    return (
        <div className="h-full">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Kanban Board: {currentProject?.name || 'Loading Project...'}
            </h1>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 text-center min-h-[500px] flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">
                    This is the main **Task Board**.
                </p>
            </div>
        </div>
    );
};