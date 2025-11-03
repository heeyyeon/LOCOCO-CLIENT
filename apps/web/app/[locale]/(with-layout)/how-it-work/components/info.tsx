import React from 'react';

import { cn } from '@lococo/utils';

interface InfoProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  direction: 'left' | 'right';
}

export default function info({
  number,
  title,
  description,
  icon,
  direction,
}: InfoProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-[2.4rem] px-[2.4rem] py-[1.6rem]',
        direction === 'left' && 'justify-start',
        direction === 'right' && 'justify-end'
      )}
    >
      {direction === 'right' && icon}

      <div
        className={cn(
          'flex flex-col gap-[1.6rem]',
          direction === 'left' && 'items-end justify-end',
          direction === 'right' && 'justify-end'
        )}
      >
        <div className="title2 flex h-[4rem] w-[4rem] items-center justify-center rounded-full bg-pink-500 text-center font-[700] text-white">
          {number}
        </div>
        <div
          className={cn(
            'flex max-w-[36rem] flex-col justify-center',
            direction === 'left' && 'items-end text-right',
            direction === 'right' && 'items-start text-left'
          )}
        >
          <p className="title1 font-[700] text-gray-800">{title}</p>
          <p className="body3 break-words text-gray-600">{description}</p>
        </div>
      </div>
      {direction === 'left' && icon}
    </div>
  );
}
