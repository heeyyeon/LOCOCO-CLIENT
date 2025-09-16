import z from 'zod';

export const ALLOWED_IMAGE_TYPES = [
  'image/jpg',
  'image/jpeg',
  'image/png',
  'image/webp',
];

export const ALLOWED_VIDEO_TYPES = [
  'video/mp4',
  'video/webm',
  'video/ogg',
  'video/avi',
  'video/mov',
];

export const ALLOWED_MEDIA_TYPES = [
  ...ALLOWED_IMAGE_TYPES,
  ...ALLOWED_VIDEO_TYPES,
];

export const FILE_ERROR_MESSAGE = {
  NOT_ALLOWED_FILE_TYPE: '지원하지 않는 파일 형식입니다.',
  CANNOT_UPLOAD_FILE: '최대 파일 개수를 초과했습니다.',
  FILE_TOO_LARGE: '파일 크기가 너무 큽니다.',
  EMPTY_FILE: '최소 하나의 파일을 업로드해야 합니다.',
} as const;

export const isImageFile = (file: File): boolean => {
  return ALLOWED_IMAGE_TYPES.includes(file.type);
};

export const isVideoFile = (file: File): boolean => {
  return ALLOWED_VIDEO_TYPES.includes(file.type);
};

export const isMediaFile = (file: File): boolean => {
  return ALLOWED_MEDIA_TYPES.includes(file.type);
};

export const createFileTypeValidator = (allowedTypes: string[]) => {
  return z.instanceof(File).refine((file) => allowedTypes.includes(file.type), {
    message: FILE_ERROR_MESSAGE.NOT_ALLOWED_FILE_TYPE,
  });
};

export const singleImageValidator = z
  .instanceof(File)
  .refine((file) => ALLOWED_IMAGE_TYPES.includes(file.type), {
    message: FILE_ERROR_MESSAGE.NOT_ALLOWED_FILE_TYPE,
  });

export const singleVideoValidator = z
  .instanceof(File)
  .refine((file) => ALLOWED_VIDEO_TYPES.includes(file.type), {
    message: FILE_ERROR_MESSAGE.NOT_ALLOWED_FILE_TYPE,
  });

export const singleMediaValidator = z
  .instanceof(File)
  .refine((file) => ALLOWED_MEDIA_TYPES.includes(file.type), {
    message: FILE_ERROR_MESSAGE.NOT_ALLOWED_FILE_TYPE,
  });

export const multipleImageValidator = z
  .array(singleImageValidator)
  .refine((files) => files.length > 0, {
    message: FILE_ERROR_MESSAGE.EMPTY_FILE,
  });

export const multipleVideoValidator = z
  .array(singleVideoValidator)
  .refine((files) => files.length > 0, {
    message: FILE_ERROR_MESSAGE.EMPTY_FILE,
  });

export const multipleMediaValidator = z
  .array(singleMediaValidator)
  .refine((files) => files.length > 0, {
    message: FILE_ERROR_MESSAGE.EMPTY_FILE,
  });
