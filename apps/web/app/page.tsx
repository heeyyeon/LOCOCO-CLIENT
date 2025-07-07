import {
  Badge,
  Button,
  SvgArrowUp,
  SvgErrorFill,
  SvgHome,
  SvgLikeFill,
  Checkbox,
} from '@lococo/design-system';
import { cn } from '@/lib/utils';

export default function Home() {
  return (
    <div className="m-10 pl-1">
      <Button size="small">ui 컴포넌트 핑크 버튼</Button>
      <div className={cn('bg-pink-200', 'text-pink-400')}>
        <p>test</p>
      </div>
      <div className="mt-12 flex space-x-14">
        <div>
          <p className="text-jp-head1 font-bold">head1 JP</p>
          <p className="text-jp-head2 font-bold">head2 JP</p>
          <p className="text-jp-head3 font-bold">head3 JP</p>
          <p className="text-jp-title1 font-bold">title1 JP</p>
          <p className="text-jp-title2 font-bold">title 2 JP</p>
          <p className="text-jp-title3 font-bold">title 3 JP</p>
          <p className="text-jp-body1 font-bold">body1 JP</p>
          <p className="text-jp-body2 font-medium">body2 JP</p>
          <p className="text-jp-caption1 font-bold">caption1 JP</p>
          <p className="text-jp-caption2 font-medium">caption2 JP</p>
          <p className="text-jp-caption3 font-regular">caption3 JP</p>
        </div>
        <div>
          <p className="text-en-head1 font-bold">head1 EN</p>
          <p className="text-en-title1 font-bold">title1 EN</p>
          <p className="text-en-title2 font-bold">title 2 EN</p>
          <p className="text-en-title3 font-bold">title 3 EN</p>
          <p className="text-en-body1 font-bold">body1 b EN</p>
          <p className="text-en-body1 font-medium">body1 m EN</p>
          <p className="text-en-caption1 font-bold">caption1 b EN</p>
          <p className="text-en-caption1 font-medium">caption1 m EN</p>
        </div>
      </div>
      <SvgHome />
      <SvgHome size={32} className="stroke-blue" />
      <SvgHome className="stroke-blue" />
      <SvgArrowUp className="fill-pink-400" />
      <SvgErrorFill />
      <SvgLikeFill className="fill-pink-400" />
      <Checkbox />

 
    </div>
  );
}
