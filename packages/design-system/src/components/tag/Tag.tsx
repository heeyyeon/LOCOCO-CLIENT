import { SvgCheckNonBg } from '../../icons/fill/components/CheckNonBg';

interface TagProps {
  text: string;
}

export default function Tag({ text }: TagProps) {
  return (
    <div className="text-jp-caption1 inline-flex items-center justify-center gap-[0.4rem] rounded-[0.4rem] bg-gray-100 px-[0.8rem] py-[0.45rem] font-[500] text-gray-800">
      <SvgCheckNonBg className="fill-green" size={20} />
      <p>{text}</p>
    </div>
  );
}
