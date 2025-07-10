'use client';

import { useState, ChangeEvent, useEffect } from 'react';
import Image from 'next/image';
import { SvgAdd, SvgClose } from '@/icons';
import { ContentWithLabel } from './content-with-label';
import { ErrorNotice } from '@/components';

interface Props {
  file: File | null;
  onChange: (value: File | null) => void;
  error?: string;
}

export default function ReceiptCertification({
  file,
  onChange,
  error,
}: Props) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // file이 변경될 때마다 미리보기 URL 생성
  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImageUrl(null);
    }
  }, [file]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      onChange(selectedFile);
    }
    e.target.value = '';
  };

  const handleRemoveFile = () => {
    onChange(null);
  };

  return (
    <ContentWithLabel
      label="購入証明写真をアップロードしてください"
      className="flex-col border-b border-gray-400"
    >
      <p className="jp-caption3 text-blue pb-[2.4rem]">
        レシート・オンライン購入のキャプチャなど。
      </p>

      {!file && (
        <div className="relative">
          <input
            type="file"
            accept="image/jpeg, image/png, image/webp"
            className="flex aspect-square w-32 cursor-pointer items-center justify-center bg-gray-800 p-[2.2rem] opacity-0"
            onChange={handleFileChange}
          />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded bg-gray-800">
            <SvgAdd className="aspect-square size-[3.6rem] shrink-0 fill-white" />
          </div>
        </div>
      )}

      {file && imageUrl && (
        <div className="relative h-32 w-32">
          <Image
            src={imageUrl}
            alt="업로드된 영수증"
            className="h-full w-full rounded object-cover"
            width={80}
            height={80}
          />
          <button
            onClick={handleRemoveFile}
            className="rounded-[0.2px] absolute bottom-[0.4rem] right-[0.4rem] flex size-[1.8rem] items-center justify-center bg-black/30 p-[0.1rem]"
            type="button"
          >
            <SvgClose className="size-[1.6rem] fill-white" />
          </button>
        </div>
      )}
      {error && <ErrorNotice message={error} />}
    </ContentWithLabel>
  );
}
