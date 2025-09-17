import type { SVGProps } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  size?: number;
  fill?: string;
}
export function SvgAvatarCircle(props: Props) {
  return <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 96 96" fill={props.fill || "currentColor"} xmlns="http://www.w3.org/2000/svg" {...props}><g clipPath="url(#clip0_3229_25063)"><rect width={96} height={96} rx={48} fill="#FFF1F6" /><circle cx={48} cy={38.6666} r={20} fill="#FF80B1" /><circle cx={47.6025} cy={138.691} r={74.2666} fill="#FF80B1" /></g><defs><clipPath id="clip0_3229_25063"><rect width={96} height={96} rx={48} fill="white" /></clipPath></defs></svg>;
}