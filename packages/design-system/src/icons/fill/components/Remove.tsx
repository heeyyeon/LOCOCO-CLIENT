import type { SVGProps } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  size?: number;
  fill?: string;
}
export function SvgRemove(props: Props) {
  return <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill={props.fill || "currentColor"} xmlns="http://www.w3.org/2000/svg" {...props}><mask id="mask0_4119_22416" style={{
      maskType: "alpha"
    }} maskUnits="userSpaceOnUse" x={0} y={0} width={24} height={24}><rect width={24} height={24} fill="#D9D9D9" /></mask><g mask="url(#mask0_4119_22416)"><path d="M5 13V11H19V13H5Z" /></g></svg>;
}