import Image from 'next/image';

import BracketChip from './BracketChip';

interface CardProps {
  dueDate: string;
  chipVariant: 'expired' | 'active';
  brand: string;
  title: string;
  label: string[];
  maxPeople: number;
  applyPeople: number;
  src: string;
  id: string;
}

export default function Card({
  dueDate,
  brand,
  title,
  label,
  maxPeople,
  applyPeople,
  src,
  id,
  chipVariant,
}: CardProps) {
  // TODO onClick navigate id
  console.log(chipVariant);
  return (
    <div className="h-[33.1rem] w-[36rem] rounded-[2.4rem] bg-gray-700">
      <Image width={360} height={216} src={src} alt={`${title}상품 카드`} />
      <BracketChip dueDate={dueDate} chipVariant={chipVariant} />
      <div className="flex h-[11.5rem] w-full flex-col gap-[0.8rem] rounded-b-[2.4rem] bg-white p-[1.6rem]">
        <div>
          <p className="inter-body4">{brand}</p>
          <p className="inter-title3">{title}</p>
        </div>
        <div>라벨들</div>
      </div>
    </div>
  );
}
