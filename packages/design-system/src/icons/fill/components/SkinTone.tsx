import type { SVGProps } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  size?: number;
  fill?: string;
}
export function SvgSkinTone(props: Props) {
  return <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 25" fill={props.fill || "currentColor"} xmlns="http://www.w3.org/2000/svg" {...props}><circle cx={11.9951} cy={12.5} r={12} fill="#F1DDD2" /></svg>;
}