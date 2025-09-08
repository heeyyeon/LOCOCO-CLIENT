import { ChangeEvent } from 'react';

import { SvgAdd, SvgClose } from '../../icons';

interface ImageUploadProps {
  src?: string;
  alt?: string;
  handleFileChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  handleRemoveFile?: () => void;
  id?: string;
}

export default function ImageUpload({
  src,
  alt = 'image',
  handleFileChange,
  handleRemoveFile,
  id,
}: ImageUploadProps) {
  return (
    <>
      {src ? (
        <div className="relative h-[7.2rem] w-[7.2rem]">
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
            id={id}
          />
          <button
            onClick={handleRemoveFile}
            className="absolute bottom-[0.6rem] right-[0.6rem] z-20 flex h-[2rem] w-[2rem] cursor-pointer items-center justify-center rounded-full bg-black/30"
            type="button"
          >
            <SvgClose className="size-[1.6rem] fill-white" />
          </button>
        </div>
      ) : (
        <div className="flex h-[7.2rem] w-[7.2rem] items-center justify-center rounded-[1.6rem] bg-gray-800">
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
            onChange={handleFileChange}
          />
          <SvgAdd size={36} className="cursor-pointer fill-white" />
        </div>
      )}
    </>
  );
}
