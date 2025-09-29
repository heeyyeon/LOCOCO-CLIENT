import type { SVGProps } from "react";
interface Props extends SVGProps<SVGSVGElement> {
  size?: number;
  stroke?: string;
}
export function SvgPlus(props: Props) {
  return <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" stroke={props.stroke || "currentColor"} {...props}><mask id="mask0_4891_31283" style={{
      maskType: "alpha"
    }} maskUnits="userSpaceOnUse" x={0} y={0} width={32} height={32}><rect width={32} height={32} fill="#D9D9D9" /></mask><g mask="url(#mask0_4891_31283)"><path d="M14.666 17.3337H6.66602V14.667H14.666V6.66699H17.3327V14.667H25.3327V17.3337H17.3327V25.3337H14.666V17.3337Z" /></g></svg>;
}