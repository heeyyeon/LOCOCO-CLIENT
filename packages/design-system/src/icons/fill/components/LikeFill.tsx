import type { SVGProps } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  size?: number;
  fill?: string;
}
export function SvgLikeFill(props: Props) {
  return <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 36 36" fill={props.fill || "currentColor"} xmlns="http://www.w3.org/2000/svg" {...props}><mask id="mask0_2091_29609" style={{
      maskType: "alpha"
    }} maskUnits="userSpaceOnUse" x={0} y={0} width={36} height={36}><rect width={36} height={36} fill="#D9D9D9" /></mask><g mask="url(#mask0_2091_29609)"><path d="M18 31.5L15.825 29.55C13.3 27.275 11.2125 25.3125 9.5625 23.6625C7.9125 22.0125 6.6 20.5313 5.625 19.2188C4.65 17.9063 3.96875 16.7 3.58125 15.6C3.19375 14.5 3 13.375 3 12.225C3 9.87501 3.7875 7.91251 5.3625 6.33751C6.9375 4.76251 8.9 3.97501 11.25 3.97501C12.55 3.97501 13.7875 4.25001 14.9625 4.80001C16.1375 5.35001 17.15 6.12501 18 7.12501C18.85 6.12501 19.8625 5.35001 21.0375 4.80001C22.2125 4.25001 23.45 3.97501 24.75 3.97501C27.1 3.97501 29.0625 4.76251 30.6375 6.33751C32.2125 7.91251 33 9.87501 33 12.225C33 13.375 32.8063 14.5 32.4188 15.6C32.0313 16.7 31.35 17.9063 30.375 19.2188C29.4 20.5313 28.0875 22.0125 26.4375 23.6625C24.7875 25.3125 22.7 27.275 20.175 29.55L18 31.5Z" /></g></svg>;
}