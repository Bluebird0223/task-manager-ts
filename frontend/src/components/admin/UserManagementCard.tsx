import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { IUser, UserRole } from '../../types/models';

interface UserManagementCardProps {
    user: IUser;
}

export const UserManagementCard: React.FC<UserManagementCardProps> = ({ user }) => {
    const { dispatch, currentUser } = useApp();
    const [name, setName] = useState(user.name.replace(/ \(Admin\)|\s\(User\)/g, ''));
    const [role, setRole] = useState<UserRole>(user.role);
    const [isEditing, setIsEditing] = useState(false);

    const isSelf = user.id === currentUser?.id;
    const isUnassignedPool = user.id === 'u4';
    const disableActions = isSelf || isUnassignedPool;

    const handleUpdate = () => {
        const displayName = `${name} (${role})`;
        dispatch({
            type: 'UPDATE_USER',
            payload: {
                id: user._id,
                updates: { name: displayName, role: role }
            }
        });
        setIsEditing(false);
    };

    const handleDelete = () => {
        if (!window.confirm(`Are you sure you want to delete user ${user.name}? This will unassign all their tasks.`)) return;
        dispatch({ type: 'DELETE_USER', payload: user._id });
    };

    return (
        <div className="p-3 bg-white rounded-lg shadow space-y-2 border-l-4 border-indigo-500">
            {isEditing ? (
                <div className="space-y-2">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-1 border rounded text-sm"
                        placeholder="User Name"
                    />
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value as UserRole)}
                        className="w-full p-1 border rounded text-sm"
                    >
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                    </select>
                    <div className="flex justify-end space-x-2">
                        <button onClick={handleUpdate} className="text-xs bg-indigo-500 text-white px-2 py-1 rounded hover:bg-indigo-600">Save</button>
                        <button onClick={() => setIsEditing(false)} className="text-xs border px-2 py-1 rounded">Cancel</button>
                    </div>
                </div>
            ) : (
                <>
                    <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                    <p className={`text-xs ${user.role === 'admin' ? 'text-red-500' : 'text-blue-500'} font-medium`}>ID: {user.id} | Role: {user.role}</p>
                    <div className="flex justify-end space-x-2">
                        <button
                            onClick={() => setIsEditing(true)}
                            disabled={disableActions}
                            className={`text-xs px-2 py-1 rounded transition ${disableActions ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                        >
                            Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={disableActions}
                            className={`text-xs px-2 py-1 rounded transition ${disableActions ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-red-500 text-white hover:bg-red-600'}`}
                        >
                            Delete
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};