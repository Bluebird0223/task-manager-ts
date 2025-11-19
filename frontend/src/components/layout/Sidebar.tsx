import React, { useState } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { useNavigate } from 'react-router-dom';
import type { ObjectId } from '../../types/models';

export const Sidebar: React.FC = () => {
    const { teams, projects } = useAppSelector((state) => state.data);
    const navigate = useNavigate();
    const [selectedTeamId, setSelectedTeamId] = useState<ObjectId>('t1');

    const filteredProjects = projects.filter(p => p.team === selectedTeamId);

    const navItems = [
        { name: 'Dashboard', icon: '📊', route: '/dashboard' },
        { name: 'Teams', icon: '👥', route: '/teams' },
        { name: 'Projects', icon: '📋', route: '/projects' },
    ];

    return (
        <div className="w-64 shrink-0 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-4 overflow-y-auto hidden md:block">
            <nav className="space-y-1">
                {navItems.map((item) => (
                    <button
                        key={item.name}
                        onClick={() => navigate(item.route)}
                        className="flex items-center space-x-3 p-2 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700 transition cursor-pointer w-full text-left"
                    >
                        <span>{item.icon}</span>
                        <span className="font-medium">{item.name}</span>
                    </button>
                ))}
            </nav>

            <div className="mt-8">
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                    Teams
                </h3>
                <select
                    value={selectedTeamId}
                    onChange={(e) => setSelectedTeamId(e.target.value)}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white mb-4"
                >
                    {teams.map(team => (
                        <option key={team._id} value={team._id}>{team.name}</option>
                    ))}
                </select>
            </div>

            <div>
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                    Projects in {teams.find(t => t._id === selectedTeamId)?.name}
                </h3>
                <nav className="space-y-1">
                    {filteredProjects.map((project) => (
                        <button
                            key={project._id}
                            onClick={() => navigate('/projects')}
                            className="flex items-center space-x-3 p-2 text-sm text-gray-600 dark:text-gray-400 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700 transition cursor-pointer w-full text-left"
                        >
                            <span>📄</span>
                            <span className="truncate">{project.name}</span>
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
};