import React from 'react';
import { useApp } from '../../context/AppContext';
import { getInitials, findUser,  } from '../../utils/helpers';
import type { ITask } from '../../types/models';
import { PRIORITY_COLORS } from '../../constants';

interface TaskCardProps {
    task: ITask;
    onClick: (task: ITask) => void;
}

export const TaskCard: React.FC<TaskCardProps> = React.memo(({ task, onClick }) => {
    const { state } = useApp();
    const assignee = findUser(state.users, task.assigneeId);
    const assigneeRoleColor = assignee?.role === 'admin' ? 'bg-red-500' : 'bg-blue-500';

    return (
        <div
            className={`bg-white p-3 mb-3 rounded-xl shadow-md hover:shadow-lg transition cursor-grab border-l-4 ${task.priority === 'high' ? 'border-red-500' : task.priority === 'medium' ? 'border-yellow-500' : 'border-green-500'}`}
            onClick={() => onClick(task)}
            draggable
            onDragStart={(e) => {
                e.dataTransfer.setData('taskId', task.id);
                e.currentTarget.classList.add('opacity-50', 'border-dashed');
            }}
            onDragEnd={(e) => {
                e.currentTarget.classList.remove('opacity-50', 'border-dashed');
            }}
        >
            <h4 className="font-semibold text-sm mb-1 text-gray-800">{task.title}</h4>
            <div className="flex justify-between items-center text-xs mt-2">
                <span className={`px-2 py-0.5 rounded-full font-medium text-[10px] ${PRIORITY_COLORS[task.priority]}`}>
                    {task.priority}
                </span>
                {assignee && assignee.id !== 'u4' ? (
                    <div className="flex items-center space-x-1">
                        <span className="text-gray-600 truncate text-[11px]">{assignee.name.split(' ')[0]}</span>
                        <div className={`w-6 h-6 rounded-full text-white flex items-center justify-center text-xs font-bold ${assigneeRoleColor}`}>
                            {getInitials(assignee.name)}
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center space-x-1">
                        <span className="text-gray-500 italic text-[11px]">Unassigned</span>
                        <div className="w-6 h-6 rounded-full bg-gray-400 text-white flex items-center justify-center text-xs font-bold">
                            ?
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
});