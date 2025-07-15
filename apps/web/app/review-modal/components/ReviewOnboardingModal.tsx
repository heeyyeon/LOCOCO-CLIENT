import { SvgClose, SvgVector } from '@/icons';

function LeftAnimation() {
  return (
    <div className="relative flex h-[22.8rem] w-[22.8rem] flex-col items-center justify-center rounded-[1.6rem] bg-[rgba(235,236,239,0.20)]">
      <div className="animate-vector470-move absolute left-1/2 top-[2rem] h-0 w-[2.6408rem] -translate-x-1/2 rounded-[1.3204rem] bg-gradient-to-b from-transparent to-pink-500 opacity-80"></div>
      <div className="animate-circle-move absolute left-1/2 top-[2rem] h-[2.6408rem] w-[2.6408rem] -translate-x-1/2 rounded-full bg-pink-500"></div>
      <div className="animate-vector-move absolute flex items-center justify-center">
        <SvgVector
          className="ml-[1.3204rem] h-[6.5175rem] w-[7.3456rem] text-white"
          fill="white"
        />
      </div>
      <style jsx>{`
        @keyframes vector470Move {
          0% {
            height: 0;
          }
          50% {
            height: 8rem;
          }
          100% {
            height: 0;
          }
        }

        .animate-vector470-move {
          animation: vector470Move 2s ease-out forwards;
          will-change: height;
        }
        @keyframes circleMove {
          0% {
            top: 2rem;
          }
          50% {
            top: 10rem;
          }
          100% {
            top: 2rem;
          }
        }

        .animate-circle-move {
          animation: circleMove 2s ease-out forwards;
          will-change: top;
        }

        @keyframes vectorMove {
          0% {
            top: 2rem;
          }
          50% {
            top: 8rem;
          }
          100% {
            top: 2rem;
          }
        }

        .animate-vector-move {
          animation: vectorMove 2s ease-out forwards;
          will-change: top;
        }

        @keyframes vector469Move {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(3rem);
          }
          100% {
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

function RightAnimation() {
  return (
    <div className="relative flex h-[22.8rem] w-[22.8rem] items-center justify-center rounded-[1.6rem] bg-[rgba(235,236,239,0.20)] px-0 py-[5.2464rem] backdrop-blur-sm">
      <div className="h-[12.3072rem] w-[6.7341rem] rounded-[13.9326rem] bg-white"></div>
      <div className="animate-vector469-move absolute left-1/2 top-[7rem] h-[1.3933rem] w-[1.3933rem] -translate-x-1/2 rounded-full bg-pink-500"></div>
      <div className="absolute top-[7rem] flex items-center justify-center">
        <div className="h-[3.6015rem] w-[1.3933rem] rounded-full bg-gradient-to-b from-transparent to-pink-500 opacity-80"></div>
      </div>
    </div>
  );
}

export default function ReviewOnboardingModal() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <button className="absolute right-0 top-0 z-10 cursor-pointer p-[1.4rem]">
        <SvgClose width={36} height={36} className="text-gray-500" />
      </button>

      <div className="relative flex w-[93.6rem] flex-col px-[22.4rem] py-[11.8rem]">
        {/* Main content */}
        <div className="flex w-[48.8rem] flex-col items-center gap-[4rem] self-stretch">
          <div className="flex items-center gap-[3.2rem]">
            <LeftAnimation />
            <RightAnimation />
          </div>
          <div className="text-center text-lg font-medium text-white">
            タッチパッドを<p className="inline text-pink-500">スワイプ</p>
            するか、マウスを
            <p className="inline text-pink-500"> スクロール</p>
            してより多くのビデオレビューをご覧ください
          </div>
        </div>
      </div>
    </div>
  );
}
