import { cn } from '../../lib/utils';

interface ImageCampaginProps {
  src: string;
  alt: string;
  selected: boolean;
}

export default function ImageCampagin({
  src,
  alt,
  selected,
}: ImageCampaginProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn(
        'h-[7.2rem] w-[7.2rem] rounded-[1.6rem] object-cover',
        selected ? 'border-1 border-pink-500' : 'border-1 border-gray-200'
      )}
    />
  );
}
