import type { SVGProps } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  size?: number;
  fill?: string;
}
export function SvgEllipsis(props: Props) {
  return <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 5 5" fill={props.fill || "currentColor"} xmlns="http://www.w3.org/2000/svg" {...props}><rect x={0.825195} y={0.21875} width={4} height={4} rx={2} fill="#C0C3C9" /></svg>;
}