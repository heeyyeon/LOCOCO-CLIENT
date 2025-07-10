'use client';

import { REVIEW_TEXT, REVIEW_TEXT_PLACEHOLDER } from 'constants/review';
import ErrorNotice from '@lococo/design-system/components/error-notice/ErrorNotice';
import { Textarea } from '@/components';
import { ReviewData } from '../hooks/useReviewInput';
import { ContentWithLabel } from './content-with-label';

interface Props {
  value: Pick<ReviewData, 'positiveComment'>;
  onChange: (comment: string) => void;
  error?: string;
}

export default function PositiveReview({ value, onChange, error }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <ContentWithLabel label="良かったです" className="h-full flex-col">
      <Textarea.Container>
        <Textarea
          value={value.positiveComment}
          onChange={handleChange}
          placeholder={REVIEW_TEXT_PLACEHOLDER.POSITIVE}
          maxLength={REVIEW_TEXT.MAX_LENGTH}
          minLength={REVIEW_TEXT.MIN_LENGTH}
        />
        {error && <ErrorNotice message={error} />}
      </Textarea.Container>
    </ContentWithLabel>
  );
}
