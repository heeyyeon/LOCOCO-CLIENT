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

export const FILE_ERROR_MESSAGE_KEYS = {
  NOT_ALLOWED_FILE_TYPE: 'notAllowedFileType',
  CANNOT_UPLOAD_FILE: 'cannotUploadFile',
  FILE_TOO_LARGE: 'fileTooLarge',
  EMPTY_FILE: 'emptyFile',
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

export const createFileTypeValidator = (
  allowedTypes: string[],
  errorMessage: string
) => {
  return z.instanceof(File).refine((file) => allowedTypes.includes(file.type), {
    message: errorMessage,
  });
};

export const createSingleImageValidator = (errorMessage: string) =>
  z.instanceof(File).refine((file) => ALLOWED_IMAGE_TYPES.includes(file.type), {
    message: errorMessage,
  });

export const createSingleVideoValidator = (errorMessage: string) =>
  z.instanceof(File).refine((file) => ALLOWED_VIDEO_TYPES.includes(file.type), {
    message: errorMessage,
  });

export const createSingleMediaValidator = (errorMessage: string) =>
  z.instanceof(File).refine((file) => ALLOWED_MEDIA_TYPES.includes(file.type), {
    message: errorMessage,
  });

export const createMultipleImageValidator = (
  fileTypeError: string,
  emptyError: string
) => {
  const singleValidator = createSingleImageValidator(fileTypeError);
  return z.array(singleValidator).refine((files) => files.length > 0, {
    message: emptyError,
  });
};

export const createMultipleVideoValidator = (
  fileTypeError: string,
  emptyError: string
) => {
  const singleValidator = createSingleVideoValidator(fileTypeError);
  return z.array(singleValidator).refine((files) => files.length > 0, {
    message: emptyError,
  });
};

export const createMultipleMediaValidator = (
  fileTypeError: string,
  emptyError: string
) => {
  const singleValidator = createSingleMediaValidator(fileTypeError);
  return z.array(singleValidator).refine((files) => files.length > 0, {
    message: emptyError,
  });
};
