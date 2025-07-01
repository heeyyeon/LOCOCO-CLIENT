import type { SVGProps } from 'react';

interface Props extends SVGProps<SVGSVGElement> {
  size?: number;
  stroke?: string;
  fill?: string;
}
export function SvgHome(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={props.fill || 'none'}
      viewBox="0 0 24 24"
      width={props.size || 24}
      height={props.size || 24}
      {...props}
    >
      <path
        stroke={props.stroke || 'currentColor'}
        d="m3 9 9-7 9 7v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"
      />
      <path stroke={props.stroke || 'currentColor'} d="M9 22V12h6v10" />
    </svg>
  );
}
