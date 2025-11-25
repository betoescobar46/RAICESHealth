import React from 'react';
import { cn } from '../../utils/helpers';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-orange-600 text-white shadow-sm',
      secondary: 'bg-amber-100 text-amber-900 border border-orange-300',
      destructive: 'bg-red-600 text-white',
      outline: 'border-2 border-orange-600 text-orange-700 bg-white',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium',
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = 'Badge';

export default Badge;
