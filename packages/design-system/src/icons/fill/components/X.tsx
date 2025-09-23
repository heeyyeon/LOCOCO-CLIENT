import type { SVGProps } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  size?: number;
  fill?: string;
}
export function SvgX(props: Props) {
  return <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 32 32" fill={props.fill || "currentColor"} xmlns="http://www.w3.org/2000/svg" {...props}><path d="M22.6828 5.15259H26.3647L18.323 14.3416L27.7832 26.8475H20.3777L14.5733 19.2647L7.93966 26.8475H4.25256L12.8523 17.017L3.7832 5.15259H11.3764L16.6176 12.0835L22.6828 5.15259ZM21.3895 24.6467H23.4286L10.2656 7.23864H8.07525L21.3895 24.6467Z" /></svg>;
}