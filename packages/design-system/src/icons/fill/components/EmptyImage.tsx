import type { SVGProps } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  size?: number;
  fill?: string;
}
export function SvgEmptyImage(props: Props) {
  return <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 120 120" fill={props.fill || "currentColor"} xmlns="http://www.w3.org/2000/svg" {...props}><rect width={120} height={120} rx={60} fill="#FFDFEC" /><mask id="mask0_4572_27109" style={{
      maskType: "alpha"
    }} maskUnits="userSpaceOnUse" x={30} y={30} width={60} height={60}><rect x={30} y={30} width={60} height={60} fill="#D9D9D9" /></mask><g mask="url(#mask0_4572_27109)"><path d="M42.5 82.5C41.125 82.5 39.9479 82.0104 38.9688 81.0312C37.9896 80.0521 37.5 78.875 37.5 77.5V42.5C37.5 41.125 37.9896 39.9479 38.9688 38.9688C39.9479 37.9896 41.125 37.5 42.5 37.5H77.5C78.875 37.5 80.0521 37.9896 81.0312 38.9688C82.0104 39.9479 82.5 41.125 82.5 42.5V77.5C82.5 78.875 82.0104 80.0521 81.0312 81.0312C80.0521 82.0104 78.875 82.5 77.5 82.5H42.5ZM45 72.5H75L65.625 60L58.125 70L52.5 62.5L45 72.5Z" /></g></svg>;
}