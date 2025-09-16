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
  NOT_ALLOWED_FILE_TYPE: 'not allowed file type',
  CANNOT_UPLOAD_FILE: 'cannot upload file',
  FILE_TOO_LARGE: 'file too large',
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
    message: FILE_ERROR_MESSAGE.NOT_ALLOWED_FILE_TYPE,
  });

export const multipleVideoValidator = z
  .array(singleVideoValidator)
  .refine((files) => files.length > 0, {
    message: FILE_ERROR_MESSAGE.NOT_ALLOWED_FILE_TYPE,
  });

export const multipleMediaValidator = z
  .array(singleMediaValidator)
  .refine((files) => files.length > 0, {
    message: FILE_ERROR_MESSAGE.NOT_ALLOWED_FILE_TYPE,
  });
