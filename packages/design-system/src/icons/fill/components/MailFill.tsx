import type { SVGProps } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  size?: number;
  fill?: string;
}
export function SvgMailFill(props: Props) {
  return <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill={props.fill || "currentColor"} xmlns="http://www.w3.org/2000/svg" {...props}><mask id="mask0_2250_9263" style={{
      maskType: "alpha"
    }} maskUnits="userSpaceOnUse" x={0} y={0} width={24} height={24}><rect width={24} height={24} fill="#D9D9D9" /></mask><g mask="url(#mask0_2250_9263)"><path d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H20C20.55 4 21.0208 4.19583 21.4125 4.5875C21.8042 4.97917 22 5.45 22 6V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4ZM12 13L20 8V6L12 11L4 6V8L12 13Z" /></g></svg>;
}