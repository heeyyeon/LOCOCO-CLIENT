import type { SVGProps } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  size?: number;
  fill?: string;
}
export function SvgVector469(props: Props) {
  return <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 14 51" fill={props.fill || "currentColor"} {...props}><path opacity={0.8} d="M7.00781 43.699L7.00781 7.68359" stroke="url(#paint0_linear_2811_115417)" strokeWidth={13.9326} strokeLinecap="round" /><defs><linearGradient id="paint0_linear_2811_115417" x1={7.50781} y1={7.68359} x2={7.50781} y2={43.699} gradientUnits="userSpaceOnUse"><stop stopColor="#FF488F" stopOpacity={0} /><stop offset={1} stopColor="#FF488F" /></linearGradient></defs></svg>;
}