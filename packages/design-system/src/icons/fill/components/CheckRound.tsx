import type { SVGProps } from 'react';

interface Props extends SVGProps<SVGSVGElement> {
  size?: number;
  fill?: string;
}
export function SvgCheckRound(props: Props) {
  return (
    <svg
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 16 17"
      fill={props.fill || 'currentColor'}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx={7.99967} cy={8.50004} r={6.66667} fill="#15C37E" />
      <path
        d="M6.29909 10.4264L4.08647 8.3533L3.33301 9.05427L6.29909 11.8333L12.6663 5.8676L11.9182 5.16663L6.29909 10.4264Z"
        fill="white"
      />
    </svg>
  );
}
