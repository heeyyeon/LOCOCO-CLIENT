'use client';

import { useTranslations } from 'next-intl';

import { LANGUAGES } from 'constants/language';
import { LanguageKey } from 'types/language';

import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
} from '@lococo/design-system/select';
import { SvgArrowUp } from '@lococo/icons';

interface CampaignLanguageProps {
  locale: LanguageKey;
  setLocale: (locale: LanguageKey) => void;
}

export default function CampaignLanguage({
  locale,
  setLocale,
}: CampaignLanguageProps) {
  const handleLanguageChange = (newValue: LanguageKey) => {
    setLocale(newValue);
  };

  const t = useTranslations('languageSelectTrigger');

  return (
    <div className="flex h-full items-center">
      <SelectRoot value={locale} onValueChange={handleLanguageChange}>
        <SelectTrigger
          className="flex w-fit items-center gap-[0.8rem] border-none bg-none px-[3.2rem] py-[1.6rem] text-black"
          onlyChildren={true}
        >
          <p className="body1 font-[700]">{t('language')}</p>
          <SvgArrowUp size={24} />
        </SelectTrigger>

        <SelectContent className="body4 mt-[1.6rem] w-[11rem]" align="center">
          {Object.keys(LANGUAGES).map((lang) => (
            <SelectItem
              key={lang}
              value={lang}
              className="flex h-[4.4rem] w-[11rem] justify-center p-0 text-center"
              hover
              onClick={() => handleLanguageChange(lang)}
            >
              {lang}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    </div>
  );
}
