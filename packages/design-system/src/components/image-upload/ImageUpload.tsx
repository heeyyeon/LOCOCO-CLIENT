import { ChangeEvent } from 'react';

import { SvgAdd } from '../../icons';

interface ImageUploadProps {
  handleFileChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function ImageUpload({
  handleFileChange,
  ...props
}: ImageUploadProps) {
  return (
    <div className="flex h-[7.2rem] w-[7.2rem] items-center justify-center rounded-[1.6rem] bg-gray-800">
      <input
        type="file"
        accept="image/*"
        className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
        onChange={handleFileChange}
        {...props}
      />
      <SvgAdd size={36} className="cursor-pointer fill-white" />
    </div>
  );
}
