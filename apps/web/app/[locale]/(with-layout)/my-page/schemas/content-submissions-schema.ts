import { z } from 'zod';

import {
  FILE_ERROR_MESSAGE_KEYS,
  createMultipleMediaValidator,
} from '../../../../../hooks/useFileUploader';

export const createContentSubmissionsSchema = (
  t: (key: string) => string,
  emptyFormT: (key: string) => string
) => {
  return z.object({
    submissions: z.array(
      z.object({
        formId: z.string(),
        campaign: z.string().min(1, emptyFormT('campaign')),
        campaignId: z.number(),
        campaignProductMedia: createMultipleMediaValidator(
          t(FILE_ERROR_MESSAGE_KEYS.NOT_ALLOWED_FILE_TYPE),
          t(FILE_ERROR_MESSAGE_KEYS.EMPTY_FILE)
        ),
        captionAndHashtags: z.string().min(1, emptyFormT('captionAndHashtags')),
        contentPlatform: z.string().optional(),
        nowReviewRound: z.string().optional(),
        revisionRequestedAt: z.string().optional(),
        postUrl: z.string().min(1, emptyFormT('postUrl')),
        brandNote: z.string().optional(),
      })
    ),
  });
};
