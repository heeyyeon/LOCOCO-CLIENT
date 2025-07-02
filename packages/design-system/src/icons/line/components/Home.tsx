import type { SVGProps } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  size?: number;
  stroke?: string;
}
export function SvgHome(props: Props) {
  return <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} stroke={props.stroke || "currentColor"} {...props}><path d="M3 9L12 2L21 9V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9Z" /><path d="M9 22V12H15V22" /></svg>;
}