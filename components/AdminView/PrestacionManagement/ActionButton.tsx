import React from 'react';

interface ActionButtonProps {
    type: 'enable' | 'disable' | 'delete';
    onClick: () => void;
    title: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ type, onClick, title }) => {
    let styles = '';
    let icon: React.ReactElement;

    switch (type) {
        case 'enable':
            styles = 'text-green-600 hover:bg-green-100';
            icon = (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
            );
            break;
        case 'disable':
            styles = 'text-red-600 hover:bg-red-100';
            icon = (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
            );
            break;
        case 'delete':
            styles = 'text-gray-500 hover:bg-gray-200';
            icon = (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
            );
            break;
    }

    return (
        <button onClick={onClick} title={title} className={`p-1 rounded-full ${styles}`}>
            {icon}
        </button>
    );
};
