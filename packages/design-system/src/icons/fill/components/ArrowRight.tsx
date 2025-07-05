import { type SVGProps } from 'react';

interface Props extends SVGProps<SVGSVGElement> {
  size?: number;
  fill?: string;
}

export function SvgArrowRight({ size = 16, fill = '#5F5F67', ...rest }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M5.53027 11.06L8.58361 8L5.53027 4.94L6.47027 4L10.4703 8L6.47027 12L5.53027 11.06Z"
        fill={fill}
      />
    </svg>
  );
}
