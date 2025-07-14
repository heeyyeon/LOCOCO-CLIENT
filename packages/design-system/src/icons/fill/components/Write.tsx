import type { SVGProps } from 'react';

interface Props extends SVGProps<SVGSVGElement> {
  size?: number;
  fill?: string;
}
export function SvgWrite(props: Props) {
  return (
    <svg
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill={props.fill || 'currentColor'}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask
        id="mask0_2484_2283"
        style={{
          maskType: 'alpha',
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={24}
        height={24}
      >
        <rect width={24} height={24} fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_2484_2283)">
        <path d="M4.19963 20.975C3.84963 21.0584 3.54546 20.9709 3.28713 20.7125C3.0288 20.4542 2.9413 20.15 3.02463 19.8L3.89963 15.55L8.44963 20.1L4.19963 20.975ZM10.0746 18.875L5.12463 13.925L15.4496 3.60002C15.833 3.21669 16.308 3.02502 16.8746 3.02502C17.4413 3.02502 17.9163 3.21669 18.2996 3.60002L20.3996 5.70002C20.783 6.08336 20.9746 6.55836 20.9746 7.12502C20.9746 7.69169 20.783 8.16669 20.3996 8.55002L10.0746 18.875Z" />
      </g>
    </svg>
  );
}
