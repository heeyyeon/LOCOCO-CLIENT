
import { useMutation } from '@tanstack/react-query';
import { getClientCookie } from '../../../utils/client-cookie';
import { getPresignedUrl } from '../../../../web/api/getPresignedUrl';
import { 
  ApiResponseProductImageResponse,
  ProductImagePresignedUrlRequest 
} from '../../../../web/swagger-codegen/data-contracts';

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

const SERVER_API_BASE_URL = process.env.NEXT_PUBLIC_API_SERVER_URL;

export const useProductImageUpload = (isAdmin = false) => {
  const uploadMutation = useMutation({
    mutationFn: async (files: File[]): Promise<ProductUploadedFile[]> => {
      if (files.length === 0) return [];

      const fileTypes = files.map((file) => file.type);
      
      let presignedData: MediaUrl;
      
      if (isAdmin) {
        const requestData: ProductImagePresignedUrlRequest = {
          mediaType: fileTypes,
        };
        
        const accessToken = getClientCookie('AccessToken');
        
        const response = await fetch(`${SERVER_API_BASE_URL}/api/admin/products/images`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          credentials: 'include',
          body: JSON.stringify(requestData),
        });

        if (!response.ok) {
          if (response.status === 403) {
            throw new Error('권한이 없습니다. Admin 권한이 필요합니다.');
          }
          throw new Error(`Failed to get presigned URLs: ${response.status}`);
        }

        const responseData: ApiResponseProductImageResponse = await response.json();
        
        if (!responseData.data || !responseData.data.mediaUrl) {
          throw new Error('Failed to get presigned URLs');
        }
        
        presignedData = responseData.data;
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
