import type { SVGProps } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  size?: number;
  fill?: string;
}
export function SvgVector472(props: Props) {
  return <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 14 50" fill={props.fill || "currentColor"} xmlns="http://www.w3.org/2000/svg" {...props}><path opacity={0.8} d="M7 6.9846L7 43" stroke="url(#paint0_linear_3426_61807)" strokeWidth={13.9326} strokeLinecap="round" /><defs><linearGradient id="paint0_linear_3426_61807" x1={6.5} y1={43} x2={6.5} y2={6.9846} gradientUnits="userSpaceOnUse"><stop stopColor="#FF488F" stopOpacity={0} /><stop offset={1} stopColor="#FF488F" /></linearGradient></defs></svg>;
}