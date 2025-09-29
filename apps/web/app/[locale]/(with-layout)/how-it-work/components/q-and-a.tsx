'use client';

import React, { useState } from 'react';

import { SvgMinuns, SvgPlus } from '@lococo/icons';

interface QAndAProps {
  question: string;
  answer: string;
}

export default function QAndA({ question, answer }: QAndAProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col gap-[3.5rem]">
        <div className="flex w-full justify-between px-[1.6rem]">
          <div className="title3 flex w-full items-center gap-[3.2rem] font-bold">
            <p>Q.</p>
            <p>{question}</p>
          </div>
          <button onClick={handleOpen} className="cursor-pointer">
            {isOpen ? (
              <SvgMinuns
                width={32}
                height={32}
                className="bg-white fill-black"
              />
            ) : (
              <SvgPlus width={32} height={32} className="bg-white fill-black" />
            )}
          </button>
        </div>
        <div className="h-[1px] w-full bg-black" />
      </div>
      {isOpen && (
        <div className="title3 flex w-full items-center gap-[3.2rem] rounded-b-[2.4rem] bg-pink-100 px-[1.6rem] py-[2.4rem] font-bold">
          <p>A.</p>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}
