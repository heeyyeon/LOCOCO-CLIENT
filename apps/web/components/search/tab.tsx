'use client';

type TabButtonProps = {
  label: string;
  count: number;
  isSelected: boolean;
  onClick: () => void;
};

export const TabButton = ({
  label,
  count,
  isSelected,
  onClick,
}: TabButtonProps) => {
  const baseStyle =
    'flex h-[6rem] flex-[1_0_0] items-center justify-center gap-[1rem] px-[2rem] py-[1rem] font-bold text-gray-800 border-b-2 bg-white';
  const selectedStyle = 'text-en-title2 border-gray-800';
  const unselectedStyle = 'text-jp-title2 border-gray-300';

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${isSelected ? selectedStyle : unselectedStyle}`}
    >
      <p className="whitespace-nowrap">{label}</p>
      <p>({count})</p>
    </button>
  );
};
