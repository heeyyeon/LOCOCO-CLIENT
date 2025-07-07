import type { SVGProps } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  size?: number;
  fill?: string;
}
export function SvgCheck(props: Props) {
  return <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill={props.fill || "currentColor"} xmlns="http://www.w3.org/2000/svg" {...props}><rect width={24} height={24} rx={4} fill="#FF488F" /><path d="M9.86339 14.5831L7.08339 11.8031L6.13672 12.7431L9.86339 16.4698L17.8634 8.46979L16.9234 7.52979L9.86339 14.5831Z" /></svg>;
}