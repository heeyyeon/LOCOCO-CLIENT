import type { SVGProps } from 'react';

interface Props extends SVGProps<SVGSVGElement> {
  size?: number;
  fill?: string;
}
export function SvgCheckBg(props: Props) {
  return (
    <svg
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 20 21"
      fill={props.fill || 'currentColor'}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        y={0.0517578}
        width={20}
        height={20}
        rx={10}
        fill="#15C37E"
        fillOpacity={0.1}
      />
      <path d="M7.32923 13.2805L3.85423 9.80553L2.6709 10.9805L7.32923 15.6389L17.3292 5.63887L16.1542 4.46387L7.32923 13.2805Z" />
    </svg>
  );
}
