import { SvgLine } from '@lococo/design-system';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <section className="flex w-[74.4rem] flex-col items-center gap-[1.2rem] border border-gray-400 bg-white px-[22.2rem] py-[12.7rem]">
          <h1 className="mb-[1.2rem] text-[2.4rem] font-bold text-pink-500">
            会員ログイン
          </h1>
          <p className="mb-[2.4rem] text-[1.6rem] text-gray-700">
            LINEアカウントですぐにログイン
          </p>
          <button
            type="button"
            className="mt-[1.2rem] flex h-[4.8rem] w-[30rem] cursor-pointer items-center justify-center gap-[2.1rem] rounded-[0.6rem] bg-[#06C755] font-bold text-white"
          >
            <SvgLine></SvgLine>
            LINEでログイン
          </button>
        </section>
      </main>
      <Footer />
    </>
  );
}
