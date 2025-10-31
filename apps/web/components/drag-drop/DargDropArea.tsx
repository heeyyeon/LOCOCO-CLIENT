import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

import { useTranslations } from 'next-intl';

import { ErrorNotice } from '@lococo/design-system/error-notice';
import { ImagePreview } from '@lococo/design-system/image-preview';
import { cn } from '@lococo/utils';

import {
  ALLOWED_MEDIA_TYPES,
  FILE_ERROR_MESSAGE_KEYS,
  isImageFile,
  isVideoFile,
} from '../../hooks/useFileUploader';

interface DragDropAreaProps {
  files: File[];
  existingImageUrls?: string[];
  handleFilesChange: (files: File[]) => void;
  maxFiles?: number;
  className?: string;
  onTriggerFileInput?: () => void;
  fieldId: string;
}

export default function DragDropArea({
  files,
  existingImageUrls,
  handleFilesChange,
  maxFiles = 10,
  className,
  onTriggerFileInput,
  fieldId,
}: DragDropAreaProps) {
  const t = useTranslations('fileUploader');
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState('');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const urls = files.map((file) => URL.createObjectURL(file));
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  useEffect(() => {
    if (scrollContainerRef.current && files.length > 0) {
      scrollContainerRef.current.scrollLeft =
        scrollContainerRef.current.scrollWidth;
    }
  }, [files.length]);

  const addFiles = (newFiles: File[]) => {
    const validFiles: File[] = [];
    const invalidFiles: string[] = [];

    // 파일 타입별로 분류
    newFiles.forEach((file) => {
      if (isImageFile(file)) {
        validFiles.push(file);
      } else if (isVideoFile(file)) {
        validFiles.push(file);
      } else {
        invalidFiles.push(file.name);
      }
    });
    // 지원하지 않는 파일이 있으면 에러 메시지 표시
    if (invalidFiles.length > 0) {
      setError(t(FILE_ERROR_MESSAGE_KEYS.NOT_ALLOWED_FILE_TYPE));
      return;
    }

    if (validFiles.length === 0) {
      setError(t(FILE_ERROR_MESSAGE_KEYS.EMPTY_FILE));
      return;
    }

    // 파일 개수 제한 확인
    const totalFiles = files.length + validFiles.length;

    if (totalFiles > maxFiles) {
      setError(t(FILE_ERROR_MESSAGE_KEYS.CANNOT_UPLOAD_FILE));
      return;
    }

    // 유효한 파일들만 추가
    if (validFiles.length > 0) {
      handleFilesChange([...files, ...validFiles]);
    }
    setError('');
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length > 0) {
      addFiles(selectedFiles);
    }
    e.target.value = '';
  };

  const handleRemoveFile = (index: number) => (e: React.MouseEvent) => {
    e.stopPropagation();

    const updatedFiles = files.filter((_, i) => i !== index);
    handleFilesChange(updatedFiles);
  };

  const handleReplaceFile =
    (indexToReplace: number) => (e: ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation();
      e.preventDefault();

      const newFiles = Array.from(e.target.files || []);
      if (newFiles.length > 0) {
        const newFile = newFiles[0];
        if (newFile && isImageFile(newFile)) {
          const updatedFiles = files.map((file, index) =>
            index === indexToReplace ? newFile : file
          );
          handleFilesChange(updatedFiles);
        }
      }
      // Reset input value to allow selecting the same file again
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
    addFiles(droppedFiles);
  };

  const triggerFileInput = () => {
    if (onTriggerFileInput) {
      onTriggerFileInput();
    } else {
      fileInputRef.current?.click();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      triggerFileInput();
    }
  };

  const hasFiles =
    files.length > 0 || (existingImageUrls && existingImageUrls.length > 0);

  const canAddMoreFiles =
    files.length + (existingImageUrls?.length || 0) < maxFiles;
  return (
    <>
      {error && <ErrorNotice message={error} />}
      <div
        className={cn(
          'flex h-[22rem] w-full items-center rounded-lg border border-solid bg-pink-100 p-[1.2rem] transition-all duration-200',
          isDragOver
            ? 'border-dashed border-pink-500 bg-pink-200'
            : 'border-pink-300',
          hasFiles && 'border-pink-300',
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
        {/* File Grid */}
        {hasFiles && (
          <div
            ref={scrollContainerRef}
            className="scrollbar-hide grid auto-cols-max grid-rows-2 gap-x-[1.2rem] gap-y-[1.5rem] overflow-x-scroll"
            style={{ gridAutoFlow: 'column' }}
          >
            {files.map((file, index) => (
              <div
                key={`image-${file.name}-${index}`}
                onClick={(e) => e.stopPropagation()}
              >
                <ImagePreview
                  src={URL.createObjectURL(file)}
                  alt={`Upload ${index + 1}: ${file.name}`}
                  handleRemoveFile={handleRemoveFile(index)}
                  handleFileChange={handleReplaceFile(index)}
                  className="h-[9.2rem] w-[9.2rem]"
                />
              </div>
            ))}
          </div>
        )}

        <input
          ref={fileInputRef}
          id={fieldId}
          type="file"
          multiple={true}
          accept={ALLOWED_MEDIA_TYPES.join(',')}
          className="hidden"
          onChange={handleFileInputChange}
        />
      </div>
    </>
  );
}
