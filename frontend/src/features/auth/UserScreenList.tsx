import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/Button';
import { authApi } from '../../api/auth';

interface User {
    _id: string;
    name: string;
    email: string;
    role: 'admin' | 'user';
    createdAt: string;
    teams?: string[]
}

export const UsersListScreen: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setIsLoading(true);
                const response = await authApi.getUsers();
                if (response?.status && Array.isArray(response.user)) {
                    const transformedUsers = response.user.map(user => ({
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role || 'user',
                        createdAt: user.createdAt,
                        teams: user.teams || []
                    }));

                    setUsers(transformedUsers);
                } else {
                    setError('Failed to fetch users: Invalid response format');
                }
            } catch (err) {
                setError('Failed to fetch users');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleEditUser = (userId: string) => {
        // Navigate to edit user page or open modal
        console.log('Edit user:', userId);
    };

    const handleDeleteUser = async (userId: string) => {
        if (!window.confirm('Are you sure you want to delete this user?')) {
            return;
        }

        try {
            // TODO: Replace with actual API call
            // await usersApi.deleteUser(userId);
            setUsers(users.filter(user => user._id !== userId));
        } catch (err) {
            setError('Failed to delete user');
        }
    };

    const handleToggleRole = async (userId: string, currentRole: 'admin' | 'user') => {
        try {
            const newRole = currentRole === 'admin' ? 'user' : 'admin';
            // await apiClient.updateUserRole(userId, newRole);

            setUsers(users.map(user =>
                user._id === userId ? { ...user, role: newRole } : user
            ));
        } catch (err) {
            setError('Failed to update user role');
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    User Management
                </h2>
                <Button onClick={() => window.location.href = '/admin/register-user'}>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Add New User
                </Button>
            </div>

            {error && (
                <div className="p-4 mb-4 bg-red-100 border border-red-400 rounded-lg text-red-700">
                    {error}
                </div>
            )}

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    User
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Role
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Created
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
                            {users.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold text-sm mr-3">
                                                {user.name[0].toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {user.name}
                                                </div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                    {user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.role === 'admin'
                                            ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                        <Button
                                            variant="secondary"
                                            onClick={() => handleToggleRole(user._id, user.role)}
                                            className="text-xs"
                                        >
                                            {user.role === 'admin' ? 'Make User' : 'Make Admin'}
                                        </Button>
                                        <Button
                                            variant="secondary"
                                            onClick={() => handleEditUser(user._id)}
                                            className="text-xs"
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={() => handleDeleteUser(user._id)}
                                            className="text-xs"
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {users.length === 0 && !isLoading && (
                    <div className="text-center py-12">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No users</h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Get started by creating a new user.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};