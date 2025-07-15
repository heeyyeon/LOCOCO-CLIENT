import { ComponentProps } from 'react';
import { SvgAvatar } from '../../icons/fill/components/Avatar';

export default function Avatar({ src, ...props }: ComponentProps<'img'>) {
  return src ? (
    <img
      className="aspect-square h-[4.4rem] w-[4.4rem] rounded-[0.55rem] object-cover"
      src={src}
      alt="profile image"
      aria-label="profile image"
      {...props}
    />
  ) : (
    <SvgAvatar
      className="aspect-square h-[4.4rem] w-[4.4rem]"
      aria-label="default profile icon"
    />
  );
}
