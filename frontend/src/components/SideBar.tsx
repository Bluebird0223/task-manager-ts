import React from 'react';
import { useApp } from '../context/AppContext';
import { findUser } from '../utils/helpers';
import { AssigneeDragTarget } from './AssignDragTarget';

interface SidebarProps {
    onOpenAdminPanel: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpenAdminPanel }) => {
    const { state, dispatch, currentUser, isAdmin } = useApp();

    const manageableUsers = state.users.filter(u => u.id !== 'u4');

    return (
        <div className="w-72 bg-gray-800 text-white flex flex-col shrink-0 shadow-2xl">
            <div className="p-4 border-b border-gray-700">
                <h1 className="text-2xl font-bold text-indigo-400">TaskFlow Pro</h1>
                <p className="text-xs text-gray-400 mt-1">Role-Based Access Demo</p>
            </div>

            <div className="p-4 border-b border-gray-700 space-y-3">
                <h3 className="text-sm font-semibold text-gray-300">Current User:</h3>
                <div className={`p-3 rounded-lg ${isAdmin ? 'bg-red-800' : 'bg-blue-800'}`}>
                    <p className="text-lg font-bold">{currentUser?.name.split(' (')[0]}</p>
                    <p className="text-sm">{currentUser?.role} Access</p>
                </div>

                <label className="block">
                    <span className="text-xs font-medium text-gray-400">Switch User (Simulate Login)</span>
                    <select
                        value={state.currentUserId}
                        onChange={(e) => dispatch({ type: 'SET_CURRENT_USER', payload: e.target.value })}
                        className="mt-1 w-full p-2 border rounded-lg text-gray-800 text-sm"
                    >
                        {manageableUsers.map(user => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            {isAdmin && (
                <div className="p-4 border-b border-gray-700">
                    <h3 className="text-xs font-semibold uppercase text-red-400 mb-2">Admin Tools</h3>
                    <button
                        onClick={onOpenAdminPanel}
                        className="w-full text-left px-3 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition shadow"
                    >
                        Manage Users (CRUD)
                    </button>
                </div>
            )}

            <div className="p-4 border-b border-gray-700">
                <h3 className="text-xs font-semibold uppercase text-gray-400 mb-2">Drag Task to Assign</h3>
                <div className="space-y-2">
                    {manageableUsers.map(user => (
                        <AssigneeDragTarget key={user.id} user={user} />
                    ))}
                    <AssigneeDragTarget key="unassigned" user={findUser(state.users, 'u4')!} />
                </div>
            </div>

            {/* <div className="flex-1 p-4">
                <h3 className="text-xs font-semibold uppercase text-gray-400 mb-2">Instructions</h3>
                <ul className="text-sm text-gray-300 space-y-1">
                    <li>1. Switch the user above to test **Admin** vs **User** access.</li>
                    <li>2. Admin can access the **Manage Users** panel for User CRUD.</li>
                    <li>3. Drag tasks to update status or assignee.</li>
                    <li>4. Click tasks for details (CRUD: **U** & **D**).</li>
                </ul>
            </div> */}
        </div>
    );
};