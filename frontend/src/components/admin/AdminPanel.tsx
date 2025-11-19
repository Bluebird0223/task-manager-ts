import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserManagementCard } from './UserManagementCard';
import type { UserRole } from '../../types/models';

interface AdminPanelProps {
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const { state, dispatch, currentUser } = useApp();
  const [newUserName, setNewUserName] = useState('');
  const [newUserRole, setNewUserRole] = useState<UserRole >('user');

  const usersToManage = state.users.filter(u => u.id !== 'u4');

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim()) return;

    const displayName = `${newUserName.trim()} (${newUserRole})`;
    dispatch({
      type: 'ADD_USER',
      payload: { name: displayName, role: newUserRole }
    });
    setNewUserName('');
  };

  if (currentUser?.role !== 'admin') {
    return (
      <div className="text-center p-8 text-red-500 bg-red-100 rounded-xl">
        ACCESS DENIED: Admins only.
      </div>
    );
  }
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4">
      <div className="bg-gray-50 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        <div className="p-6 border-b flex justify-between items-start sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-bold text-indigo-700">User & Access Management</h2>
          <button onClick={onClose} className="p-1 rounded-full text-gray-500 hover:bg-gray-100 transition flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          <div className="p-4 bg-white rounded-xl shadow-md border-2 border-dashed border-indigo-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New User (Admin CRUD: Create)</h3>
            <form onSubmit={handleAddUser} className="flex space-x-3">
              <input
                type="text"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                className="flex-1 p-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter full name"
                required
              />
              <select
                value={newUserRole}
                onChange={(e) => setNewUserRole(e.target.value as UserRole)}
                className="p-2 border rounded-lg"
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
              >
                Add User
              </button>
            </form>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Existing Users (Admin CRUD: Read, Update, Delete)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {usersToManage.map(user => (
                <UserManagementCard key={user.id} user={user} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};