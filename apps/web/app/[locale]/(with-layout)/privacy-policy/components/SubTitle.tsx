import React from 'react';

interface SubTitleProps {
  subTitle: string;
}

export default function SubTitle({ subTitle }: SubTitleProps) {
  return <p className="body2 font-[700] text-gray-800">{subTitle}</p>;
}
