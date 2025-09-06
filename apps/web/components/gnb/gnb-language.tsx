import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
} from '@lococo/design-system/select';
import { SvgLanguage } from '@lococo/icons';

const LANGUAGES = [
  { value: 'Eng', label: 'Eng' },
  { value: 'Esn', label: 'Esn' },
  { value: 'Kor', label: 'Kor' },
];

export default function GnbLanguage() {
  return (
    <div>
      <SelectRoot>
        <SelectTrigger
          className="!w-[3.2rem] border-none p-0 text-black"
          onlyChildren={true}
        >
          <SvgLanguage size={32} className="h-full w-full" />
        </SelectTrigger>

        <SelectContent
          className="inter-body4 mt-[2rem] w-[8.4rem]"
          align="center"
        >
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
