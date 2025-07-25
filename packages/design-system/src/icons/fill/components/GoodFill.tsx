import type { SVGProps } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  size?: number;
  fill?: string;
}
export function SvgGoodFill(props: Props) {
  return <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 18 18" fill={props.fill || "currentColor"} xmlns="http://www.w3.org/2000/svg" {...props}><mask id="mask0_980_15565" style={{
      maskType: "alpha"
    }} maskUnits="userSpaceOnUse" x={0} y={0} width={18} height={18}><rect width={18} height={18} fill="#D9D9D9" /></mask><g mask="url(#mask0_980_15565)"><path d="M13.5 15.75H6V6L11.25 0.75L12.1875 1.6875C12.275 1.775 12.3469 1.89375 12.4031 2.04375C12.4594 2.19375 12.4875 2.3375 12.4875 2.475V2.7375L11.6625 6H15.75C16.15 6 16.5 6.15 16.8 6.45C17.1 6.75 17.25 7.1 17.25 7.5V9C17.25 9.0875 17.2406 9.18125 17.2219 9.28125C17.2031 9.38125 17.175 9.475 17.1375 9.5625L14.8875 14.85C14.775 15.1 14.5875 15.3125 14.325 15.4875C14.0625 15.6625 13.7875 15.75 13.5 15.75ZM4.5 6V15.75H1.5V6H4.5Z" /></g></svg>;
}