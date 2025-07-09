import { SvgArrowDown } from '@/icons';

interface MoreButtonProps {
  onClick: () => void;
}

export default function MoreButton({ onClick }: MoreButtonProps) {
  return (
    <div
      onClick={onClick}
      className="flex h-[6rem] cursor-pointer items-center justify-center gap-[0.8rem] self-stretch px-[3.2rem] py-[1rem]"
    >
      <SvgArrowDown />
      <p className="jp-title2 font-bold text-gray-800">もっと見る</p>
    </div>
  );
}
