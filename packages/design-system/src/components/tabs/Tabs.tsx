import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface TabsProps {
  children: ReactNode;
  className?: string;
}

export default function Tabs({ children, className }: TabsProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center justify-start overflow-hidden',
        className
      )}
    >
      {children}
    </div>
  );
}
