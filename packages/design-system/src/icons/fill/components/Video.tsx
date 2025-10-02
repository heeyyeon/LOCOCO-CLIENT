import type { SVGProps } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  size?: number;
  fill?: string;
}
export function SvgVideo(props: Props) {
  return <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 33 33" fill={props.fill || "currentColor"} xmlns="http://www.w3.org/2000/svg" {...props}><rect x={0.75} y={0.5} width={32} height={32} rx={16} fill="#FFF1F6" /><path d="M10.7738 11.2333C9.62306 11.2333 8.6875 12.1401 8.6875 13.2555V21.3444C8.6875 22.4598 9.62306 23.3666 10.7738 23.3666H19.1189C20.2696 23.3666 21.2051 22.4598 21.2051 21.3444V13.2555C21.2051 12.1401 20.2696 11.2333 19.1189 11.2333H10.7738ZM22.7699 19.8277L25.1658 21.6856C25.3027 21.7931 25.4722 21.8499 25.6483 21.8499C26.0753 21.8499 26.4208 21.515 26.4208 21.1011V13.4988C26.4208 13.0849 26.0753 12.7499 25.6483 12.7499C25.4722 12.7499 25.3027 12.8068 25.1658 12.9142L22.7699 14.7722V19.8277Z" /></svg>;
}