'use client';

import { useLocale } from 'next-intl';

import { usePathname, useRouter } from 'i18n/navigation';

import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
} from '@lococo/design-system/select';
import { SvgLanguage } from '@lococo/icons';

const LANGUAGES = [
  { value: 'en', label: 'Eng' },
  { value: 'es', label: 'Esn' },
  { value: 'ko', label: 'Kor' },
];

export default function GnbLanguage() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleLanguageChange = (newLocale: string) => {
    router.push(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center">
      <SelectRoot value={locale} onValueChange={handleLanguageChange}>
        <SelectTrigger
          className="!w-[3.2rem] border-none p-0 text-black"
          onlyChildren={true}
        >
          <SvgLanguage size={32} className="h-full w-full" />
        </SelectTrigger>

        <SelectContent className="body4 mt-[2rem] w-[8.4rem]" align="center">
          {LANGUAGES.map((lang) => (
            <SelectItem
              key={lang.value}
              value={lang.value}
              className="flex h-[4.4rem] w-[8.4rem] justify-center p-0 text-center"
              hover
            >
              {lang.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    </div>
  );
}
