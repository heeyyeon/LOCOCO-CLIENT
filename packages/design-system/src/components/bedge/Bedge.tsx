import React from 'react';

interface BedgeProps {
  rank: string;
}

export default function Bedge({ rank }: BedgeProps) {
  return (
    <div className="text-en-title2 flex h-[3.6rem] w-[3.6rem] items-center justify-center bg-pink-500 font-[700] text-white">
      {rank}
    </div>
  );
}
