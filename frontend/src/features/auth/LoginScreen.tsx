import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import type { ILoginForm } from '../../types/models';

export const LoginScreen: React.FC = () => {
    const [formData, setFormData] = useState<ILoginForm>({
        email: 'admin@gmail.com',
        password: 'admin@123'
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { isLoading, login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const success = await login(formData.email, formData.password);
        if (success) {
            setSuccess('Login successful! Redirecting...');
        } else {
            setError('Invalid email or password. Use test credentials provided.');
        }
    };

    if (isAuthenticated) return null;

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col justify-center items-center p-4 font-sans">
            <div className="w-full max-w-md">
                <div className="bg-white dark:bg-gray-800 p-10 rounded-xl shadow-2xl transition duration-300 transform border border-gray-200 dark:border-gray-700">
                    <div className="flex justify-center items-center mb-6">
                        <span className="text-4xl font-black text-indigo-600 dark:text-indigo-400">
                            TaskFlow Pro
                        </span>
                    </div>

                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 text-center">
                        Sign In
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            label="Email address"
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="user@taskflow.pro"
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

                        {error && (
                            <div className="p-3 bg-red-100 border border-red-400 rounded-lg text-red-700 text-sm" role="alert">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="p-3 bg-green-100 border border-green-400 rounded-lg text-green-700 text-sm" role="alert">
                                {success}
                            </div>
                        )}

                        <Button type="submit" isLoading={isLoading} className="w-full">
                            <span>Sign In</span>
                        </Button>
                    </form>

                    <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
                        Need an account?
                        <button
                            onClick={() => navigate('/register')}
                            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 cursor-pointer ml-1"
                        >
                            Sign up
                        </button>
                    </p>

                    <div className="mt-4 p-2 text-xs text-center text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/50 rounded-md">
                        <span className="font-semibold">Test Credentials:</span> user@taskflow.pro / password
                    </div>
                </div>
            </div>
        </div>
    );
};