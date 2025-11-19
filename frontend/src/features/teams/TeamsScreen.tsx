import React from 'react';
import { useAppSelector } from '../../hooks/redux';

export const TeamsScreen: React.FC = () => {
    const { teams } = useAppSelector((state) => state.data);

    return (
        <div className="h-full">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Teams Management
            </h1>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Manage your teams and collaborations here.
                </p>
                <ul className="space-y-2">
                    {teams.map(team => (
                        <li key={team._id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg font-medium text-gray-800 dark:text-gray-200">
                            {team.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};