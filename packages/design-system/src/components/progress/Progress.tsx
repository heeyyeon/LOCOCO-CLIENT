import { cn } from '../../lib/utils';

interface ProgressProps {
  value: number;
  width?: string;
  height?: string;
  className?: string;
}

export default function Progress({
  value,
  width = '100%',
  height = '0.75rem',
  className,
}: ProgressProps) {
  const percent = Math.min(Math.max(value, 0), 100);

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[10px] bg-gray-200',
        className
      )}
      style={{ width, height }}
    >
      <div
        className="absolute left-0 top-0 h-full bg-pink-500"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
