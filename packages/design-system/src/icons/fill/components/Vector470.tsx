import type { SVGProps } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  size?: number;
  fill?: string;
}
export function SvgVector470(props: Props) {
<<<<<<< HEAD
  return <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 28 127" fill={props.fill || "currentColor"} {...props}><path opacity={0.8} d="M13.8945 113.545L13.8945 13.8403" stroke="url(#paint0_linear_2811_115412)" strokeWidth={26.4079} strokeLinecap="round" /><defs><linearGradient id="paint0_linear_2811_115412" x1={14.3945} y1={13.8403} x2={14.3945} y2={113.545} gradientUnits="userSpaceOnUse"><stop stopColor="#FF488F" stopOpacity={0} /><stop offset={1} stopColor="#FF488F" /></linearGradient></defs></svg>;
=======
  return <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 28 127" fill={props.fill || "currentColor"} xmlns="http://www.w3.org/2000/svg" {...props}><path opacity={0.8} d="M13.8945 113.545L13.8945 13.8403" stroke="url(#paint0_linear_2811_115412)" strokeWidth={26.4079} strokeLinecap="round" /><defs><linearGradient id="paint0_linear_2811_115412" x1={14.3945} y1={13.8403} x2={14.3945} y2={113.545} gradientUnits="userSpaceOnUse"><stop stopColor="#FF488F" stopOpacity={0} /><stop offset={1} stopColor="#FF488F" /></linearGradient></defs></svg>;
>>>>>>> develop
}