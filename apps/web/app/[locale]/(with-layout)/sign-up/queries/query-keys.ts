export const CREATOR_KEYS = {
  ALL: ['creator'],
  ID_AVAILABILITY: (id: string) => [...CREATOR_KEYS.ALL, 'id-availability', id],
} as const;
