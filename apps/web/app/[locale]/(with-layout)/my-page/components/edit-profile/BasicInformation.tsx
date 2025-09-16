import { Button } from '@lococo/design-system/button';
import { ErrorNotice } from '@lococo/design-system/error-notice';
import { Input } from '@lococo/design-system/input-field';

import InputWrapper from '../input-wrapper';

interface BasicInformationProps {
  errors?: string;
  value: string;
  onChange: (id: string) => void;
  isIdChecked: boolean;
  idCheckError: string;
  onCheckAvailability: () => void;
}

export default function BasicInformation({
  errors,
  value,
  onChange,
  isIdChecked,
  idCheckError,
  onCheckAvailability,
}: BasicInformationProps) {
  const notice = errors && <ErrorNotice message={errors} />;
  const idCheckNotice = idCheckError && <ErrorNotice message={idCheckError} />;
  const idCheckSuccessNotice = isIdChecked && !idCheckError && (
    // TODO: 사용 가능한 ID입니다. 문구 변경
    <p className="text-sm text-green-500">✓ 사용 가능한 ID입니다.</p>
  );
  const noticeContent = notice || idCheckNotice || idCheckSuccessNotice;
  return (
    <section className="flex w-full flex-col gap-[1.6rem]">
      <p className="inter-title2 text-gray-800">Basic Information</p>
      <div className="flex flex-col gap-[0.3rem]">
        <InputWrapper label="ID" required notice={noticeContent}>
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rightIcon={
              <Button
                size="lg"
                variant="outline"
                color="secondary"
                onClick={onCheckAvailability}
                className="inter-body2 h-auto whitespace-nowrap rounded-[0.8rem] px-[1.6rem] py-[0.8rem]"
              >
                Check availability
              </Button>
            }
          />
        </InputWrapper>
      </div>
    </section>
  );
}
