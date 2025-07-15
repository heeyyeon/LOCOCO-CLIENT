import type { SVGProps } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  size?: number;
  fill?: string;
}
export function SvgArrowLeft(props: Props) {
  return <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 16 16" fill={props.fill || "currentColor"} xmlns="http://www.w3.org/2000/svg" {...props}><path d="M10.4713 11.06L7.41792 8L10.4713 4.94L9.53125 4L5.53125 8L9.53125 12L10.4713 11.06Z" /></svg>;
}