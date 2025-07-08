import type { SVGProps } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  size?: number;
  fill?: string;
}
export function SvgDivider(props: Props) {
  return <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 1 12" fill={props.fill || "currentColor"} xmlns="http://www.w3.org/2000/svg" {...props}><rect width={1} height={12} fill="#DEE0E6" /></svg>;
}