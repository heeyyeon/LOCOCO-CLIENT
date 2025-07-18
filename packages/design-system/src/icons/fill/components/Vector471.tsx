import type { SVGProps } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  size?: number;
  fill?: string;
}
export function SvgVector471(props: Props) {
  return <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 28 127" fill={props.fill || "currentColor"} {...props}><path opacity={0.8} d="M14.1055 13.4554L14.1055 113.16" stroke="url(#paint0_linear_3426_61799)" strokeWidth={26.4079} strokeLinecap="round" /><defs><linearGradient id="paint0_linear_3426_61799" x1={13.6055} y1={113.16} x2={13.6055} y2={13.4554} gradientUnits="userSpaceOnUse"><stop stopColor="#FF488F" stopOpacity={0} /><stop offset={1} stopColor="#FF488F" /></linearGradient></defs></svg>;
}