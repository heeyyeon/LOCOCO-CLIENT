import { Progress } from '@lococo/design-system';
import { Button } from '@lococo/design-system';
import { Star } from '@lococo/design-system';
import { SvgJapaneseReview } from '@/icons';
import { SvgWrite } from '@/icons';

export default function StarRating() {
  return (
    <div className="flex flex-col gap-[3.2rem]">
      <h3 className="text-jp-head2 inline-flex items-center gap-[1.2rem] font-bold">
        <SvgJapaneseReview size={24} fill="#ef4351" /> 日本人レビュー
      </h3>

      <div className="flex h-[25.6rem] w-full items-center justify-between rounded-[1.2rem] bg-gray-100 px-[8rem] py-[4rem]">
        <div className="flex gap-[2rem]">
          <span className="en-head1 font-bold text-gray-800">3.7</span>
          <div className="flex flex-col items-center gap-[0.6rem]">
            <Star color="black" rating={3.7} />
            <div className="flex gap-[0.4rem]">
              <span className="en-title3 font-bold text-gray-600">123</span>
              <span className="jp-title3 font-bold text-gray-600">
                レビュー
              </span>
            </div>
          </div>
        </div>

        <div className="gap flex flex-col gap-[1.4rem]">
          <div className="flex items-center gap-[1.6rem]">
            <span className="en-title3 font-bold text-gray-600">5</span>
            <Progress value={50} width="52rem"></Progress>
            <span className="en-title3 font-bold text-gray-600">50%</span>
          </div>
          <div className="flex items-center gap-[1.6rem]">
            <span className="en-title3 font-bold text-gray-600">5</span>
            <Progress value={50} width="52rem"></Progress>
            <span className="en-title3 font-bold text-gray-600">50%</span>
          </div>
          <div className="flex items-center gap-[1.6rem]">
            <span className="en-title3 font-bold text-gray-600">5</span>
            <Progress value={50} width="52rem"></Progress>
            <span className="en-title3 font-bold text-gray-600">50%</span>
          </div>
          <div className="flex items-center gap-[1.6rem]">
            <span className="en-title3 font-bold text-gray-600">5</span>
            <Progress value={50} width="52rem"></Progress>
            <span className="en-title3 font-bold text-gray-600">50%</span>
          </div>
          <div className="flex items-center gap-[1.6rem]">
            <span className="en-title3 font-bold text-gray-600">5</span>
            <Progress value={50} width="52rem"></Progress>
            <span className="en-title3 font-bold text-gray-600">50%</span>
          </div>
        </div>
      </div>

      <Button color="primary" variant="filled" size="lg" rounded>
        <span className="jp-title2 inline-flex items-center gap-[0.8rem]">
          <SvgWrite />
          レビューを書く
        </span>
      </Button>
    </div>
  );
}
