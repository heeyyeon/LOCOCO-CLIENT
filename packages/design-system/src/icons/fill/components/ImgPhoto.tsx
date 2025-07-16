import type { SVGProps } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  size?: number;
  fill?: string;
}
export function SvgImgPhoto(props: Props) {
  return <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 100 100" fill={props.fill || "currentColor"} xmlns="http://www.w3.org/2000/svg" {...props}><rect width={100} height={100} rx={50} fill="#FFF1F6" /><mask id="mask0_3113_48500" style={{
      maskType: "alpha"
    }} maskUnits="userSpaceOnUse" x={30} y={30} width={40} height={40}><rect x={30} y={30} width={40} height={40} fill="#D9D9D9" /></mask><g mask="url(#mask0_3113_48500)"><path d="M38.3333 65C37.4167 65 36.6319 64.6736 35.9792 64.0208C35.3264 63.3681 35 62.5833 35 61.6667V38.3333C35 37.4167 35.3264 36.6319 35.9792 35.9792C36.6319 35.3264 37.4167 35 38.3333 35H61.6667C62.5833 35 63.3681 35.3264 64.0208 35.9792C64.6736 36.6319 65 37.4167 65 38.3333V61.6667C65 62.5833 64.6736 63.3681 64.0208 64.0208C63.3681 64.6736 62.5833 65 61.6667 65H38.3333ZM40 58.3333H60L53.75 50L48.75 56.6667L45 51.6667L40 58.3333Z" /></g></svg>;
}