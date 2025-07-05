import FooterBottom from './components/footerBottom/FooterBottom';
import FooterLeft from './components/footerLeft/FooterLeft';
import FooterRight from './components/footerRight/FooterRight';

export default function Footer() {
  return (
    <div className="sticky bottom-0 flex w-full flex-col items-center justify-center overflow-hidden bg-[color:var(--color-pink-100)]">
      <div className="flex w-full max-w-[1280px] items-center gap-[12rem] px-[11.9rem] py-16">
        <FooterLeft />
        <FooterRight />
      </div>
      <div className="flex h-[5.2rem] w-full items-center justify-center gap-4 border-t border-dashed border-[color:var(--color-pink-500)] p-4">
        <FooterBottom />
      </div>
    </div>
  );
}
