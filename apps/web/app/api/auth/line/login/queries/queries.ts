export const lineLoginQueryKeys = {
  all: ['lineLogin'] as const,
  lineLogin: (code: string, state: string) =>
    [...lineLoginQueryKeys.all, code, state] as const,
};
