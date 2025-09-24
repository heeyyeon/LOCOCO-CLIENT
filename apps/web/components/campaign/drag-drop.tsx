import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

import { useTranslations } from 'next-intl';

import { ErrorNotice } from '@lococo/design-system/error-notice';
import { ImagePreview } from '@lococo/design-system/image-preview';
import { cn } from '@lococo/utils';

const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/webp',
];

const isImageFile = (file: File) => ALLOWED_IMAGE_TYPES.includes(file.type);

interface DragDropAreaProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
  maxFiles?: number;
  className?: string;
}

export function DragDropArea({
  files,
  onFilesChange,
  maxFiles = 10,
  className,
}: DragDropAreaProps) {
  const t = useTranslations('fileUploader');
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Object URLs 정리
  useEffect(() => {
    const urls = files.map((file) => URL.createObjectURL(file));
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  const validateAndAddFiles = (newFiles: File[]) => {
    setErrorMessage('');

    // 이미지 파일만 필터링
    const imageFiles = newFiles.filter(isImageFile);

    if (imageFiles.length === 0) {
      setErrorMessage('이미지 파일만 업로드 가능합니다.');
      return;
    }

    // 파일 개수 제한 체크
    if (files.length + imageFiles.length > maxFiles) {
      setErrorMessage(`최대 ${maxFiles}개까지 업로드 가능합니다.`);
      return;
    }

    onFilesChange([...files, ...imageFiles]);
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    onFilesChange(updatedFiles);
  };

  const replaceFile = (index: number, newFile: File) => {
    if (!isImageFile(newFile)) {
      setErrorMessage('이미지 파일만 업로드 가능합니다.');
      return;
    }
    const updatedFiles = files.map((file, i) => (i === index ? newFile : file));
    onFilesChange(updatedFiles);
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    validateAndAddFiles(selectedFiles);
    e.target.value = '';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    validateAndAddFiles(droppedFiles);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      triggerFileInput();
    }
  };

  const canAddMoreFiles = files.length < maxFiles;

  return (
    <>
      <div className="flex gap-[0.8rem]">
        <p className="body4 font-[500] text-gray-500">
          드래그 앤 드롭 또는 클릭하여 파일을 업로드하세요.
        </p>
        <button
          className="body4 border-none border-pink-500 border-b-gray-100 font-[500] text-pink-500 underline"
          onClick={triggerFileInput}
        >
          파일 선택
        </button>
      </div>
      <div
        className={cn(
          'flex h-[22rem] w-full items-center rounded-lg border border-solid bg-pink-100 p-[1.2rem] transition-all duration-200',
          isDragOver
            ? 'border-dashed border-pink-500 bg-pink-200'
            : 'border-pink-300',
          files.length > 0 && 'border-pink-300',
          className
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={canAddMoreFiles ? triggerFileInput : undefined}
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        {files.length > 0 && (
          <div
            ref={scrollContainerRef}
            className="scrollbar-hide grid auto-cols-max grid-rows-2 gap-x-[1.2rem] gap-y-[1.5rem] overflow-x-auto"
            style={{ gridAutoFlow: 'column' }}
          >
            {files.map((file, index) => {
              const fileKey = `${file.name}-${file.size}-${file.lastModified}`;
              return (
                <ImagePreview
                  key={fileKey}
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  handleRemoveFile={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    e.preventDefault();
                    removeFile(index);
                  }}
                  handleFileChange={(e: ChangeEvent<HTMLInputElement>) => {
                    e.stopPropagation();
                    const newFiles = Array.from(e.target.files || []);
                    if (newFiles[0]) {
                      replaceFile(index, newFiles[0]);
                    }
                  }}
                  className="h-[9.2rem] w-[9.2rem]"
                />
              );
            })}
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={ALLOWED_IMAGE_TYPES.join(',')}
          className="hidden"
          onChange={handleFileInputChange}
        />
      </div>

      {errorMessage && <ErrorNotice message={errorMessage} />}
    </>
  );
}
