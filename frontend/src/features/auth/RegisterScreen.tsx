import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { authApi } from '../../api/auth';

interface RegisterForm {
    name: string;
    email: string;
    password: string;
}

export const RegisterScreen: React.FC = () => {
    const [formData, setFormData] = useState<RegisterForm>({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsLoading(true);

        try {
            // You might need to create a separate admin API endpoint for user creation
            const response = await authApi.register({
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });

            if (response.status) {
                setSuccess(`User ${formData.name} registered successfully!`);
                setFormData({ name: '', email: '', password: '' });
            } else {
                setError('Failed to register user. Please try again.');
            }
        } catch (error: any) {
            setError(error.response?.data?.message || 'Failed to register user.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Register New User
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Full Name"
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                />

                <Input
                    label="Email Address"
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="user@example.com"
                />

                <Input
                    label="Password"
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="********"
                />

                <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Role
                    </label>
                    {/* <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select> */}
                </div>

                {error && (
                    <div className="p-3 bg-red-100 border border-red-400 rounded-lg text-red-700 text-sm">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="p-3 bg-green-100 border border-green-400 rounded-lg text-green-700 text-sm">
                        {success}
                    </div>
                )}

                <div className="flex space-x-3">
                    <Button type="submit" isLoading={isLoading} className="flex-1">
                        Register User
                    </Button>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => navigate('/dashboard')}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
};