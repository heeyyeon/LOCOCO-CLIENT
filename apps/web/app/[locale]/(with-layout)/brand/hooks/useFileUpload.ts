import { useMutation } from '@tanstack/react-query';
import { getPresignedUrl } from 'api/getPresignedUrl';

export interface UploadedFile {
  url: string;
  displayOrder: number;
  imageType?: string;
}

interface UploadFilesParams {
  files: File[];
  onSuccess?: (uploadedFiles: UploadedFile[]) => void;
  onError?: (error: string) => void;
}

export const useFileUpload = () => {
  const uploadMutation = useMutation({
    mutationFn: async (files: File[]): Promise<UploadedFile[]> => {
      if (files.length === 0) return [];

      const fileTypes = files.map((file) => file.type);
      const presignedData = await getPresignedUrl(fileTypes);

      if (!presignedData || !presignedData.mediaUrl) {
        throw new Error('Failed to get presigned URLs');
      }

      const uploadedFiles: UploadedFile[] = await Promise.all(
        files.map(async (file, index): Promise<UploadedFile> => {
          const presignedUrl = presignedData.mediaUrl[index];

          if (!presignedUrl || typeof presignedUrl !== 'string') {
            throw new Error(`No presigned URL for ${file.name}`);
          }

          const response = await fetch(presignedUrl, {
            method: 'PUT',
            body: file,
            headers: { 'Content-Type': file.type },
          });

          if (!response.ok) {
            throw new Error(
              `Upload failed for ${file.name}: ${response.status} ${response.statusText}`
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
  }: UploadFilesParams) => {
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
