import React from 'react';

export const DashboardScreen: React.FC = () => {
    return (
        <div className="h-full">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Application Dashboard
            </h1>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                    Welcome to the TaskFlow Pro dashboard! Use the sidebar to navigate to your teams and projects.
                </p>
            </div>
        </div>
    );
};