import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
} from '@lococo/design-system/select';
import { SvgLanguage } from '@lococo/icons';

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
          <SelectItem
            hover
            value="Eng"
            className="flex h-[4.4rem] w-[8.4rem] justify-center p-0 text-center"
          >
            Eng
          </SelectItem>
          <SelectItem
            hover
            value="Esn"
            className="flex h-[4.4rem] w-[8.4rem] justify-center p-0 text-center"
          >
            Esn
          </SelectItem>
          <SelectItem
            hover
            value="Kor"
            className="flex h-[4.4rem] w-[8.4rem] justify-center p-0 text-center"
          >
            Kor
          </SelectItem>
        </SelectContent>
      </SelectRoot>
    </div>
  );
}
