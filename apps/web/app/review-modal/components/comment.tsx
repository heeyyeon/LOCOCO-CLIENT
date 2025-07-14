import { SvgGoodFill } from '@lococo/design-system';
import { SvgBad } from '@lococo/design-system';

interface CommentProps {
  children: React.ReactNode;
  type: 'positive' | 'negative';
}
export default function Comment({ children, type }: CommentProps) {
  return (
    <div className="flex w-fit flex-col gap-[1.2rem]">
      {/* 긍정 부정 리뷰 */}
      <div className="flex items-center gap-[1rem]">
        {type === 'positive' ? (
          <SvgGoodFill className="text-pink-500" />
        ) : (
          <SvgBad />
        )}
        <span className="jp-body1 font-bold text-gray-600">
          {type === 'positive' ? '良かったです' : '気になる点'}
        </span>
      </div>

      {/* 리뷰 내용 */}
      <div className="jp-body2 line-clamp-3 max-h-[6.6rem] overflow-hidden text-gray-800">
        {children}
      </div>
    </div>
  );
}
