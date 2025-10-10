import React from 'react';

import SubTitle from './SubTitle';
import Text from './Text';
import Title from './Title';

interface SectionProps {
  title: string;
  children?: React.ReactNode;
}

export function Section({ title, children }: SectionProps) {
  return (
    <div className="flex flex-col gap-[2rem]">
      <Title title={title} />
      {children}
    </div>
  );
}

interface SubSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  items?: string[];
}

export function SubSection({ subtitle, description, items }: SubSectionProps) {
  return (
    <div className="flex flex-col gap-[1rem]">
      {subtitle && <SubTitle subTitle={subtitle} />}
      {description && <Text text={description} />}
      {items && (
        <ul className="flex list-disc flex-col gap-[1rem] pl-[2rem]">
          {items.map((item, index) => (
            <li key={index}>
              <Text text={item} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
