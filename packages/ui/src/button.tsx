"use client";

import { ReactNode } from "react";
import { cn } from "./lib/cn";

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
        "px-4 py-2 rounded-md font-medium transition-colors bg-blue text-white hover:bg-color-pink-500",
        className
      )}
      onClick={() => alert(`Hello from your ${appName} app!`)}
    >
      {children}
    </button>
  );
};
