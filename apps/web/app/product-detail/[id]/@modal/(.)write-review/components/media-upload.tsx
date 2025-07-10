'use client';

import { useState, ChangeEvent, useEffect } from 'react';
import Image from 'next/image';
import { ErrorNotice } from '@/components';
import { SvgAdd, SvgClose } from '@/icons';
import { ContentWithLabel } from './content-with-label';

interface FileWithPreview {
  file: File;
  previewUrl: string;
  id: string;
  type: 'image' | 'video';
}

interface Props {
  files: File[];
  onChange: (files: File[]) => void;
  error?: string;
}

const getFileType = (file: File): 'image' | 'video' => {
  if (file.type.startsWith('image/')) return 'image';
  if (file.type.startsWith('video/')) return 'video';
  return 'image'; // 기본값
};

const canUploadFile = (
  files: File[],
  newFile: File
): { canUpload: boolean; error?: string } => {
  const newFileType = getFileType(newFile);

  if (files.length === 0) {
    return { canUpload: true };
  }

  const firstFile = files[0];
  if (!firstFile) {
    return { canUpload: true };
  }

  const existingFileType = getFileType(firstFile);

  if (existingFileType !== newFileType) {
    return {
      canUpload: false,
      error: '사진과 동영상은 동시에 업로드할 수 없습니다.',
    };
  }

  if (newFileType === 'video' && files.length >= 1) {
    return {
      canUpload: false,
      error: '동영상은 최대 1개까지 업로드 가능합니다.',
    };
  }

  if (newFileType === 'image' && files.length >= 5) {
    return {
      canUpload: false,
      error: '사진은 최대 5장까지 업로드 가능합니다.',
    };
  }

  return { canUpload: true };
};

export default function MediaUpload({ files, onChange, error }: Props) {
  const [filesWithPreview, setFilesWithPreview] = useState<FileWithPreview[]>(
    []
  );
  const [uploadError, setUploadError] = useState<string>('');

  useEffect(() => {
    const createPreviews = async () => {
      const previews = await Promise.all(
        files.map(async (file, index) => {
          return new Promise<FileWithPreview>((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
              const previewUrl = e.target?.result as string;
              resolve({
                file: file,
                previewUrl,
                id: `${Date.now()}-${index}`,
                type: getFileType(file),
              });
            };
            reader.readAsDataURL(file);
          });
        })
      );
      setFilesWithPreview(previews);
    };

    if (files.length > 0) {
      createPreviews();
    } else {
      setFilesWithPreview([]);
    }

    setUploadError('');
  }, [files]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const { canUpload, error: uploadError } = canUploadFile(
        files,
        selectedFile
      );

      if (canUpload) {
        onChange([...files, selectedFile]);
        setUploadError('');
      } else {
        setUploadError(uploadError || '업로드할 수 없습니다.');
      }
    }
    e.target.value = '';
  };

  const removeFile = (indexToRemove: number) => {
    const updatedFiles = files.filter((_, index) => index !== indexToRemove);
    onChange(updatedFiles);
    setUploadError('');
  };

  const currentFileType = files.length > 0 && files[0] ? getFileType(files[0]) : null;
  const maxFiles = currentFileType === 'video' ? 1 : 5;
  const canAddMore = files.length < maxFiles;

  return (
    <ContentWithLabel
      label="写真または動画をアップロードしてください"
      className="flex-col gap-[2.4rem] border-b border-gray-400"
    >
      <div className="flex flex-wrap gap-4">
        {filesWithPreview.map((fileItem, index) => (
          <div key={fileItem.id} className="relative h-32 w-32">
            {fileItem.type === 'image' ? (
              <Image
                src={fileItem.previewUrl}
                alt="업로드된 이미지"
                className="h-full w-full rounded object-cover"
                width={80}
                height={80}
              />
            ) : (
              <video
                src={fileItem.previewUrl}
                className="h-full w-full rounded object-cover"
                controls={false}
                muted
              />
            )}
            <button
              onClick={() => removeFile(index)}
              className="absolute bottom-[0.4rem] right-[0.4rem] flex size-[1.8rem] items-center justify-center rounded-[0.2px] bg-black/30 p-[0.1rem]"
              type="button"
            >
              <SvgClose className="size-[1.6rem] fill-white" />
            </button>
          </div>
        ))}

        {canAddMore && (
          <div className="relative">
            <input
              type="file"
              accept="image/jpeg, image/png, image/webp, video/mp4, video/avi, video/mkv, video/quicktime"
              className="flex aspect-square w-32 cursor-pointer items-center justify-center bg-gray-800 p-[2.2rem] opacity-0"
              onChange={handleFileChange}
            />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded bg-gray-800">
              <SvgAdd className="aspect-square size-[3.6rem] shrink-0 fill-white" />
            </div>
          </div>
        )}
      </div>
      {/* 에러 메시지 */}
      {(error || uploadError) && <ErrorNotice message={error || uploadError} />}
    </ContentWithLabel>
  );
}
