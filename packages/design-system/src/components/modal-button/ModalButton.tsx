import { ButtonHTMLAttributes } from 'react';

import { cn } from '../../lib/utils';

interface ModalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  variant?: 'right' | 'left' | 'default';
  isSelected?: boolean;
}

interface ModalButtonWrapperProps {
  children: ModalButtonProps[];
}

export default function ModalButton({
  text,
  variant = 'default',
  isSelected,
  ...props
}: ModalButtonProps) {
  if (variant === 'default') {
    return (
      <button
        type="button"
        className={cn(
          'body1 flex h-[5.6rem] w-[55rem] items-center justify-center rounded-b-[3.2rem] bg-pink-100 px-[3.2rem] py-[1.6rem] text-pink-500 hover:bg-pink-200',
          isSelected && 'bg-pink-500'
        )}
        onClick={props.onClick}
        {...props}
      >
        {text}
      </button>
    );
  }

  if (variant === 'left') {
    return (
      <button
        className={cn(
          'body1 flex h-[5.6rem] w-[27.5rem] items-center justify-center bg-white px-[3.2rem] py-[1rem] text-gray-600 hover:bg-pink-100',
          isSelected && 'bg-pink-100'
        )}
        style={{ borderBottomLeftRadius: '3.2rem' }}
        onClick={props.onClick}
        {...props}
      >
        {text}
      </button>
    );
  }

  if (variant === 'right') {
    return (
      <button
        className={cn(
          'body1 flex h-[5.6rem] w-[27.5rem] items-center justify-center bg-pink-100 px-[3.2rem] py-[1rem] text-pink-500 hover:bg-pink-200',
          isSelected && 'bg-pink-200'
        )}
        style={{ borderBottomRightRadius: '3.2rem' }}
        onClick={props.onClick}
        {...props}
      >
        {text}
      </button>
    );
  }
}

export const ModalButtonWrapper = ({ children }: ModalButtonWrapperProps) => {
  return (
    <div className="flex items-center">
      {children.map((child, index) => (
        <div key={`${child.text}-${index}`} className="flex items-center">
          <ModalButton
            text={child.text}
            onClick={child.onClick}
            variant={child.variant}
            isSelected={child.isSelected}
          />
          {index < children.length - 1 && (
            <div className="h-[5.6rem] w-[2px] bg-pink-500" />
          )}
        </div>
      ))}
    </div>
  );
};
