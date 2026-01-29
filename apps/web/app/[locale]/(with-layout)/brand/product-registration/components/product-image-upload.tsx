'use client';

import { useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import { useProductImageUpload, ProductUploadedFile } from '../hooks/useProductImageUpload';
import DragDropArea from 'components/drag-drop/DargDropArea';
import { FormSection } from 'components/forms';
import { ProductRegistrationFormData } from '../schema/product-registration-schema';

interface ProductImageUploadProps {
  isReadonly?: boolean;
}

export default function ProductImageUpload({
  isReadonly = false,
}: ProductImageUploadProps) {
  const t = useTranslations('brandProductRegistration');
  const searchParams = useSearchParams();
  const isAdmin = searchParams.get('role') === 'admin';

  const {
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext<ProductRegistrationFormData>();

  const { uploadImageFiles, isUploading } = useProductImageUpload(isAdmin);

  const [previewFiles, setPreviewFiles] = useState<File[]>([]);
  const [existingUrls, setExistingUrls] = useState<string[]>([]);

  const productImageFiles = watch('productImageFiles'); 

  const currentUrls = useMemo(
    () => productImageFiles || [],
    [productImageFiles]
  );

  useEffect(() => {
    if (currentUrls.length > 0 && previewFiles.length === 0) {
      setExistingUrls(currentUrls.map((img) => img.url));
    }
  }, [currentUrls, previewFiles.length]);

  const handleFilesChange = (files: File[]) => {
    if (isReadonly) return;

    setPreviewFiles(files);

    // 1. 파일이 추가된 경우
    if (files.length > previewFiles.length) {
      const newFiles = files.slice(previewFiles.length);

      uploadImageFiles({
        files: newFiles,
        onSuccess: (uploadedFiles: ProductUploadedFile[]) => {
          const newImageObjects = uploadedFiles.map((file, index) => ({
            url: file.url,
            displayOrder: currentUrls.length + index,
            imageType: 'DETAIL' as const, 
          }));

          const existingImages = currentUrls || [];
          const updatedImages = [...existingImages, ...newImageObjects];

          setValue('productImageFiles', updatedImages);
          trigger('productImageFiles');
        },
        onError: () => {
          setPreviewFiles(previewFiles);
        },
      });
    } 
    // 2. 파일이 삭제된 경우
    else if (files.length < previewFiles.length) {
      const deletedCount = previewFiles.length - files.length;
      
      const updatedImages = currentUrls.slice(
        existingUrls.length,
        -deletedCount || undefined
      );

      setValue('productImageFiles', [
        ...currentUrls.slice(0, existingUrls.length),
        ...updatedImages,
      ]);
      trigger('productImageFiles');
    }
  };

  return (
    <div className="flex w-full flex-col">
      <FormSection
        title={t('productImage.title')}
        description={t('productImage.description')}
        required
        className="pt-[4.8rem]"
      >
        <DragDropArea
          files={previewFiles}
          handleFilesChange={handleFilesChange}
          existingImageUrls={existingUrls}
          fieldId="productImageFiles" 
          maxFiles={5}
          className={
            isUploading || isReadonly ? 'pointer-events-none opacity-50' : ''
          }
        />
        
        {!isReadonly && errors.productImageFiles && (
          <p className="text-red caption3 font-[400]">
            {errors.productImageFiles.message}
          </p>
        )}
      </FormSection>
    </div>
  );
}
