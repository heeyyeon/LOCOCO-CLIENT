import { SvgLine } from '@lococo/design-system';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="flex items-center justify-center bg-gray-100">
        <section className="my-[6.9rem] flex w-[74.4rem] flex-col items-center border border-gray-400 bg-white px-[22.2rem] py-[12.7rem]">
          <h1 className="jp-head3 mb-[1.4rem] font-bold text-pink-500">
            会員ログイン
          </h1>
          <p className="jp-body2 text-gray-700">
            LINEアカウントですぐにログイン
          </p>
          <button
            type="button"
            className="jp-body1 relative mt-[12rem] flex h-[4.8rem] cursor-pointer items-center rounded-[0.6rem] bg-[#06C755] pl-[5.4rem] pr-[5.4rem] font-bold text-white"
          >
            <span className="absolute left-[2.1rem] flex items-center">
              <SvgLine size={20} />
            </span>
            <span className="w-[18.4rem] justify-center">LINEでログイン</span>
          </button>
        </section>
      </main>
      <Footer />
    </>
  );
}
