import { IconButton } from '@lococo/design-system/icon-button';
import { SvgArrowRight } from '@lococo/icons';

interface NavigateColumnProps {
  isActive: boolean;
  onClick?: () => void;
}

export default function NavigateColumn({
  isActive,
  onClick,
}: NavigateColumnProps) {
  return isActive ? (
    <IconButton
      icon={<SvgArrowRight className="text-gray-400" />}
      onClick={onClick}
    />
  ) : (
    <></>
  );
}
