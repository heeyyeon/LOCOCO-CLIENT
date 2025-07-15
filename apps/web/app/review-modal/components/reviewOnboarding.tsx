import { SvgClose, SvgVector, SvgVector470 } from '@/icons';

export default function ReviewOnboarding() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-[93.6rem] px-[22.4rem] py-[11.8rem]">
        {/* Close button positioned absolutely */}
        <button className="absolute right-4 top-4 z-10 cursor-pointer p-[1.4rem] text-white hover:opacity-70">
          <SvgClose width={36} height={36} />
        </button>

        {/* Main content */}
        <div className="flex flex-col items-center gap-[3.2rem]">
          <div className="flex items-center gap-[3.2rem]">
            <div className="h-[22.8rem] w-[22.8rem] rounded-[1.6rem] bg-[rgba(235,236,239,0.20)] backdrop-blur-sm">
              <div className="h-[6.175rem] w-[8.1692rem]">
                <SvgVector470
                  className="h-[9.9704rem] w-0 shrink-0 opacity-80"
                  stroke="rgba(255,72,143,0.00)"
                  strokeWidth={26.408}
                />
                <div className="aspect-[26.41/26.41] h-[2.6408rem] w-[2.6408rem] shrink-0 rounded-[11.0033rem] bg-pink-500"></div>
              </div>
              <SvgVector className="h-[6.5175rem] w-[7.3456rem]" />
            </div>
            <div className="flex h-[22.8rem] w-[22.8rem] items-center justify-center rounded-[1.6rem] bg-[rgba(235,236,239,0.20)] px-0 py-[5.2464rem] backdrop-blur-sm"></div>
          </div>
          <p className="text-center text-lg font-medium text-white">
            タッチパッドをスワイプするか、マウスをスクロールしてより多くのビデオレビューをご覧ください
          </p>
        </div>
      </div>
    </div>
  );
}
