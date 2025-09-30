import type { SVGProps } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  size?: number;
  fill?: string;
}
export function SvgDownload(props: Props) {
  return <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 25 24" fill={props.fill || "currentColor"} xmlns="http://www.w3.org/2000/svg" {...props}><path d="M12.25 16L7.25 11L8.65 9.55L11.25 12.15V4H13.25V12.15L15.85 9.55L17.25 11L12.25 16ZM6.25 20C5.7 20 5.22917 19.8042 4.8375 19.4125C4.44583 19.0208 4.25 18.55 4.25 18V15H6.25V18H18.25V15H20.25V18C20.25 18.55 20.0542 19.0208 19.6625 19.4125C19.2708 19.8042 18.8 20 18.25 20H6.25Z" /></svg>;
}