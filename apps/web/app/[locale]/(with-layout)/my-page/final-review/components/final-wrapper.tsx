import React from 'react';

interface FinalWrapperProps {
  title: string;
  children: React.ReactNode;
}

export default function FinalWrapper({ title, children }: FinalWrapperProps) {
  return (
    <div className="flex w-full flex-col items-start gap-[1.6rem]">
      <p className="title2 font-bold text-gray-800">{title}</p>
      {children}
    </div>
  );
}
