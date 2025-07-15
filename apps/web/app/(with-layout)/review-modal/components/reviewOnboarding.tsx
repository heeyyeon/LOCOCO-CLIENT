import { SvgClose, SvgVector, SvgVector470 } from '@/icons';

export default function ReviewOnboarding() {
  return (
    <div className="h-full w-full bg-black/80">
      <div>
        <SvgClose
          className="cursor-pointer p-[1.4rem]"
          width={36}
          height={36}
        />
      </div>
      <div className="flex w-[93.6rem] items-center justify-center px-[22.4rem] py-[11.8rem]">
        <div className="flex items-center gap-[3.2rem] self-stretch">
          <div className="h-[22.8rem] w-[22.8rem] rounded-[1.6rem] bg-[rgba(235,236,239,0.20)]">
            <div className="h-[6.175rem] w-[8.1692rem]">
              <SvgVector470 className='className="w-0 stroke-[rgba(255,72,143,0.00) h-[9.9704rem] shrink-0 stroke-[26.408px] opacity-80' />
              <div className="aspect-[26.41/26.41] h-[2.6408rem] w-[2.6408rem] shrink-0 rounded-[11.0033rem] bg-[--pink-500]"></div>
            </div>
            <SvgVector className="w-[ 7.3456rem] h-[6.5175rem]" />
          </div>
          <div className="flex h-[22.8rem] w-[22.8rem] items-center justify-center rounded-[1.6rem] bg-[rgba(235,236,239,0.20)] px-0 py-[5.2464rem]"></div>
        </div>
        <p>
          タッチパッドをスワイプするか、マウスをスクロールしてより多くのビデオレビューをご覧ください
        </p>
      </div>
    </div>
  );
}
