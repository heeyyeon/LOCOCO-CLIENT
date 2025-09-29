import type { SVGProps } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  size?: number;
  fill?: string;
}
export function SvgApprove(props: Props) {
  return <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 144 144" fill={props.fill || "currentColor"} xmlns="http://www.w3.org/2000/svg" {...props}><circle cx={72} cy={72} r={72} fill="#FFDFEC" /><path d="M60.8726 85.4549L46.3934 70.9757L41.4629 75.8715L60.8726 95.2812L102.539 53.6146L97.6434 48.7188L60.8726 85.4549Z" /></svg>;
}