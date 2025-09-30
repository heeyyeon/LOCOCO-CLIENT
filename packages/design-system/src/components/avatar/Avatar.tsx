import { ComponentProps } from 'react';

import { SvgAvatar } from '../../icons/fill/components/Avatar';
import { cn } from '../../lib/utils';

export default function Avatar({
  src,
  rounded = true,
  ...props
}: ComponentProps<'img'> & { rounded?: boolean }) {
  return src ? (
    <img
      className={cn(
        'aspect-square h-[4.4rem] w-[4.4rem] rounded-[0.55rem] object-cover',
        rounded && 'rounded-full'
      )}
      src={src}
      alt="profile image"
      aria-label="profile image"
      {...props}
    />
  ) : (
    <SvgAvatar
      className={cn(
        'aspect-square h-[4.4rem] w-[4.4rem]',
        rounded && 'rounded-full'
      )}
      aria-label="default profile icon"
    />
  );
}
