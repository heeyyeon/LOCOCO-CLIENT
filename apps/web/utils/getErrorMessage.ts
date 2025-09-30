interface ApiErrorResponse {
  success: boolean;
  status: number;
  message: string;
  data?: Array<{
    errorField: string;
    errorMessage: string;
    inputValue: string;
  }>;
}

const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null;
};

const hasStringProperty = (
  obj: Record<string, unknown>,
  key: string
): boolean => {
  return key in obj && typeof obj[key] === 'string';
};

const hasBooleanProperty = (
  obj: Record<string, unknown>,
  key: string
): boolean => {
  return key in obj && typeof obj[key] === 'boolean';
};

const hasNumberProperty = (
  obj: Record<string, unknown>,
  key: string
): boolean => {
  return key in obj && typeof obj[key] === 'number';
};

const isApiErrorResponse = (obj: unknown): obj is ApiErrorResponse => {
  if (!isObject(obj)) return false;

  return (
    hasBooleanProperty(obj, 'success') &&
    hasNumberProperty(obj, 'status') &&
    hasStringProperty(obj, 'message')
  );
};

const hasMessage = (obj: unknown): obj is { message: string } => {
  return isObject(obj) && hasStringProperty(obj, 'message');
};

export const getErrorMessage = (error: unknown): string => {
  try {
    const errorData = typeof error === 'string' ? JSON.parse(error) : error;

    if (isApiErrorResponse(errorData)) {
      if (errorData.data && Array.isArray(errorData.data)) {
        const fieldErrors = errorData.data
          .map((item) => item.errorMessage)
          .join('\n');

        return `${errorData.message}\n\n${fieldErrors}`;
      }

      return errorData.message;
    }

    if (hasMessage(errorData)) {
      return errorData.message;
    }

    return '알 수 없는 오류가 발생했습니다.';
  } catch {
    if (hasMessage(error)) {
      return error.message;
    }

    return '오류가 발생했습니다.';
  }
};
