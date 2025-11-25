import React, { useState, useEffect } from 'react';

const CopyIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-3.5 w-3.5"} viewBox="0 0 20 20" fill="currentColor">
        <path d="M8 3a1 1 0 011-1h2a1 1 0 011 1v1h2V3a3 3 0 00-3-3H9a3 3 0 00-3 3v1H4a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3h-1V3zM4 7a1 1 0 011-1h10a1 1 0 011 1v10a1 1 0 01-1 1H5a1 1 0 01-1-1V7z" />
    </svg>
);

interface CopyButtonProps {
    value: string;
    label: string;
    onCopy?: () => void;
    className?: string;
    iconClassName?: string;
    children?: React.ReactNode;
}

export const CopyButton: React.FC<CopyButtonProps> = ({
    value,
    label,
    onCopy,
    className = '',
    iconClassName,
    children
}) => {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (copied) {
            const timer = setTimeout(() => setCopied(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [copied]);

    const handleCopy = () => {
        navigator.clipboard.writeText(value).catch(() => {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = value;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        });

        setCopied(true);
        onCopy?.();
    };

    return (
        <div className={`group flex items-center gap-1 hover:bg-zinc-100 pl-0.5 pr-1 py-0 rounded transition-colors relative ${className}`}>
            <button
                onClick={handleCopy}
                className={`transition-all p-0.5 rounded flex-shrink-0 ${
                    copied
                        ? 'bg-zinc-300 text-zinc-700'
                        : 'opacity-0 group-hover:opacity-100 hover:bg-zinc-200 text-gray-500'
                }`}
                title={`Copiar ${label}`}
            >
                <CopyIcon className={iconClassName || "h-3.5 w-3.5"} />
            </button>
            {children}
            {copied && <span className="text-xs text-zinc-700 ml-auto">✓</span>}
        </div>
    );
};
