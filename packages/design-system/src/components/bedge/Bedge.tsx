import React from 'react';

interface BedgeProps {
  rank: string;
}

export default function Bedge({ rank }: BedgeProps) {
  if (rank === '1') {
    return (
      <div className="text-en-title2 flex h-[3.6rem] w-[3.6rem] items-center justify-center bg-pink-500 font-[700] text-white">
        {rank}
      </div>
    );
  } else {
    return (
      <div className="text-en-title2 flex h-[3.6rem] w-[3.6rem] items-center justify-center border-b-[0.1rem] border-r-[0.1rem] border-pink-500 bg-pink-100 font-[700] text-pink-500">
        {rank}
      </div>
    );
  }
}
