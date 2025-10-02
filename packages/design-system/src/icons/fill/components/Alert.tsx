import type { SVGProps } from 'react';

interface Props extends SVGProps<SVGSVGElement> {
  size?: number;
  fill?: string;
}
export function SvgAlert(props: Props) {
  return (
    <svg
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 120 120"
      fill={props.fill || 'currentColor'}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width={120} height={120} rx={60} fill="#FFF1F6" />
      <mask
        id="mask0_5466_23186"
        style={{
          maskType: 'alpha',
        }}
        maskUnits="userSpaceOnUse"
        x={30}
        y={30}
        width={60}
        height={60}
      >
        <rect x={30} y={30} width={60} height={60} fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_5466_23186)">
        <path d="M60 82.5C58.625 82.5 57.4479 82.0104 56.4688 81.0312C55.4896 80.0521 55 78.875 55 77.5C55 76.125 55.4896 74.9479 56.4688 73.9688C57.4479 72.9896 58.625 72.5 60 72.5C61.375 72.5 62.5521 72.9896 63.5313 73.9688C64.5104 74.9479 65 76.125 65 77.5C65 78.875 64.5104 80.0521 63.5313 81.0312C62.5521 82.0104 61.375 82.5 60 82.5ZM55 67.5V37.5H65V67.5H55Z" />
      </g>
    </svg>
  );
}
