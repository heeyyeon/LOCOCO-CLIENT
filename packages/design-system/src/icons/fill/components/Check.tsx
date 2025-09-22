import type { SVGProps } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  size?: number;
  fill?: string;
}
export function SvgCheck(props: Props) {
  return <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 16 16" fill={props.fill || "currentColor"} xmlns="http://www.w3.org/2000/svg" {...props}><path d="M5.86339 10.5836L3.08339 7.80361L2.13672 8.74361L5.86339 12.4703L13.8634 4.47027L12.9234 3.53027L5.86339 10.5836Z" /></svg>;
}