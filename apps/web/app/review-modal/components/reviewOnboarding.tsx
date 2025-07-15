import { SvgClose, SvgVector, SvgVector470, SvgVector469 } from '@/icons';

export default function ReviewOnboarding() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <button className="absolute right-0 top-0 z-10 cursor-pointer p-[1.4rem]">
        <SvgClose width={36} height={36} className="text-gray-500" />
      </button>

      <div className="relative flex w-[93.6rem] flex-col px-[22.4rem] py-[11.8rem]">
        {/* Main content */}
        <div className="flex w-[48.8rem] flex-col items-center gap-[4rem] self-stretch">
          <div className="flex items-center gap-[3.2rem]">
            {/* left */}
            <div className="relative flex h-[22.8rem] w-[22.8rem] flex-col items-center justify-center rounded-[1.6rem] bg-[rgba(235,236,239,0.20)]">
              <div className="absolute top-[2rem] h-[9.9704rem] w-[2.6408rem]">
                <SvgVector470
                  className="animate-vector470-move h-[9.9704rem] w-[2.6408rem] shrink-0 opacity-80"
                  stroke="rgba(255,72,143,0.80)"
                  strokeWidth={26.408}
                />
                <div className="animate-vector470-move absolute left-1/2 top-[4rem] aspect-[26.41/26.41] h-[2.6408rem] w-[2.6408rem] shrink-0 -translate-x-1/2 transform rounded-full bg-pink-500"></div>
              </div>
              <div className="animate-vector470-move absolute top-[7rem] flex w-[21rem] items-center justify-center">
                <SvgVector
                  className="ml-[1.3204rem] h-[6.5175rem] w-[7.3456rem] text-white"
                  fill="white"
                />
              </div>
            </div>
            {/* right */}
            <div className="relative flex h-[22.8rem] w-[22.8rem] items-center justify-center rounded-[1.6rem] bg-[rgba(235,236,239,0.20)] px-0 py-[5.2464rem] backdrop-blur-sm">
              <div className="h-[12.3072rem] w-[6.7341rem] shrink-0 rounded-[13.9326rem] bg-white"></div>
              <div className="animate-vector469-move absolute left-1/2 top-[7rem] h-[1.3933rem] w-[1.3933rem] shrink-0 -translate-x-1/2 transform rounded-full bg-pink-500"></div>
              <div className="absolute top-[7rem] flex items-center justify-center">
                <SvgVector469 className="h-[3.6015rem]" />
              </div>
            </div>
          </div>
          <p className="text-center text-lg font-medium text-white">
            タッチパッドをスワイプするか、マウスをスクロールしてより多くのビデオレビューをご覧ください
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes vector470Move {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(5rem);
          }
        }

        .animate-vector470-move {
          animation: vector470Move 1.5s ease-out forwards;
          will-change: transform;
        }

        @keyframes vector469Move {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(3rem);
          }
        }

        .animate-vector469-move {
          animation: vector469Move 1.5s ease-out forwards;
          will-change: transform;
        }
      `}</style>
    </div>
  );
}
