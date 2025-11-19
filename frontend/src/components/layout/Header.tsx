import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
    const { currentUser, logout, isAdmin } = useAuth();
    const navigate = useNavigate();

    return (
        <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center space-x-4">
                <button className="text-gray-600 dark:text-gray-300 md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <span
                    onClick={() => navigate('/dashboard')}
                    className="text-xl font-bold text-indigo-600 dark:text-indigo-400 cursor-pointer"
                >
                    TaskFlow Pro
                </span>
            </div>

            <div className="flex items-center space-x-4">
                {/* Admin-only buttons */}
                {/* {isAdmin && (
                    <div className="hidden md:flex items-center space-x-2">
                        <Button
                            onClick={() => navigate('/admin/users')}
                            variant="secondary"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                            </svg>
                            Users
                        </Button>
                        <Button
                            onClick={() => navigate('/admin/register-user')}
                            variant="secondary"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                            Add User
                        </Button>
                    </div>
                )} */}

                <div className="relative group">
                    <button className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                        <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold text-sm">
                            {currentUser?.name?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <span className="text-gray-700 dark:text-gray-300 text-sm hidden sm:inline">
                            {currentUser?.name}
                            {isAdmin && (
                                <span className="ml-1 text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                                    Admin
                                </span>
                            )}
                        </span>
                    </button>

                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-xl py-1 z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
                        <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-gray-600">
                            {currentUser?.email}
                        </div>

                        {/* Admin dropdown options */}
                        {isAdmin && (
                            <>
                                <button
                                    onClick={() => navigate('/admin/users')}
                                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer w-full text-left"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                    </svg>
                                    Manage Users
                                </button>
                                <button
                                    onClick={() => navigate('/admin/register-user')}
                                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer w-full text-left"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                    </svg>
                                    Add New User
                                </button>
                                <div className="border-t border-gray-100 dark:border-gray-600 my-1"></div>
                            </>
                        )}

                        <button
                            onClick={logout}
                            className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-gray-600 cursor-pointer w-full text-left"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4m7 14 4-4m0 0-4-4m4 4H9" />
                            </svg>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

// Simple Button component for Header
// const Button: React.FC<{
//     children: React.ReactNode;
//     onClick?: () => void;
//     variant?: 'primary' | 'secondary';
//     className?: string;
// }> = ({ children, onClick, variant = 'primary', className = '' }) => {
//     const baseStyles = 'px-3 py-2 text-sm font-medium rounded-lg transition duration-150 flex items-center';
//     const variantStyles = variant === 'primary'
//         ? 'bg-indigo-600 text-white hover:bg-indigo-700'
//         : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600';

//     return (
//         <button
//             onClick={onClick}
//             className={`${baseStyles} ${variantStyles} ${className}`}
//         >
//             {children}
//         </button>
//     );
// };