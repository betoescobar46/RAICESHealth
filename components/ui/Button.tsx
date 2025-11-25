import React from 'react';
import { cn } from '../../utils/helpers';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const baseClasses =
      'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

    const variants = {
      default: 'bg-orange-600 text-white hover:bg-orange-700 active:bg-orange-800 shadow-sm',
      destructive: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
      outline: 'border-2 border-orange-600 bg-white hover:bg-orange-50 active:bg-orange-100 text-orange-700',
      secondary: 'bg-amber-100 text-amber-900 hover:bg-amber-200 active:bg-amber-300',
      ghost: 'hover:bg-orange-50 text-orange-700 active:bg-orange-100',
      link: 'text-orange-700 underline-offset-4 hover:underline',
    };

    const sizes = {
      default: 'h-10 px-5 py-2',
      sm: 'h-8 rounded-lg px-3 text-xs',
      lg: 'h-12 rounded-lg px-6 text-base',
      icon: 'h-10 w-10',
    };

    return (
      <button
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export default Button;
