
import { useMutation } from '@tanstack/react-query';
import { getPresignedUrl } from '../../../../web/api/getPresignedUrl';
import { getProductImagePresignedUrls } from '../api';

export interface ProductUploadedFile {
  url: string;
  displayOrder: number;
  imageType?: string;
}

interface UploadProductFilesParams {
  files: File[];
  onSuccess?: (uploadedFiles: ProductUploadedFile[]) => void;
  onError?: (error: string) => void;
}

interface MediaUrl {
  mediaUrl: string[];
}

export const useProductImageUpload = (isAdmin = false) => {
  const uploadMutation = useMutation({
    mutationFn: async (files: File[]): Promise<ProductUploadedFile[]> => {
      if (files.length === 0) return [];

      const fileTypes = files.map((file) => file.type);
      
      let presignedData: MediaUrl;
      
      if (isAdmin) {
        const response = await getProductImagePresignedUrls({
          mediaType: fileTypes,
        });
        
        if (!response.data || !response.data.mediaUrl) {
          throw new Error('Failed to get presigned URLs');
        }
        
        presignedData = response.data;
      } else {
        presignedData = await getPresignedUrl(fileTypes);
      }

      if (!presignedData || !presignedData.mediaUrl) {
        throw new Error('Failed to get presigned URLs');
      }

      const uploadedFiles: ProductUploadedFile[] = await Promise.all(
        files.map(async (file, index): Promise<ProductUploadedFile> => {
          const presignedUrl = presignedData.mediaUrl[index];

          if (!presignedUrl || typeof presignedUrl !== 'string') {
            throw new Error(`No presigned URL for ${file.name}`);
          }

          const uploadResponse = await fetch(presignedUrl, {
            method: 'PUT',
            body: file,
            headers: { 'Content-Type': file.type },
          });

          if (!uploadResponse.ok) {
            throw new Error(
              `Upload failed for ${file.name}: ${uploadResponse.status} ${uploadResponse.statusText}`
            );
          }

          return {
            url: presignedUrl,
            displayOrder: index,
          };
        })
      );

      return uploadedFiles;
    },
  });

  const uploadImageFiles = ({
    files,
    onSuccess,
    onError,
  }: UploadProductFilesParams) => {
    const imageFiles = files.filter((file) => file.type.startsWith('image/'));

    if (imageFiles.length !== files.length) {
      const errorMessage = '이미지 파일만 업로드 가능합니다.';
      onError?.(errorMessage);
      return;
    }

    uploadMutation.mutate(imageFiles, {
      onSuccess: (uploadedFiles) => {
        onSuccess?.(uploadedFiles);
      },
      onError: (error) => {
        const errorMessage =
          error instanceof Error
            ? error.message
            : '파일 업로드에 실패했습니다.';
        onError?.(errorMessage);
      },
    });
  };

  return {
    uploadImageFiles,
    isUploading: uploadMutation.isPending,
    error: uploadMutation.error,
  };
};
