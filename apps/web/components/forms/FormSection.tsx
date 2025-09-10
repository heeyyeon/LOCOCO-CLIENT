import React, { ReactNode } from 'react';

interface FormSectionProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function FormSection({
  title,
  description,
  children,
}: FormSectionProps) {
  return (
    <div className="space-y-[1.6rem]">
      <div>
        <h2 className="kr-title2 font-bold text-gray-800">{title}</h2>
        <p className="kr-body4 mt-[0.4rem] text-gray-500">{description}</p>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
