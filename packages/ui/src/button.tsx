'use client';

import { ReactNode } from 'react';
import { cn } from './lib/cn';

interface ButtonProps {
  children: ReactNode;
  className?: string;
  appName: string;
}

export const Button = ({ children, className, appName }: ButtonProps) => {
  console.log(className);
  return (
    <button
      className={cn(
        'text-blue hover:bg-color-pink-500 rounded-md bg-gray-500 px-4 py-2 font-bold text-white transition-colors',
        className
      )}
      onClick={() => alert(`Hello from your ${appName} app!`)}
    >
      {children}
    </button>
  );
};
