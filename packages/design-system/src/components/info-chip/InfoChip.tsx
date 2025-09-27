import { cva } from 'class-variance-authority';

import { SvgParticipant } from '../../icons';
import { cn } from '../../lib/utils';

interface InfoChipProps {
  icon?: boolean;
  text: string;
  color?: 'default' | 'green' | 'red' | 'blue';
  size?: 'md' | 'lg';
  className?: string;
}

const infoChipVariants = cva(
  'inline-flex items-center gap-[0.5rem] border text-inter-caption',
  {
    variants: {
      color: {
        default: 'border-gray-400 text-gray-700',
        green: 'border-green text-green',
        red: 'border-red text-red',
        blue: 'border-blue text-blue',
      },
      size: {
        md: 'rounded-[1.6rem] px-2 py-1 caption1',
        lg: 'rounded-[2.4rem] py-[0.6rem] px-[1.6rem] body1',
      },
    },
  }
);

const ICON_SIZES = {
  md: 16,
  lg: 20,
};

const getIconColor = (color: 'default' | 'green' | 'red' | 'blue') => {
  const colorMap = {
    default: '#374151',
    green: '#10b981',
    red: '#ef4444',
    blue: '#3b82f6',
  };
  return colorMap[color];
};

export default function InfoChip({
  icon,
  text,
  color = 'default',
  size = 'md',
  className,
}: InfoChipProps) {
  return (
    <div className={cn(infoChipVariants({ color, size }), className)}>
      {icon && (
        <SvgParticipant size={ICON_SIZES[size]} fill={getIconColor(color)} />
      )}
      <span>{text}</span>
    </div>
  );
}
