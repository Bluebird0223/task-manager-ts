import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
    isLoading?: boolean;
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    isLoading,
    children,
    className = '',
    ...props
}) => {
    let baseStyles = 'px-4 py-2 font-medium rounded-lg shadow-sm transition duration-150 flex items-center justify-center space-x-2';
    let variantStyles = '';

    switch (variant) {
        case 'primary':
            variantStyles = 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500';
            break;
        case 'secondary':
            variantStyles = 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400';
            break;
        case 'danger':
            variantStyles = 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500';
            break;
    }

    if (isLoading) {
        baseStyles += ' opacity-75 cursor-not-allowed';
    }

    return (
        <button
            className={`${baseStyles} ${variantStyles} ${className}`}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading ? (
                <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
            ) : null}
            {children}
        </button>
    );
};