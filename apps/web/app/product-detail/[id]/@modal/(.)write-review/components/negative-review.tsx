'use client';

import { REVIEW_TEXT, REVIEW_TEXT_PLACEHOLDER } from 'constants/review';
import { ErrorNotice, Textarea } from '@/components';
import { ContentWithLabel } from './content-with-label';
import { ReviewData } from '../hooks/useReviewInput';

interface Props {
  value: Pick<ReviewData, 'negativeComment'>;
  onChange: (comment: string) => void;
  error?: string;
}

export default function NegativeReview({ value, onChange, error }: Props) {
  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    onChange(e.target.value);
  };

  return (
    <ContentWithLabel label="気になる点" className="flex-col">
      <Textarea.Container>
        <Textarea
          value={value.negativeComment}
          onChange={handleChange}
          placeholder={REVIEW_TEXT_PLACEHOLDER.NEGATIVE}
          maxLength={REVIEW_TEXT.MAX_LENGTH}
          minLength={REVIEW_TEXT.MIN_LENGTH}
        />
        {error && <ErrorNotice message={error} />}
      </Textarea.Container>
    </ContentWithLabel>
  );
}
