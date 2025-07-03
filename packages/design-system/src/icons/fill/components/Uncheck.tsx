import type { SVGProps } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  size?: number;
  fill?: string;
}
export function SvgUncheck(props: Props) {
  return <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill={props.fill || "currentColor"} xmlns="http://www.w3.org/2000/svg" {...props}><rect x={0.5} y={0.5} width={23} height={23} rx={3.5} fill="white" /><rect x={0.5} y={0.5} width={23} height={23} rx={3.5} stroke="#C0C3C9" /></svg>;
}