import React from 'react';

interface TextProps {
  text: string;
}

export default function Text({ text }: TextProps) {
  return <p className="body2 text-gray-800">{text}</p>;
}
