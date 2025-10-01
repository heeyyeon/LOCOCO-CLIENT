import React from 'react';

import Image from 'next/image';

import { SvgAvatar } from '@lococo/icons';

interface CreatorInfoProps {
  name: string;
  image: string;
  id: string;
  date: string;
}
export default function CreatorInfo({
  name,
  image,
  id,
  date,
}: CreatorInfoProps) {
  return (
    <div className="flex w-full justify-between">
      <div className="flex items-center gap-[2.4rem]">
        {image === '' ? (
          <SvgAvatar
            className="aspect-square h-[7.2rem] w-[7.2rem] rounded-full"
            aria-label="default profile icon"
          />
        ) : (
          <Image
            src={image}
            alt={name}
            width={72}
            height={72}
            className="rounded-full"
          />
        )}
        <div className="flex flex-col gap-[0.4rem]">
          <p className="body1 font-bold text-gray-800">{name}</p>
          <p className="body3 text-gray-600">{id}</p>
        </div>
      </div>
      <div className="body3 flex items-end text-gray-800">{date}</div>
    </div>
  );
}
