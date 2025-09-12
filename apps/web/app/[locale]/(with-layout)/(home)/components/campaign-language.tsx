'use client';

import { LANGUAGES } from 'constants/language';

import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
} from '@lococo/design-system/select';
import { SvgArrowUp } from '@lococo/icons';

export type LocaleType = (typeof LANGUAGES)[number]['value'];

interface CampaignLanguageProps {
  locale: LocaleType;
  setLocale: (locale: LocaleType) => void;
}

export default function CampaignLanguage({
  locale,
  setLocale,
}: CampaignLanguageProps) {
  const handleLanguageChange = (newValue: LocaleType) => {
    setLocale(newValue);
  };

  return (
    <div className="flex items-center">
      <SelectRoot value={locale} onValueChange={handleLanguageChange}>
        <SelectTrigger
          className="flex w-fit gap-[0.8rem] border-none px-[3.2rem] py-[1.6rem] text-black"
          onlyChildren={true}
        >
          <p className="inter-body1 text-[700]">Language</p>
          <SvgArrowUp size={24} />
        </SelectTrigger>

        <SelectContent
          className="inter-body4 mt-[2rem] w-[11rem]"
          align="center"
        >
          {LANGUAGES.map((lang) => (
            <SelectItem
              key={lang.value}
              value={lang.value}
              className="flex h-[4.4rem] w-[11rem] justify-center p-0 text-center"
              hover
              onClick={() => handleLanguageChange(lang.value)}
            >
              {lang.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    </div>
  );
}
