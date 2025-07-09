import { SVGProps } from 'react';

export default function LeftArrow(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="18.000000"
      height="18.000000"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <clipPath id="clip31_4829">
          <rect
            id="State=Back"
            width="18.000000"
            height="18.000000"
            fill="currentColor"
            fillOpacity="0"
          />
        </clipPath>
      </defs>
      <g clipPath="url(#clip31_4829)">
        <path
          id="Vector"
          d="M14.81 9L2.81 9M7.31 13.5L2.81 9L7.31 4.5"
          stroke="currentColor"
          strokeOpacity="1.000000"
          strokeWidth="1.500000"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
