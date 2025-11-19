import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getInitials } from '../utils/helpers';
import type { IUser } from '../types/models';

interface AssigneeDragTargetProps {
    user: IUser;
}

export const AssigneeDragTarget: React.FC<AssigneeDragTargetProps> = React.memo(({ user }) => {
    const { dispatch } = useApp();
    const [isHovering, setIsHovering] = useState(false);

    const assigneeId = user?._id === 'u4' ? null : user?._id;

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsHovering(true);
    };

    const handleDragLeave = () => {
        setIsHovering(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsHovering(false);

        const taskId = e.dataTransfer.getData('taskId');
        if (taskId) {
            dispatch({
                type: 'UPDATE_TASK',
                payload: { id: taskId, updates: { assigneeId: assigneeId } }
            });
        }
    };

    const avatarStyle = user?._id === 'u4'
        ? 'bg-gray-400 text-white'
        : user?.role === 'admin'
            ? 'bg-red-500 text-white'
            : isHovering
                ? 'bg-indigo-600 ring-4 ring-indigo-300'
                : 'bg-blue-500';

    const initials = user?._id === 'u4' ? '?' : getInitials(user?.name);
    const userName = user?._id === 'u4' ? 'Unassign' : user?.name.split(' ')[0];

    return (
        <div
            className={`p-2 rounded-xl transition-all duration-150 ${isHovering ? 'bg-gray-700/80 shadow-lg' : 'hover:bg-gray-700'}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <div className="flex items-center space-x-3 cursor-pointer">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-md font-bold transition-all ${avatarStyle}`}>
                    {initials}
                </div>
                <div className="text-sm">
                    <p className="font-medium text-gray-200">{userName}</p>
                    <p className="text-xs text-gray-400">{user?._id === 'u4' ? 'Drag here to unassign' : user?.role === 'admin' ? 'admin' : 'user'}</p>
                </div>
            </div>
        </div>
    );
});