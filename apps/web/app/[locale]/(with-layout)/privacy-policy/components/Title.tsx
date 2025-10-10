import React from 'react';

interface TitleProps {
  title: string;
}

export default function Title({ title }: TitleProps) {
  return <p className="title3 font-[700] text-gray-800">{title}</p>;
}
