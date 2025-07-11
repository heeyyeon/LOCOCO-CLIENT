import { cn } from '@/lib/utils';
import { SvgCheckNonBg } from '../../icons/fill/components/CheckNonBg';

interface TagProps {
  text: string;
  className?: string;
}

export default function Tag({ text, className }: TagProps) {
  return (
    <div
      className={cn(
        'jp-caption1 inline-flex w-fit items-center justify-center gap-[0.4rem] rounded-[0.4rem] bg-gray-100 px-[0.8rem] py-[0.45rem] font-[500] text-gray-800',
        className
      )}
    >
      <SvgCheckNonBg className="fill-green" size={20} />
      <p>{text}</p>
    </div>
  );
}
