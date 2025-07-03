import type { SVGProps } from 'react';

interface Props extends SVGProps<SVGSVGElement> {
  size?: number;
  fill?: string;
}
export function SvgArrowUp(props: Props) {
  return (
    <svg
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill={props.fill || 'currentColor'}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M7.41 15.7049L12 11.1249L16.59 15.7049L18 14.2949L12 8.29492L6 14.2949L7.41 15.7049Z" />
    </svg>
  );
}
