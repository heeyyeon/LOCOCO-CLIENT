import {
  SvgInstagramFill,
  SvgTwitterFill,
  SvgArrowRight,
} from '@lococo/design-system';
import { FOOTER } from '../../constants/footer';

type Menu = {
  title: string;
  option: string[];
};

interface FooterProps {
  title: string;
  desc: string;
  menu: Menu[];
  copyright: string;
}

export default function Footer() {
  return (
    <footer className="sticky bottom-0 flex w-full flex-col items-center justify-center overflow-hidden bg-pink-100">
      <div className="flex w-full items-center gap-[12rem] px-[11.9rem] py-16">
        <FooterLeft title={FOOTER.title} desc={FOOTER.desc} />
        <FooterRight menu={FOOTER.menu} />
      </div>
      <div className="flex h-[5.2rem] w-full items-center justify-center gap-4 border-t border-dashed border-pink-500 p-4">
        <FooterBottom copyright={FOOTER.copyright} />
      </div>
    </footer>
  );
}

function FooterLeft({ title, desc }: Pick<FooterProps, 'title' | 'desc'>) {
  return (
    <div className="flex w-[45.6rem] flex-col items-start gap-[5.6rem] bg-pink-100">
      <div className="flex flex-col items-start gap-[2.4rem] self-stretch">
        <p className="text-en-title3 font-bold leading-loose">{title}</p>
        <p className="text-jp-body2 font-medium text-zinc-600">{desc}</p>
      </div>
      <div className="flex items-center gap-[0.8rem]">
        <div className="flex h-[4.4rem] w-[4.4rem] items-center justify-center p-4">
          <SvgInstagramFill />
        </div>
        <div className="flex h-[4.4rem] w-[4.4rem] items-center justify-center p-4">
          <SvgTwitterFill />
        </div>
      </div>
    </div>
  );
}

function FooterBottom({ copyright }: Pick<FooterProps, 'copyright'>) {
  return (
    <p className="text-en-body1 bg-pink-100 font-medium text-pink-500">
      {copyright}
    </p>
  );
}

function FooterRight({ menu }: Pick<FooterProps, 'menu'>) {
  return (
    <div className="flex items-start gap-[2.4rem] bg-[color:var(--color-pink-100)]">
      {menu.map((section) => (
        <div
          key={section.title}
          className="flex w-[16.8rem] flex-col items-start gap-[2.4rem]"
        >
          <p className="text-jp-body1 font-bold">{section.title}</p>
          <div className="flex flex-col items-start justify-start gap-[0.8rem] self-stretch">
            {section.option.map((item) => (
              <div
                key={item}
                className="flex h-[3.2rem] items-center gap-[0.8rem] self-stretch py-[1rem]"
              >
                <p className="text-jp-body2 font-medium">{item}</p>
                <SvgArrowRight />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
