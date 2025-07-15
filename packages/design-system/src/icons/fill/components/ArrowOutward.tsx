import type { SVGProps } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  size?: number;
  fill?: string;
}
export function SvgArrowOutward(props: Props) {
  return <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill={props.fill || "currentColor"} xmlns="http://www.w3.org/2000/svg" {...props}><mask id="mask0_2200_43003" style={{
      maskType: "alpha"
    }} maskUnits="userSpaceOnUse" x={0} y={0} width={24} height={24}><rect width={24} height={24} fill="#D9D9D9" /></mask><g mask="url(#mask0_2200_43003)"><path d="M6.4 19L5 17.6L14.6 8H6V6H18V18H16V9.4L6.4 19Z" /></g></svg>;
}