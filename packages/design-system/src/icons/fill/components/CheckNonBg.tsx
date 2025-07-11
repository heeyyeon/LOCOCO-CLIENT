import type { SVGProps } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  size?: number;
  fill?: string;
}
export function SvgCheckNonBg(props: Props) {
  return <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 20 20" fill={props.fill || "currentColor"} xmlns="http://www.w3.org/2000/svg" {...props}><path d="M7.32923 13.2293L3.85423 9.75426L2.6709 10.9293L7.32923 15.5876L17.3292 5.5876L16.1542 4.4126L7.32923 13.2293Z" /></svg>;
}