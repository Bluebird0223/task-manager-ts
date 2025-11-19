import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getInitials, findUser, } from '../../utils/helpers';
import type { ITask, TaskPriority, TaskStatus } from '../../types/models';
import { PRIORITY_COLORS, STATUS_COLORS } from '../../constants';

interface TaskDetailModalProps {
  task: ITask;
  onClose: () => void;
}

export const TaskDetailModal: React.FC<TaskDetailModalProps> = ({ task, onClose }) => {
  const { state, dispatch } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDesc, setEditedDesc] = useState(task.description);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const currentTask = state.tasks.find(t => t.id === task.id) || task;
  const assignee = findUser(state.users, currentTask.assigneeId);

  const handleSave = () => {
    dispatch({ 
        type: 'UPDATE_TASK', 
        payload: {
          id: currentTask.id,
          updates: {
            title: editedTitle,
            description: editedDesc,
          }
        }
    });
    setIsEditing(false);
  };

  const handleAttributeChange = (key: keyof ITask, value: string | null) => {
    const finalValue = (key === 'assigneeId' && value === 'u4') ? null : value;
    dispatch({ type: 'UPDATE_TASK', payload: { id: currentTask.id, updates: { [key]: finalValue } } });
  };

  const handleDelete = () => {
    dispatch({ type: 'DELETE_TASK', payload: currentTask.id });
    onClose();
  };
  
  const assigneeRoleColor = assignee?.role === 'admin' ? 'bg-red-500' : 'bg-blue-500';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        <div className="p-6 border-b flex justify-between items-start sticky top-0 bg-white z-10">
          <div className="flex items-center space-x-3 w-full pr-10">
            {isEditing ? (
              <input
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="text-2xl font-bold border-b border-gray-300 focus:outline-none w-full"
              />
            ) : (
              <h2 className="text-2xl font-bold text-gray-900">{currentTask.title}</h2>
            )}
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-gray-500 hover:bg-gray-100 transition shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h3 className="font-semibold text-lg text-gray-700 mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253" /></svg>
                Description
              </h3>
              {isEditing ? (
                <textarea
                  value={editedDesc}
                  onChange={(e) => setEditedDesc(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 min-h-[150px]"
                  placeholder="Detailed description of the task..."
                />
              ) : (
                <p className="text-gray-600 bg-gray-50 p-3 rounded-lg whitespace-pre-wrap min-h-[150px]">{currentTask.description}</p>
              )}
              <div className="mt-3 flex space-x-2">
                {isEditing ? (
                  <>
                    <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">Save Changes</button>
                    <button onClick={() => { setIsEditing(false); setEditedTitle(currentTask.title); setEditedDesc(currentTask.description); }} className="px-4 py-2 text-gray-600 rounded-lg border hover:bg-gray-100 transition font-medium">Cancel</button>
                  </>
                ) : (
                  <button onClick={() => setIsEditing(true)} className="px-4 py-2 text-gray-600 rounded-lg border hover:bg-gray-100 transition font-medium">Edit Title & Description</button>
                )}
              </div>
            </div>

            <div className="mt-10 pt-4 border-t border-red-200">
              <h3 className="font-semibold text-lg text-red-700 mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                Danger Zone
              </h3>
              <button
                onClick={() => setShowConfirmDelete(true)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
              >
                Delete This Task
              </button>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="p-4 bg-gray-50 rounded-xl border">
              <h4 className="font-semibold text-gray-700 mb-3">Task Attributes</h4>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">Status</label>
                <select
                  value={currentTask.status}
                  onChange={(e) => handleAttributeChange('status', e.target.value as TaskStatus)}
                  className={`w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${STATUS_COLORS[currentTask.status]}`}
                >
                  {(['todo', 'inProgress', 'review', 'done'] as TaskStatus[]).map(s => (<option key={s} value={s}>{s}</option>))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">Priority</label>
                <select
                  value={currentTask.priority}
                  onChange={(e) => handleAttributeChange('priority', e.target.value as TaskPriority)}
                  className={`w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${PRIORITY_COLORS[currentTask.priority]}`}
                >
                  {(['high', 'medium', 'low'] as TaskPriority[]).map(p => (<option key={p} value={p}>{p}</option>))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">Assignee</label>
                <select
                  onChange={(e) => handleAttributeChange('assigneeId', e.target.value || null)}
                  value={currentTask.assigneeId || 'u4'}
                  className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                  {state.users.map(member => (
                    <option key={member.id} value={member.id}>
                      {member.id === 'u4' ? 'Unassigned' : member.name}
                    </option>
                  ))}
                </select>
                {assignee && assignee.id !== 'u4' && (
                  <div className="mt-2 flex items-center space-x-2">
                    <div className={`w-8 h-8 rounded-full text-white flex items-center justify-center text-sm font-bold ${assigneeRoleColor}`}>
                      {getInitials(assignee.name)}
                    </div>
                    <span className="text-gray-700">{assignee.name}</span>
                  </div>
                )}
                {(!assignee || assignee.id === 'u4') && (
                  <span className="text-gray-500 text-sm mt-2 block">Currently unassigned.</span>
                )}
              </div>

              <p className="text-xs text-gray-500 mt-6 pt-4 border-t">
                Created: {new Date(currentTask.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {showConfirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-2xl space-y-4">
            <h3 className="text-xl font-bold text-red-700">Confirm Deletion</h3>
            <p className="text-gray-700">Are you sure you want to delete the task: <span className="font-semibold">"{currentTask.title}"</span>?</p>
            <div className="flex justify-end space-x-3 pt-2">
              <button
                onClick={() => setShowConfirmDelete(false)}
                className="px-4 py-2 text-gray-600 rounded-lg border hover:bg-gray-100 transition font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};