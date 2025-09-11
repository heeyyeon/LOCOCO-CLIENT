import { cn } from '../../lib/utils';

interface ModalHeaderProps {
  text: string;
}

export default function ModalHeader({ text, ...props }: ModalHeaderProps) {
  return (
    <div
      className={cn(
        'inter-title2 flex w-[55rem] items-center justify-center rounded-t-[3.2rem] border-b-[1px] border-pink-500 p-[1.6rem] text-pink-500'
      )}
      {...props}
    >
      {text}
    </div>
  );
}
