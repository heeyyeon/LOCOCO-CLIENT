import { ChangeEvent } from 'react';

import { SvgClose } from '../../icons';

interface ImageUploadProps {
  src?: string;
  alt?: string;
  handleFileChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  handleRemoveFile?: () => void;
  id?: string;
}

export default function ImagePreview({
  src,
  alt = 'image',
  handleFileChange,
  handleRemoveFile,
  ...props
}: ImageUploadProps) {
  return (
    <div className="border-1 relative h-[7.2rem] w-[7.2rem] rounded-[1.6rem] border-gray-200">
      <img
        src={src}
        alt={alt}
        className="h-full w-full rounded-[1.6rem] object-cover"
      />
      <input
        type="file"
        accept="image/*"
        className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
        onChange={handleFileChange}
        {...props}
      />
      <button
        onClick={handleRemoveFile}
        className="absolute bottom-[0.6rem] right-[0.6rem] z-20 flex h-[2rem] w-[2rem] cursor-pointer items-center justify-center rounded-full bg-black/30"
        type="button"
      >
        <SvgClose className="size-[1.6rem] fill-white" />
      </button>
    </div>
  );
}
