import type { SVGProps } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  size?: number;
  stroke?: string;
}
export function SvgMinuns(props: Props) {
  return <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" stroke={props.stroke || "currentColor"} {...props}><g clipPath="url(#clip0_4929_22846)"><rect x={6.66602} y={16} width={18.6667} height={2.66667} fill="black" /></g><defs><clipPath id="clip0_4929_22846"><rect width={18.6667} height={18.6667} fill="white" transform="translate(6.66602 6.66699)" /></clipPath></defs></svg>;
}