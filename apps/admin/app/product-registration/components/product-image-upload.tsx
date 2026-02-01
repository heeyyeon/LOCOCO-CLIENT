'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { useProductImageUpload, ProductUploadedFile } from '../hooks/useProductImageUpload';
import { FormSection } from './form-section';
import { ProductRegistrationFormData } from '../schema/product-registration-schema';

interface ProductImageUploadProps {
  isReadonly?: boolean;
}

export default function ProductImageUpload({
  isReadonly = false,
}: ProductImageUploadProps) {
  const {
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext<ProductRegistrationFormData>();

  const { uploadImageFiles, isUploading } = useProductImageUpload(true);

  const [previewFiles, setPreviewFiles] = useState<File[]>([]);
  const productImageFiles = watch('productImageFiles') || [];

  const handleFilesChange = (files: File[]) => {
    if (isReadonly) return;

    const nextFiles = [...previewFiles, ...files].slice(0, 5);
    const newFiles = nextFiles.slice(previewFiles.length);

    setPreviewFiles(nextFiles);

    if (newFiles.length > 0) {
      uploadImageFiles({
        files: newFiles,
        onSuccess: (uploadedFiles: ProductUploadedFile[]) => {
          const newImageObjects = uploadedFiles.map((file, index) => ({
            url: file.url,
            displayOrder: productImageFiles.length + index,
            imageType: 'DETAIL' as const,
          }));

          const updatedImages = [...productImageFiles, ...newImageObjects];
          setValue('productImageFiles', updatedImages);
          trigger('productImageFiles');
        },
        onError: () => {
          setPreviewFiles(previewFiles);
        },
      });
    }
  };

  const handleRemoveFile = (index: number) => {
    if (isReadonly) return;

    const nextPreviewFiles = previewFiles.filter((_, i) => i !== index);
    const nextProductImages = productImageFiles.filter((_, i) => i !== index);

    setPreviewFiles(nextPreviewFiles);
    setValue('productImageFiles', nextProductImages);
    trigger('productImageFiles');
  };

  return (
    <div className="flex w-full flex-col">
      <FormSection
        title="상품 사진"
        description={
          '상품 상세페이지에 보여줄 사진입니다. 고화질 사진을 첨부해주세요.\n사진은 최대 5장까지 업로드 가능합니다.\n\n하단 버튼을 클릭하여 이미지를 업로드 해주세요'
        }
        required
        className="pt-[4.8rem]"
      >
        <div className="flex flex-col gap-[1.2rem]">
          <label
            htmlFor="product-image-upload"
            className="body3 text-gray-700 cursor-pointer hover:text-pink-500 border border-gray-300 rounded-[1.6rem] px-[1.2rem] py-[0.8rem] bg-pink-100 text-center transition-colors"
          >
            이미지 파일 선택
          </label>
          <input
            id="product-image-upload"
            type="file"
            accept="image/*"
            multiple
            disabled={isUploading || isReadonly}
            className="hidden"
            onChange={(event) => {
              const selectedFiles = event.target.files
                ? Array.from(event.target.files)
                : [];
              handleFilesChange(selectedFiles);
              event.currentTarget.value = '';
            }}
          />
          {previewFiles.length > 0 && (
            <ul className="space-y-[0.8rem]">
              {previewFiles.map((file, index) => (
                <li
                  key={`${file.name}-${index}`}
                  className="flex items-center justify-between rounded-[1.6rem] border border-gray-200 px-[1.7rem] py-[0.8rem]"
                >
                  <span className="body3 text-gray-700">{file.name}</span>
                  {!isReadonly && (
                    <button
                      type="button"
                      className="body3 cursor-pointer text-pink-500 "
                      onClick={() => handleRemoveFile(index)}
                    >
                      삭제
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {!isReadonly && errors.productImageFiles && (
          <p className="text-red caption3 font-[400]">
            {errors.productImageFiles.message}
          </p>
        )}
      </FormSection>
    </div>
  );
}
