import { Avatar } from '@lococo/design-system';
import { Star } from '@lococo/design-system';
import { Tag } from '@lococo/design-system';
import { ReactionToggle } from '@lococo/design-system';
import { SvgGoodOutline } from '@lococo/design-system';
import CommentBox from './comment-box';

export default function Review() {
  return (
    <div className="flex h-fit w-full justify-between gap-[2.4rem] border-b-2 border-pink-500 py-[2.4rem]">
      <div className="flex max-w-[84rem] flex-col gap-[2.4rem]">
        <CommentBox type="positive">
          夜に塗って寝るだけで、朝起きると肌がしっとりします。乾燥肌の私には救世主です。香りも良く、テクスチャーもべたつかず気
          夜に塗って寝るだけで、朝起きると肌がしっとりします。乾燥肌の私には救世主です。香りも良く、テクスチャーもべたつかず気。チャーもべた
          塗って寝るだけでテクスチャーもべたつかず気。夜に塗って寝るだけで、朝起きると肌がしっとりします。乾燥肌の私には救世主です。
        </CommentBox>
        <div className="h-[0.1rem] w-full border-t border-dashed border-pink-500" />
        <CommentBox type="negative">
          塗って寝るだけでテクスチャーもべたつかず気。夜に塗って寝るだけで、朝起きると肌がしっとりします。乾燥肌の私には救世主です。
        </CommentBox>

        <div className="h-[0.1rem] w-full border-t border-dashed border-pink-500" />
        <div className="flex items-center justify-end">
          <div className="flex items-center gap-[1.2rem]">
            <p className="jp-title3 font-bold text-gray-800">参考になった</p>

            <ReactionToggle variant="horizontal" pressed={true}>
              <div className="flex items-center gap-[0.4rem]">
                <SvgGoodOutline />
                <p className="en-body1 text-gray-800">123</p>
              </div>
            </ReactionToggle>
          </div>
        </div>
      </div>

      <div className="flex w-[26.4rem] flex-col items-stretch gap-[1.2rem]">
        <div className="flex items-center gap-[1.2rem]">
          <Avatar></Avatar>
          <p className="en-title2 text-gray-800">hae***</p>
        </div>

        <div className="flex h-full flex-col gap-[1.2rem]">
          <Star rating={4} />
          <p className="jp-caption1 text-gray-600">オプション</p>
          <Tag text={'レシート'} className="inline-flex" />
        </div>

        <p className="en-caption1 self-end text-gray-600">2025年07月11</p>
      </div>
    </div>
  );
}
